"use client";

import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { StepWizardChildProps } from "react-step-wizard";

import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import { AuthForm } from "@/features/auth";

import { useInvalidateAtom, userAtom } from "@/shared/lib";
import { MutationKey, QueryKey, Translation } from "@/shared/model";
import { Btn } from "@/shared/ui";

import { OrdersService } from "../../api";

import { getCheckoutFields, ICheckoutForm } from "../../model";

import s from "./CheckoutForm.module.scss";

interface CheckoutFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const invalidateCart = useInvalidateAtom([QueryKey.Cart]);
  const [{ data: userData }] = useAtom(userAtom);
  const user = userData?.data;

  const { isPending: isCheckoutPending, mutate: checkout } = useMutation({
    mutationFn: async (data: ICheckoutForm) => {
      if (!user) {
        return;
      }

      return OrdersService.checkout({
        address: data.address.trim(),
        city: data.city.trim(),
        fullName: `${data.name.trim()} ${data.surname.trim()}`,
        phone: data.phone.replace(/\s+/g, ""),
        userEmail: user?.email.trim(),
      });
    },
    mutationKey: [MutationKey.Checkout],
    onError: (error: AuthError) => {
      const errorMessages = {
        default: "errors.unknown",
      };
      const errorMessage =
        errorMessages[error.code as keyof typeof errorMessages] ||
        errorMessages["default"];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: async () => invalidateCart(),
  });

  const form = useForm<ICheckoutForm>({
    mode: "onChange",
  });
  const { reset } = form;

  useEffect(() => {
    reset({
      address: user?.address,
      city: user?.city,
      name: user?.firstName,
      phone: user?.phone,
      surname: user?.lastName,
    });
  }, [reset, user]);

  return (
    <AuthForm
      btns={
        <Btn
          className={s.checkoutForm__submit}
          isLoading={isCheckoutPending}
          type="submit"
        >
          {tShared("form.submit")}
        </Btn>
      }
      className={clsx(s.checkoutForm, className)}
      fields={getCheckoutFields(tShared)}
      formReturn={form}
      isLoading={isCheckoutPending}
      submissionMessage={submissionMessage}
      onSubmit={checkout}
    />
  );
};
