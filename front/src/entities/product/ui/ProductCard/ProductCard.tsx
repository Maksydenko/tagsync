"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

import { IDatabase } from "@/shared/lib";
import { formatPrice, Pathname, QueryKey } from "@/shared/model";
import { Btn, Img, Loader, Rating } from "@/shared/ui";

import { IProduct } from "../../api";

import s from "./ProductCard.module.scss";

interface ProductCardProps {
  className?: string;
  productData: IProduct;
}

export const ProductCard: FC<ProductCardProps> = ({
  className,
  productData: { images, price, rating, title },
}) => {
  const { push } = useRouter();
  const supabase = createClientComponentClient<IDatabase>();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryFn: async () => {
      const res = await supabase.auth.getUser();

      return res.data;
    },
    queryKey: [QueryKey.User],
  });

  const form = useForm({
    defaultValues: {
      rating,
    },
  });

  const addInWishlist = async () => {
    if (isUserLoading) {
      return;
    }

    if (userData?.user) {
      return;
    }

    push(Pathname.Login);
  };

  return (
    <div className={clsx(s.productCard, className)}>
      <div className={s.productCard__body}>
        <Link className={s.productCard__link} href="/category/product" />
        <div className={s.productCard__header}>
          <button className={s.productCard__btn} type="button">
            <Img
              className={s.productCard__icon}
              src="/img/icons/product/compare.svg"
            />
          </button>
          <button
            className={s.productCard__btn}
            disabled={isUserLoading}
            type="button"
            onClick={addInWishlist}
          >
            <Img
              className={s.productCard__icon}
              src="/img/icons/product/heart-empty.svg"
            />
          </button>
        </div>
        <Img
          alt={title}
          className={s.productCard__img}
          loader={<Loader />}
          src={images[0]}
        />
        <div className={s.productCard__content}>
          <h5 className={s.productCard__title}>{title}</h5>
          <Rating
            className={s.productCard__rating}
            formReturn={form}
            name="rating"
            options={{
              disabled: true,
            }}
          />
          <div className={s.productCard__footer}>
            <span className={s.productCard__price}>
              {formatPrice({
                number: +price,
              })}
            </span>
            <Btn
              aria-label="Add to cart"
              className={s.productCard__btn}
              icon="/img/icons/product/cart.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
