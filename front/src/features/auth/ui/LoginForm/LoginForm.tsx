"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import { useLocalCart } from "@/application/store";

import { AuthForm } from "@/features/auth";

import { CartService } from "@/entities/cart";

import { Pathname, Translation } from "@/shared/config";
import { useInvalidateAtom } from "@/shared/lib";
import { ErrorCode, MutationKey, QueryKey } from "@/shared/model";
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

  const { clearLocalCart, localCart } = useLocalCart();
  const { items: localCartItems } = localCart;

  const invalidateUser = useInvalidateAtom([QueryKey.User]);
  const invalidateCart = useInvalidateAtom([QueryKey.Cart]);

  const form = useForm<ILoginForm>({
    mode: "onChange",
  });

  const { isPending: isLoginPending, mutate: login } = useMutation({
    mutationFn: async (data: ILoginForm) => {
      const AuthService = await import("@/features/auth").then(
        (module) => module.AuthService
      );

      const { error } = await AuthService.login(data);

      if (error) {
        throw error;
      }

      return data.email;
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
    onSuccess: async (userEmail) => {
      sessionStorage.removeItem(MutationKey.Credentials);
      await invalidateUser();

      const userCart = await CartService.get(userEmail);
      const { length: localCartItemsLength } = localCartItems;

      if (!userCart.data.items.length && localCartItemsLength) {
        await Promise.allSettled(
          localCartItems.map((item) =>
            CartService.add({
              product_id: item.product_id,
              quantity: item.quantity,
              userEmail,
            })
          )
        );

        await invalidateCart();
      }

      if (localCartItemsLength) {
        clearLocalCart();
      }

      push(Pathname.Home);
    },
  });

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
          <Link className={s.loginForm__link} href={Pathname.ResetPassword}>
            {tShared("forgot-password")}
          </Link>
        </>
      }
      className={clsx(s.loginForm, className)}
      fields={getLoginFields(tShared)}
      formReturn={form}
      submissionMessage={submissionMessage}
      onSubmit={login}
    />
  );
};
