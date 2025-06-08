"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import {
  authAtom,
  AuthForm,
  getForgotPasswordFields,
  IForgotPasswordForm,
} from "@/features/auth";

import { Pathname, Translation } from "@/shared/config";
import { MutationKey } from "@/shared/model";
import { Btn } from "@/shared/ui";

import s from "./ForgotPasswordForm.module.scss";

interface ForgotPasswordFormProps {
  className?: string;
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  className,
}) => {
  const tShared = useTranslations(Translation.Shared);

  const [{ errorCode }] = useAtom(authAtom);
  const [submissionMessage, setSubmissionMessage] = useState(
    // TODO: handle real error
    errorCode ? "errors.unknown" : ""
  );

  const form = useForm<IForgotPasswordForm>({
    mode: "onChange",
  });

  const {
    isPending: isRequestResetPasswordPending,
    mutate: requestResetPassword,
  } = useMutation({
    mutationFn: async ({ email }: IForgotPasswordForm) => {
      const AuthService = await import("@/features/auth").then(
        (module) => module.AuthService
      );

      await AuthService.requestResetPassword({
        email,
        redirectUrl: `${window.location.origin}${Pathname.ResetPassword}`,
      });
    },
    mutationKey: [MutationKey.RequestResetPassword],
    onError: (error) => {
      const errorMessages = {
        default: "errors.unknown",
      };
      const errorMessage =
        errorMessages[error.message as keyof typeof errorMessages] ||
        errorMessages["default"];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: () => {
      // TODO: handle success message
    },
  });

  return (
    <AuthForm
      btns={
        <Btn
          className={s.forgotPasswordForm__submit}
          isLoading={isRequestResetPasswordPending}
          type="submit"
        >
          {tShared("form.submit")}
        </Btn>
      }
      className={clsx(s.forgotPasswordForm, className)}
      fields={getForgotPasswordFields(tShared)}
      formReturn={form}
      submissionMessage={submissionMessage}
      onSubmit={requestResetPassword}
    />
  );
};
