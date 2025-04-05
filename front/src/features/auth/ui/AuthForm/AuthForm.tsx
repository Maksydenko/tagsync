"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { UseMutateFunction } from "@tanstack/react-query";

import { IField, Translation } from "@/shared/model";
import { Field } from "@/shared/ui";

import s from "./AuthForm.module.scss";

interface AuthFormProps<T extends FieldValues> {
  btns: ReactNode;
  className?: string;
  fields: IField<T>[];
  formReturn: UseFormReturn<T>;
  isLoading?: boolean;
  onSubmit: UseMutateFunction<unknown, unknown, T, unknown>;
  submissionMessage?: string;
}

export const AuthForm = <T extends FieldValues>({
  btns,
  className,
  fields,
  formReturn,
  isLoading,
  onSubmit: handleSubmit,
  submissionMessage,
}: AuthFormProps<T>): ReactNode => {
  const tShared = useTranslations(Translation.Shared);

  const onSubmit = (data: T) => {
    handleSubmit(data);
  };

  return (
    <form
      className={clsx(s.authForm, className)}
      onSubmit={formReturn.handleSubmit(onSubmit)}
      {...(isLoading && {
        inert: true,
      })}
    >
      <div className={s.authForm__body}>
        <div className={s.authForm__content}>
          {fields.map((field) => {
            return (
              <Field
                key={field.name}
                className={s.authForm__field}
                formReturn={formReturn}
                {...field}
              />
            );
          })}
        </div>
        <div className={s.authForm__btns}>{btns}</div>
        {submissionMessage && (
          <span className={s.authForm__submissionMessage}>
            {tShared(submissionMessage)}
          </span>
        )}
      </div>
    </form>
  );
};
