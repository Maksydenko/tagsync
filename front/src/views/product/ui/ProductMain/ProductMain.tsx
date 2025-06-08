"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { useLocalCart } from "@/application/store";

import { cartAtom, cartOpenAtom } from "@/entities/cart";
import { Checked } from "@/entities/indicator";
import { comparisonsAtom, IProduct, wishlistAtom } from "@/entities/product";
import { userAtom } from "@/entities/user";

import { useInvalidateAtom } from "@/shared/lib";
import {
  formatPrice,
  isValueInSet,
  MutationKey,
  Pathname,
  QueryKey,
  Translation,
} from "@/shared/model";
import { Btn, Img, Rating } from "@/shared/ui";

import s from "./ProductMain.module.scss";

interface ProductMainProps {
  className?: string;
  productData: IProduct;
  reviewsLength: number;
}

export const ProductMain: FC<ProductMainProps> = ({
  className,
  productData,
  reviewsLength,
}) => {
  const { price, product_id, rating, slug, title } = productData;

  const { push } = useRouter();
  const tShared = useTranslations(Translation.Shared);

  const setIsCartOpen = useSetAtom(cartOpenAtom);

  const [{ data: userData, isLoading: isUserLoading }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

  const form = useForm({
    defaultValues: {
      rating,
    },
  });

  const invalidateWishlist = useInvalidateAtom([QueryKey.Wishlist]);
  const [{ data: wishlistData, isLoading: isWishlistLoading }] = useAtom(
    wishlistAtom(userEmail)
  );
  const isWished = isValueInSet({
    data: wishlistData?.data,
    key: "product_id",
    value: product_id,
  });

  const invalidateComparisons = useInvalidateAtom([QueryKey.Comparisons]);
  const [{ data: comparisonsData, isLoading: isComparisonsLoading }] = useAtom(
    comparisonsAtom(userEmail)
  );
  const isInComparisons = isValueInSet({
    data: comparisonsData?.data[slug.toLocaleLowerCase()],
    key: "product_id",
    value: product_id,
  });

  const invalidateCart = useInvalidateAtom([QueryKey.Cart]);
  const [{ data: cartData, isLoading: isCartLoading }] = useAtom(
    cartAtom(userEmail)
  );
  const { addToLocalCart, localCart } = useLocalCart();

  const cart = cartData?.data ?? localCart;
  const cartItems = cart?.items;
  const isInCart = isValueInSet({
    data: cartItems,
    key: "product_id",
    value: product_id,
  });

  const { isPending: isAddToWishlistPending, mutate: addToWishlist } =
    useMutation({
      mutationFn: async () => {
        if (isUserLoading) {
          throw new Error();
        }

        if (!userEmail) {
          push(Pathname.Login);

          throw new Error();
        }

        const WishlistService = await import("@/features/wishlist").then(
          (module) => module.WishlistService
        );

        if (isWished) {
          return WishlistService.remove({
            product_id,
            userEmail,
          });
        }

        return WishlistService.add({
          product_id,
          userEmail,
        });
      },
      mutationKey: [MutationKey.AddToWishlist, userEmail],
      onSuccess: async () => invalidateWishlist(),
    });

  const { isPending: isAddToComparisonsPending, mutate: addToComparisons } =
    useMutation({
      mutationFn: async () => {
        if (isUserLoading) {
          throw new Error();
        }

        if (!userData) {
          push(Pathname.Login);

          throw new Error();
        }

        const ComparisonsService = await import("@/features/comparisons").then(
          (module) => module.ComparisonsService
        );

        if (isInComparisons) {
          return ComparisonsService.remove({
            product_id,
            userEmail: userData.data.email,
          });
        }

        return ComparisonsService.add({
          product_id,
          userEmail: userData.data.email,
        });
      },
      mutationKey: [MutationKey.AddToComparisons],
      onSuccess: async () => invalidateComparisons(),
    });

  const { isPending: isAddToCartPending, mutate: addToCart } = useMutation({
    mutationFn: async () => {
      if (isUserLoading || isInCart) {
        throw new Error();
      }

      if (!userData) {
        return addToLocalCart(productData);
      }

      const CartService = await import("@/entities/cart").then(
        (module) => module.CartService
      );

      return CartService.add({
        product_id,
        quantity: 1,
        userEmail: userData.data.email,
      });
    },
    mutationKey: [MutationKey.AddToCart],
    onSuccess: async () => {
      if (!userData) {
        return;
      }

      await invalidateCart();
    },
  });

  return (
    <div className={clsx(s.productMain, className)}>
      <div className={s.productMain__body}>
        <h1 className={s.productMain__title}>{title}</h1>
        <div className={s.productMain__reviews}>
          <Rating
            className={s.productMain__rating}
            formReturn={form}
            name="rating"
            options={{
              disabled: true,
            }}
          />
          <p>({reviewsLength})</p>
        </div>
        <p className={s.productMain__price}>
          {formatPrice({
            number: +price,
          })}
        </p>
        <div className={s.productMain__footer}>
          <Btn
            className={s.productMain__btn}
            disabled={isAddToCartPending || isCartLoading}
            icon={{
              label: tShared(`product.cart.${isInCart ? "in" : "add-to"}-cart`),
              value: "/img/icons/product/cart.svg",
            }}
            isLoading={isAddToCartPending}
            onClick={() => {
              if (isInCart) {
                return setIsCartOpen(true);
              }

              addToCart();
            }}
          >
            <p>{tShared(`product.cart.${isInCart ? "in" : "add-to"}-cart`)}</p>
            {isInCart && <Checked className={s.productMain__indicator} />}
          </Btn>
          <div className={s.productMain__btns}>
            <button
              aria-label={tShared(
                `product.compare.${
                  isInComparisons ? "remove-from" : "add-to"
                }-compare`
              )}
              className={s.productMain__btn}
              disabled={isAddToComparisonsPending || isComparisonsLoading}
              type="button"
              onClick={() => {
                addToComparisons();
              }}
            >
              <Img
                aria-label={tShared(
                  `product.compare.${
                    isInComparisons ? "remove-from" : "add-to"
                  }-compare`
                )}
                className={s.productMain__icon}
                src="/img/icons/product/compare.svg"
              />
              {isInComparisons && (
                <Checked className={s.productMain__indicator} />
              )}
            </button>
            <button
              aria-label={tShared(
                `product.wishlist.${
                  isWished ? "remove-from" : "add-to"
                }-wishlist`
              )}
              className={s.productMain__btn}
              disabled={isAddToWishlistPending || isWishlistLoading}
              type="button"
              onClick={() => {
                addToWishlist();
              }}
            >
              <Img
                alt={tShared(
                  `product.wishlist.${
                    isWished ? "remove-from" : "add-to"
                  }-wishlist`
                )}
                className={s.productMain__icon}
                src={`/img/icons/product/heart-${
                  isWished ? "fill" : "empty"
                }.svg`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
