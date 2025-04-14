"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { StepWizardChildProps } from "react-step-wizard";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import {
  AuthForm,
  AuthService,
  getCredentialsFields,
  ICredentialsForm,
} from "@/features/auth";

import { IDatabase } from "@/shared/lib";
import { ErrorCode, MutationKey, Pathname, Translation } from "@/shared/model";
import { Btn } from "@/shared/ui";

import s from "./CredentialsForm.module.scss";

interface CredentialsFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const CredentialsForm: FC<CredentialsFormProps> = ({
  className,
  nextStep,
}) => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const tShared = useTranslations(Translation.Shared);

  const storedFormData = sessionStorage.getItem(MutationKey.Credentials);
  const parsedFormData: ICredentialsForm | undefined =
    storedFormData && JSON.parse(storedFormData);

  const form = useForm<ICredentialsForm>({
    defaultValues: parsedFormData,
    mode: "onChange",
  });

  const supabase = createClientComponentClient<IDatabase>();

  const { isPending: isRegisterPending, mutate: register } = useMutation({
    mutationFn: async (data: ICredentialsForm) => {
      const { data: emailExistsData, error: emailExistsError } =
        await AuthService.checkEmailExists(supabase, data.email);

      if (emailExistsError) {
        throw emailExistsError;
      }

      if (emailExistsData) {
        throw new Error(ErrorCode.UserAlreadyExists);
      }

      return data;
    },
    mutationKey: [MutationKey.Credentials],
    onError: (error: Error | PostgrestError) => {
      const errorMessages = {
        default: "errors.unknown",
        [ErrorCode.UserAlreadyExists]: "errors.user-already-exists",
      };
      const errorMessage =
        errorMessages[error.message as keyof typeof errorMessages] ||
        errorMessages["default"];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: (data) => {
      sessionStorage.setItem(MutationKey.Credentials, JSON.stringify(data));

      setSubmissionMessage("");
      nextStep?.();
    },
  });

  return (
    <AuthForm
      btns={
        <>
          <Btn
            className={s.credentialsForm__submit}
            isLoading={isRegisterPending}
            type="submit"
          >
            {tShared("form.submit")}
          </Btn>
          <Link
            className={s.credentialsForm__link}
            href={Pathname.ForgotPassword}
          >
            {tShared("forgot-password")}
          </Link>
        </>
      }
      className={clsx(s.credentialsForm, className)}
      fields={getCredentialsFields(tShared, form)}
      formReturn={form}
      isLoading={isRegisterPending}
      submissionMessage={submissionMessage}
      onSubmit={register}
    />
  );
};
