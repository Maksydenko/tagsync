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
  getResetPasswordFields,
  IResetPasswordForm,
} from "@/features/auth";

import { MutationKey, Translation } from "@/shared/model";
import { Btn } from "@/shared/ui";

import s from "./ResetPasswordForm.module.scss";

interface ResetPasswordFormProps {
  className?: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  className,
}) => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const tShared = useTranslations(Translation.Shared);

  const [{ accessToken, refreshToken }] = useAtom(authAtom);

  const form = useForm<IResetPasswordForm>({
    mode: "onChange",
  });

  const { isPending: isResetPasswordPending, mutate: login } = useMutation({
    mutationFn: async ({ password }: IResetPasswordForm) => {
      if (!accessToken || !refreshToken) {
        throw new Error();
      }

      const AuthService = await import("@/features/auth").then(
        (module) => module.AuthService
      );

      return AuthService.resetPassword({
        accessToken,
        password,
        refreshToken,
      });
    },
    mutationKey: [MutationKey.ResetPassword],
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
          className={s.resetPasswordForm__submit}
          isLoading={isResetPasswordPending}
          type="submit"
        >
          {tShared("form.submit")}
        </Btn>
      }
      className={clsx(s.resetPasswordForm, className)}
      fields={getResetPasswordFields(tShared, form)}
      formReturn={form}
      submissionMessage={submissionMessage}
      onSubmit={login}
    />
  );
};
