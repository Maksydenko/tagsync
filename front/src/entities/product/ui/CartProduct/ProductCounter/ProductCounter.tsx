"use client";

import { FC } from "react";
import { clsx } from "clsx";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AuthService } from "@/features/auth";
import { CartService, ICartProduct } from "@/features/cart";

import { CartAction } from "@/entities/product";

import { MutationKey, QueryKey } from "@/shared/model";
import { Btn } from "@/shared/ui";

import s from "./ProductCounter.module.scss";

interface ProductCounterProps {
  className?: string;
  productData: ICartProduct;
}

export const ProductCounter: FC<ProductCounterProps> = ({
  className,
  productData: { product_id, quantity },
}) => {
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
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

  const { mutate: addToCart } = useMutation({
    mutationFn: async (method: CartAction) => {
      if (!userEmail || !cartItems) {
        return;
      }

      const quantity = cartItems.find(
        (item) => item.product_id === product_id
      )!.quantity;

      switch (method) {
        case CartAction.Add:
          await CartService.add({
            product_id,
            quantity: 1,
            userEmail,
          });
          break;
        case CartAction.Clear:
          await CartService.remove({
            product_id,
            quantity,
            userEmail,
          });
          break;
        case CartAction.Remove:
          await CartService.remove({
            product_id,
            quantity: 1,
            userEmail,
          });
          break;
      }
    },
    mutationKey: [MutationKey.AddToCart],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.Cart],
      });
    },
  });

  return (
    <div className={clsx(s.productCounter, className)}>
      <div className={s.productCounter__body}>
        <div className={s.productCounter__content}>
          <Btn
            className={s.productCounter__btn}
            icon="/img/icons/form/minus.svg"
            type="button"
            onClick={() => addToCart(CartAction.Remove)}
          />
          <p className={s.productCounter__value}>{quantity}</p>
          <Btn
            className={s.productCounter__btn}
            icon="/img/icons/form/plus.svg"
            type="button"
            onClick={() => addToCart(CartAction.Add)}
          />
        </div>
        <Btn
          className={s.productCounter__btn}
          icon="/img/icons/form/trash.svg"
          type="button"
          onClick={() => addToCart(CartAction.Clear)}
        />
      </div>
    </div>
  );
};
