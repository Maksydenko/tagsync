"use client";

import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { StepWizardChildProps } from "react-step-wizard";

import { useMutation } from "@tanstack/react-query";

import { AuthForm } from "@/features/auth";

import { userAtom } from "@/entities/user";

import { useInvalidateAtom } from "@/shared/lib";
import { MutationKey, QueryKey, Translation } from "@/shared/model";
import { Btn } from "@/shared/ui";

import { getEditUserFields, IEditUserForm } from "../../model";

import s from "./EditUserForm.module.scss";

interface EditUserFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const EditUserForm: FC<EditUserFormProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [{ data: userData }] = useAtom(userAtom);
  const invalidateUser = useInvalidateAtom([QueryKey.User]);

  const user = userData?.data;

  const { isPending: isEditUserPending, mutate: editUser } = useMutation({
    mutationFn: async (data: IEditUserForm) => {
      if (!user) {
        return;
      }

      const AuthService = await import("@/features/auth").then(
        (module) => module.AuthService
      );

      return AuthService.changeUserData({
        address: data.address.trim(),
        city: data.city.trim(),
        email: user.email,
        firstName: data.name.trim(),
        lastName: data.surname.trim(),
        phone: data.phone.replace(/\s+/g, ""),
      });
    },
    mutationKey: [MutationKey.EditUser],
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
    onSuccess: async () => invalidateUser(),
  });

  const form = useForm<IEditUserForm>({
    mode: "onChange",
  });
  const { reset } = form;

  useEffect(() => {
    reset({
      address: user?.address,
      city: user?.city,
      email: user?.email,
      name: user?.firstName,
      phone: user?.phone,
      surname: user?.lastName,
    });
  }, [reset, user]);

  return (
    <AuthForm
      btns={
        <Btn
          className={s.editUserForm__submit}
          isLoading={isEditUserPending}
          type="submit"
        >
          {tShared("form.submit")}
        </Btn>
      }
      className={clsx(s.editUserForm, className)}
      fields={getEditUserFields(tShared)}
      formReturn={form}
      isLoading={isEditUserPending}
      submissionMessage={submissionMessage}
      onSubmit={editUser}
    />
  );
};
