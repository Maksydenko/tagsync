'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import { useMutation } from '@tanstack/react-query';

import { useLocalCart } from '@/application/store';

import { cartAtom, ICartProduct } from '@/entities/cart';
import { CartAction } from '@/entities/product';
import { userAtom } from '@/entities/user';

import { Translation } from '@/shared/config';
import { useInvalidateAtom } from '@/shared/lib';
import { MutationKey, QueryKey } from '@/shared/model';
import { Btn } from '@/shared/ui';

import s from './ProductCounter.module.scss';

interface ProductCounterProps {
  className?: string;
  productData: ICartProduct;
}

export const ProductCounter: FC<ProductCounterProps> = ({
  className,
  productData: { product_id, quantity }
}) => {
  const tShared = useTranslations(Translation.Shared);

  const [{ data: userData }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

  const invalidateCart = useInvalidateAtom([QueryKey.Cart]);
  const [{ data: cartData }] = useAtom(cartAtom(userEmail));
  const {
    decrementLocalCartQuantity,
    incrementLocalCartQuantity,
    localCart,
    removeFromLocalCart
  } = useLocalCart();

  const cart = cartData?.data ?? localCart;
  const cartItems = cart?.items;

  const { mutate: addToCart } = useMutation({
    mutationFn: async (method: CartAction) => {
      if (!cartItems) {
        return;
      }

      const quantity = cartItems.find(
        (item) => item.product_id === product_id
      )!.quantity;

      if (userEmail) {
        const CartService = await import('@/entities/cart').then(
          (module) => module.CartService
        );

        switch (method) {
          case CartAction.Clear:
            await CartService.remove({
              product_id,
              quantity,
              userEmail
            });
            break;
          case CartAction.Decrement:
            await CartService.remove({
              product_id,
              quantity: 1,
              userEmail
            });
            break;
          case CartAction.Increment:
            await CartService.add({
              product_id,
              quantity: 1,
              userEmail
            });
            break;
        }

        return;
      }

      switch (method) {
        case CartAction.Clear:
          removeFromLocalCart(product_id);
          break;
        case CartAction.Decrement:
          decrementLocalCartQuantity(product_id);
          break;
        case CartAction.Increment:
          incrementLocalCartQuantity(product_id);
          break;
      }
    },
    mutationKey: [MutationKey.AddToCart],
    onSuccess: async () => {
      if (!userEmail) {
        return;
      }

      await invalidateCart();
    }
  });

  return (
    <div className={clsx(s.productCounter, className)}>
      <div className={s.productCounter__body}>
        <div className={s.productCounter__content}>
          <Btn
            className={s.productCounter__btn}
            icon={{
              label: tShared('cart.counter.decrement'),
              value: '/img/icons/form/minus.svg'
            }}
            type="button"
            onClick={() => {
              addToCart(CartAction.Decrement);
            }}
          />
          <p className={s.productCounter__value}>{quantity}</p>
          <Btn
            className={s.productCounter__btn}
            icon={{
              label: tShared('cart.counter.increment'),
              value: '/img/icons/form/plus.svg'
            }}
            type="button"
            onClick={() => {
              addToCart(CartAction.Increment);
            }}
          />
        </div>
        <Btn
          className={s.productCounter__btn}
          icon={{
            label: tShared('cart.counter.clear'),
            value: '/img/icons/form/trash.svg'
          }}
          type="button"
          onClick={() => {
            addToCart(CartAction.Clear);
          }}
        />
      </div>
    </div>
  );
};
