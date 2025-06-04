"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useMutation } from "@tanstack/react-query";

import { addToLocalCart } from "@/application/store";

import { ComparisonsService } from "@/features/comparisons";
import { WishlistService } from "@/features/wishlist";

import { cartAtom, cartOpenAtom, CartService } from "@/entities/cart";
import { Checked } from "@/entities/indicator";
import { userAtom } from "@/entities/user";

import { useInvalidateAtom, useTypedSelector } from "@/shared/lib";
import {
  formatPrice,
  isValueInSet,
  MutationKey,
  Pathname,
  QueryKey,
  Translation,
} from "@/shared/model";
import { Btn, Img, Loader, Rating } from "@/shared/ui";

import { IProduct } from "../../api";

import { comparisonsAtom, wishlistAtom } from "../../model";

import s from "./ProductCard.module.scss";

interface ProductCardProps {
  className?: string;
  isStable?: boolean;
  productData: IProduct;
}

export const ProductCard: FC<ProductCardProps> = ({
  className,
  isStable,
  productData,
}) => {
  const { average_rating, images, price, product_id, slug, title } =
    productData;

  const { push } = useRouter();
  const tShared = useTranslations(Translation.Shared);

  const setIsOpen = useSetAtom(cartOpenAtom);

  const [{ data: userData, isLoading: isUserLoading }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

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
  const localCart = useTypedSelector(({ localCart }) => localCart);
  const dispatch = useDispatch();

  const cart = cartData?.data ?? localCart;
  const isInCart = isValueInSet({
    data: cart.items,
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
        return dispatch(addToLocalCart(productData));
      }

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

  const form = useForm({
    defaultValues: {
      rating: average_rating,
    },
  });

  return (
    <div className={clsx(s.productCard, className)}>
      <div className={s.productCard__body}>
        <Link className={s.productCard__link} href={`/${slug}/${product_id}`} />
        <div className={s.productCard__header}>
          <button
            className={s.productCard__btn}
            disabled={isAddToComparisonsPending || isComparisonsLoading}
            type="button"
            onClick={() => {
              addToComparisons();
            }}
          >
            <Img
              className={s.productCard__icon}
              src="/img/icons/product/compare.svg"
            />
            {isInComparisons && (
              <Checked className={s.productCard__indicator} />
            )}
          </button>
          <button
            className={s.productCard__btn}
            disabled={isAddToWishlistPending || isWishlistLoading}
            type="button"
            onClick={() => {
              addToWishlist();
            }}
          >
            <Img
              className={s.productCard__icon}
              src={`/img/icons/product/heart-${
                isWished ? "fill" : "empty"
              }.svg`}
            />
          </button>
        </div>
        <Img
          alt={title}
          className={s.productCard__img}
          loader={<Loader />}
          src={images?.[0]}
        />
        <div className={s.productCard__content}>
          <h5
            className={clsx(
              s.productCard__title,
              isStable && s.productCard__title_stable
            )}
          >
            {title}
          </h5>
          <Rating
            className={s.productCard__rating}
            formReturn={form}
            name="rating"
            options={{
              disabled: true,
            }}
          />
          <div className={s.productCard__footer}>
            <div className={s.productCard__box}>
              <p className={s.productCard__price}>
                {formatPrice({
                  number: +price,
                })}
              </p>
              <div className={s.productCard__status}>
                {tShared("product.statuses.available")}
              </div>
            </div>
            <Btn
              aria-label={tShared("product.cart.add-to-cart")}
              className={s.productCard__btn}
              disabled={isCartLoading}
              icon="/img/icons/product/cart.svg"
              isLoading={isAddToCartPending}
              onClick={() => {
                if (isInCart) {
                  return setIsOpen(true);
                }

                addToCart();
              }}
            >
              {isInCart && <Checked className={s.productCard__indicator} />}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};
