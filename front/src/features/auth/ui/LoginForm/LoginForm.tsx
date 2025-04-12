"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthForm } from "@/features/auth";

import { IDatabase } from "@/shared/lib";
import {
  ErrorCode,
  MutationKey,
  Pathname,
  QueryKey,
  Translation,
} from "@/shared/model";
import { Btn } from "@/shared/ui";

import { getLoginFields, ILoginForm } from "../../model";

import s from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const { push } = useRouter();

  const tShared = useTranslations(Translation.Shared);
  const supabase = createClientComponentClient<IDatabase>();

  const form = useForm<ILoginForm>({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { isPending: isLoginPending, mutate: login } = useMutation({
    mutationFn: async (data: ILoginForm) => {
      const { error } = await supabase.auth.signInWithPassword(data);

      if (error) {
        throw error;
      }
    },
    mutationKey: [MutationKey.Login],
    onError: (error: AuthError) => {
      const errorMessages = {
        default: "errors.unknown",
        [ErrorCode.EmailNotConfirmed]: "errors.email-not-confirmed",
        [ErrorCode.InvalidCredentials]: "errors.invalid-credentials",
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

  const fields = getLoginFields(tShared);

  return (
    <AuthForm
      btns={
        <>
          <Btn
            className={s.loginForm__submit}
            isLoading={isLoginPending}
            type="submit"
          >
            {tShared("form.submit")}
          </Btn>
          <Link className={s.loginForm__link} href={Pathname.ForgotPassword}>
            {tShared("forgot-password")}
          </Link>
        </>
      }
      className={clsx(s.loginForm, className)}
      fields={fields}
      formReturn={form}
      submissionMessage={submissionMessage}
      onSubmit={login}
    />
  );
};
