"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { useMutation } from "@tanstack/react-query";

import { CartProduct } from "@/entities/product";

import {
  cartAtom,
  cartOpenAtom,
  useInvalidateAtom,
  userAtom,
} from "@/shared/lib";
import { MutationKey, Pathname, QueryKey, Translation } from "@/shared/model";
import { Btn, Img, Popup } from "@/shared/ui";

import { CartService } from "../../api";

import s from "./Cart.module.scss";

interface CartProps {
  className?: string;
}

export const Cart: FC<CartProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  const [isOpen, setIsOpen] = useAtom(cartOpenAtom);

  const invalidateCart = useInvalidateAtom([QueryKey.Cart]);
  const [{ data: userData }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

  const [{ data: cartData, isLoading: isCartLoading }] = useAtom(
    cartAtom(userEmail)
  );
  const cart = cartData?.data;
  const cartItems = cart?.items;
  const cartTotalQuantity = cart?.total_quantity;

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
      await invalidateCart();
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
