"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

import { useQuery } from "@tanstack/react-query";

import { AuthService } from "@/features/auth";
import { CartService } from "@/features/cart";
import { CheckoutForm } from "@/features/orders";

import { CartProduct } from "@/entities/product";

import { Pathname, QueryKey } from "@/shared/model";

import s from "./Checkout.module.scss";

interface CheckoutProps {
  className?: string;
}

export const Checkout: FC<CheckoutProps> = ({ className }) => {
  const { push } = useRouter();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryFn: async () => AuthService.getUserData(),
    queryKey: [QueryKey.User],
  });
  const userEmail = userData?.data.email;

  const { data: cartData } = useQuery({
    enabled: !!userEmail,
    queryFn: async () => {
      if (!userEmail) {
        return;
      }

      return CartService.get(userEmail);
    },
    queryKey: [QueryKey.Cart, userEmail],
  });
  const cartItems = cartData?.data.items;

  useEffect(() => {
    if (isUserLoading || userData) {
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
