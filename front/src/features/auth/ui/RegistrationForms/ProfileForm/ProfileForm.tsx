"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { StepWizardChildProps } from "react-step-wizard";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AuthForm,
  getProfileFields,
  ICredentialsForm,
  IProfileForm,
} from "@/features/auth";

import { IDatabase } from "@/shared/lib";
import {
  ErrorCode,
  MutationKey,
  Pathname,
  QueryKey,
  Translation,
} from "@/shared/model";
import { Btn } from "@/shared/ui";

import s from "./ProfileForm.module.scss";

interface ProfileFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const ProfileForm: FC<ProfileFormProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const { push } = useRouter();

  const form = useForm<IProfileForm>({
    mode: "onChange",
  });

  const supabase = createClientComponentClient<IDatabase>();

  const queryClient = useQueryClient();

  const { isPending: isRegistrationPending, mutate: registration } =
    useMutation({
      mutationFn: async (data: IProfileForm) => {
        const storedFormData = sessionStorage.getItem(MutationKey.Credentials);
        const parsedFormData: ICredentialsForm | undefined =
          storedFormData && JSON.parse(storedFormData);

        if (!parsedFormData) {
          throw new Error();
        }

        const { email, password } = parsedFormData;

        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        // TODO: send profile data to back
        console.log(data);
      },
      mutationKey: [MutationKey.Profile],
      onError: (error: AuthError) => {
        const errorMessages = {
          default: "errors.unknown",
          [ErrorCode.UserAlreadyExists]: "errors.user-already-exists",
        };
        const errorMessage =
          errorMessages[error.code as keyof typeof errorMessages] ||
          errorMessages["default"];

        setSubmissionMessage(errorMessage);
        console.warn(error);
      },
      onSuccess: () => {
        sessionStorage.removeItem(MutationKey.Credentials);
        queryClient.invalidateQueries({
          queryKey: [QueryKey.User],
        });

        push(Pathname.Home);
      },
    });

  return (
    <AuthForm
      btns={
        <Btn
          className={s.profileForm__submit}
          isLoading={isRegistrationPending}
          type="submit"
        >
          {tShared("form.submit")}
        </Btn>
      }
      className={(s.profileForm, className)}
      fields={getProfileFields(tShared)}
      formReturn={form}
      isLoading={isRegistrationPending}
      submissionMessage={submissionMessage}
      onSubmit={registration}
    />
  );
};
