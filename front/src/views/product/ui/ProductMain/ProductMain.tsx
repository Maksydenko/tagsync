"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AuthService } from "@/features/auth";
import { CartService } from "@/features/cart";
import { ComparisonsService } from "@/features/comparisons";
import { WishlistService } from "@/features/wishlist";

import { Checked } from "@/entities/indicator";
import { IProduct } from "@/entities/product";

import { invalidateQueries } from "@/shared/lib";
import {
  formatPrice,
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
  productData: { average_rating, price, product_id, slug, title },
  reviewsLength,
}) => {
  const { push } = useRouter();

  const tShared = useTranslations(Translation.Shared);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      rating: average_rating,
    },
  });

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryFn: async () => AuthService.getUserData(),
    queryKey: [QueryKey.User],
  });
  const userEmail = userData?.data.email;

  const { data: wishlistData, isLoading: isWishlistLoading } = useQuery({
    enabled: !!userEmail,
    queryFn: async () => {
      if (!userEmail) {
        return;
      }

      return WishlistService.get(userEmail);
    },
    queryKey: [QueryKey.Wishlist, userEmail],
  });
  const isWished = wishlistData?.data.some((product) => product.product_id === product_id);

  const { data: comparisonsData, isLoading: isComparisonsLoading } = useQuery({
    queryFn: async () => {
      if (!userEmail) {
        return;
      }

      return ComparisonsService.get(userEmail);
    },
    queryKey: [QueryKey.Comparisons, userEmail],
  });
  const isInComparisons = comparisonsData?.data[slug]?.some((product) => product.product_id === product_id);

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
  const isInCart = cartData?.data.items.some((product) => product.product_id === product_id);

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
          WishlistService.remove({
            product_id,
            userEmail,
          });

          return;
        }

        WishlistService.add({
          product_id,
          userEmail,
        });
      },
      mutationKey: [MutationKey.AddToWishlist, userEmail],
      onSuccess: async () => {
        await invalidateQueries(queryClient, [QueryKey.Wishlist]);
        // Triggered by a repeat call
        await invalidateQueries(queryClient, [QueryKey.Wishlist]);
      },
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
          ComparisonsService.remove({
            product_id,
            userEmail: userData.data.email,
          });

          return;
        }

        ComparisonsService.add({
          product_id,
          userEmail: userData.data.email,
        });
      },
      mutationKey: [MutationKey.AddToComparisons],
      onSuccess: async () => {
        await invalidateQueries(queryClient, [QueryKey.Comparisons]);
        // Triggered by a repeat call
        await invalidateQueries(queryClient, [QueryKey.Comparisons]);
      },
    });

  const { isPending: isAddToCartPending, mutate: addToCart } = useMutation({
    mutationFn: async () => {
      if (isUserLoading || isInCart) {
        throw new Error();
      }

      if (!userData) {
        push(Pathname.Login);

        throw new Error();
      }

      CartService.add({
        product_id,
        quantity: 1,
        userEmail: userData.data.email,
      });
    },
    mutationKey: [MutationKey.AddToCart],
    onSuccess: async () => {
      await invalidateQueries(queryClient, [QueryKey.Cart]);
      // Triggered by a repeat call
      await invalidateQueries(queryClient, [QueryKey.Cart]);
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
          <span>({reviewsLength})</span>
        </div>
        <span className={s.productMain__price}>
          {formatPrice({
            number: +price,
          })}
        </span>
        <div className={s.productMain__footer}>
          <Btn
            className={s.productMain__btn}
            disabled={isAddToCartPending || isCartLoading}
            icon="/img/icons/product/cart.svg"
            isLoading={isAddToCartPending}
            onClick={() => {
              addToCart();
            }}
          >
            <span>
              {tShared(`product.cart.${isInCart ? "in" : "add-to"}-cart`)}
            </span>
            {isInCart && <Checked className={s.productMain__indicator} />}
          </Btn>
          <div className={s.productMain__btns}>
            <button
              className={s.productMain__btn}
              disabled={isAddToComparisonsPending || isComparisonsLoading}
              type="button"
              onClick={() => {
                addToComparisons();
              }}
            >
              <Img
                className={s.productMain__icon}
                src="/img/icons/product/compare.svg"
              />
              {isInComparisons && (
                <Checked className={s.productMain__indicator} />
              )}
            </button>
            <button
              className={s.productMain__btn}
              disabled={isAddToWishlistPending || isWishlistLoading}
              type="button"
              onClick={() => {
                addToWishlist();
              }}
            >
              <Img
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
