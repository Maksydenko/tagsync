"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { CheckoutForm } from "@/features/orders";

import { cartAtom } from "@/entities/cart";
import { CartProduct } from "@/entities/product";
import { userAtom } from "@/entities/user";

import { Pathname } from "@/shared/config";

import s from "./Checkout.module.scss";

interface CheckoutProps {
  className?: string;
}

export const Checkout: FC<CheckoutProps> = ({ className }) => {
  const { push } = useRouter();
  const [{ data: userData, isLoading: isUserLoading }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

  const [{ data: cartData }] = useAtom(cartAtom(userEmail));
  const cartItems = cartData?.data.items;

  useEffect(() => {
    if (userData || isUserLoading) {
      return;
    }

    push(Pathname.Login);
  }, [isUserLoading, push, userData]);

  return (
    <div className={clsx(s.checkoutPage, className)}>
      <div className={s.checkout}>
        <div className={s.checkout__container}>
          <div className={s.checkout__body}>
            <div className={s.checkout__content}>
              {cartItems?.map((product) => (
                <CartProduct key={product.product_id} productData={product} />
              ))}
            </div>
            <CheckoutForm className={s.checkout__form} />
          </div>
        </div>
      </div>
    </div>
  );
};
