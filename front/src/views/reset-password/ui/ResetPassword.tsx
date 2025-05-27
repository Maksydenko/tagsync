"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useAtom } from "jotai";

import {
  authAtom,
  ForgotPasswordForm,
  ResetPasswordForm,
} from "@/features/auth";

import { Translation } from "@/shared/model";

import s from "./ResetPassword.module.scss";

export const ResetPassword: FC = () => {
  const tResetPassword = useTranslations(Translation.ResetPassword);
  const [{ accessToken, refreshToken }] = useAtom(authAtom);

  const isResetPassword = accessToken && refreshToken;

  return (
    <section className={s.resetPassword}>
      <div className={s.resetPassword__container}>
        <div className={s.resetPassword__body}>
          <h2 className={s.resetPassword__title}>
            {tResetPassword(`${isResetPassword ? "reset" : "forgot"}-password`)}
          </h2>
          {isResetPassword ? (
            <ResetPasswordForm className={s.resetPassword__form} />
          ) : (
            <ForgotPasswordForm className={s.resetPassword__form} />
          )}
        </div>
      </div>
    </section>
  );
};
