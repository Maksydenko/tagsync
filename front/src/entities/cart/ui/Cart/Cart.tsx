"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { useMutation } from "@tanstack/react-query";

import { useLocalCart } from "@/application/store";

import { userAtom } from "@/entities/user";

import { useInvalidateAtom } from "@/shared/lib";
import { MutationKey, Pathname, QueryKey, Translation } from "@/shared/model";
import { Img, Popup } from "@/shared/ui";

import { cartAtom, cartOpenAtom } from "../../model";

import s from "./Cart.module.scss";

const Link = dynamic(() => import("next/link"));
const Btn = dynamic(() => import("@/shared/ui").then((module) => module.Btn));
const CartProduct = dynamic(() =>
  import("@/entities/product").then((module) => module.CartProduct)
);

interface CartProps {
  className?: string;
}

export const Cart: FC<CartProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);
  const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom);

  const [{ data: userData }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

  const invalidateCart = useInvalidateAtom([QueryKey.Cart]);
  const [{ data: cartData, isLoading: isCartLoading }] = useAtom(
    cartAtom(userEmail)
  );
  const { clearLocalCart, localCart } = useLocalCart();

  const cart = cartData?.data ?? localCart;
  const cartItems = cart?.items;
  const cartTotalQuantity = cart?.total_quantity;

  const { mutate: clearCart } = useMutation({
    mutationFn: async () => {
      const CartService = await import("../../api").then(
        (module) => module.CartService
      );

      if (userEmail) {
        return CartService.clear({
          userEmail,
        });
      }

      clearLocalCart();
    },
    mutationKey: [MutationKey.CartClear],
    onSuccess: async () => {
      if (userEmail) {
        await invalidateCart();
      }

      setIsCartOpen(false);
    },
  });

  return (
    <div className={clsx(s.cart, className)}>
      <Popup
        btn={
          <div className={s.cart__btn}>
            <Img
              alt={tShared("cart.title")}
              className={s.cart__icon}
              height={20}
              src="/img/icons/product/cart.svg"
              width={20}
              isSvg
            />
            {!!cartTotalQuantity && (
              <p className={s.cart__counter}>{cartTotalQuantity}</p>
            )}
          </div>
        }
        className={s.cart__popup}
        forceOpen={isCartLoading ? false : isCartOpen}
        setForceOpen={setIsCartOpen}
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

                  setIsCartOpen(false);
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
