"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { cartOpenAtom } from "@/application/atoms";

import { AuthService } from "@/features/auth";

import { CartProduct } from "@/entities/product";

import { MutationKey, Pathname, QueryKey, Translation } from "@/shared/model";
import { Btn, Img, Popup } from "@/shared/ui";

import { CartService } from "../../api";

import s from "./Cart.module.scss";

interface CartProps {
  className?: string;
}

export const Cart: FC<CartProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useAtom(cartOpenAtom);

  const tShared = useTranslations(Translation.Shared);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryFn: async () => AuthService.getUserData(),
    queryKey: [QueryKey.User],
  });
  const userEmail = userData?.data.email;

  const { data: cartData, isLoading: isCartLoading } = useQuery({
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
  const cartTotalQuantity = cartData?.data.total_quantity;

  const { mutate: clearCart } = useMutation({
    mutationFn: async () => {
      if (!userEmail) {
        return;
      }

      return CartService.clear({
        userEmail,
      });
    },
    mutationKey: [MutationKey.CartClear],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.Cart],
      });
      setIsOpen(false);
    },
  });

  return (
    <div className={clsx(s.cart, className)}>
      <Popup
        btn={
          <div className={s.cart__btn}>
            <Img className={s.cart__icon} src="/img/icons/product/cart.svg" />
            {!!cartTotalQuantity && (
              <p className={s.cart__counter}>{cartTotalQuantity}</p>
            )}
          </div>
        }
        className={s.cart__popup}
        forceOpen={isCartLoading ? false : isOpen}
        setForceOpen={setIsOpen}
      >
        <div className={s.cart__body}>
          <h2 className={s.cart__title}>{tShared("cart.title")}</h2>
          <div className={s.cart__content}>
            {cartItems?.map((product) => (
              <CartProduct
                key={product.product_id}
                className={s.cart__product}
                productData={product}
              />
            ))}
          </div>
          <div className={s.cart__footer}>
            <Btn disabled={!cartItems?.length} asChild>
              <Link
                aria-disabled={!cartItems?.length}
                className={s.cart__btn}
                href={Pathname.Checkout}
                onClick={(e) => {
                  if (!cartItems?.length) {
                    return e.preventDefault();
                  }

                  setIsOpen(false);
                }}
              >
                {tShared("cart.btns.checkout")}
              </Link>
            </Btn>
            <Btn
              className={s.cart__btn}
              type="button"
              onClick={() => {
                clearCart();
              }}
            >
              {tShared("cart.btns.clear")}
            </Btn>
          </div>
        </div>
      </Popup>
    </div>
  );
};
