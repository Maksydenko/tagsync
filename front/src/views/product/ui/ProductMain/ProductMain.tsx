"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

import { IProduct } from "@/entities/product";

import { IDatabase } from "@/shared/lib";
import { formatPrice, Pathname, QueryKey, Translation } from "@/shared/model";
import { Btn, Img, Rating } from "@/shared/ui";

import s from "./ProductMain.module.scss";

interface ProductMainProps {
  className?: string;
  productData: IProduct;
}

export const ProductMain: FC<ProductMainProps> = ({
  className,
  productData,
}) => {
  const { push } = useRouter();
  const tShared = useTranslations(Translation.Shared);

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
      rating: productData.rating,
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
    <div className={clsx(s.productMain, className)}>
      <div className={s.productMain__body}>
        <h1 className={s.productMain__title}>{productData.title}</h1>
        <div className={s.productMain__reviews}>
          <Rating
            className={s.productMain__rating}
            formReturn={form}
            name="rating"
            options={{
              disabled: true,
            }}
          />
          <span>(10)</span>
        </div>
        <span className={s.productMain__price}>
          {formatPrice({
            number: +productData.price,
          })}
        </span>
        <div className={s.productMain__footer}>
          <Btn
            className={s.productMain__btn}
            icon="/img/icons/product/cart.svg"
          >
            {tShared("product.add-to-cart")}
          </Btn>
          <div className={s.productMain__btns}>
            <button className={s.productMain__btn} type="button">
              <Img
                className={s.productMain__icon}
                src="/img/icons/product/compare.svg"
              />
            </button>
            <button
              className={s.productMain__btn}
              disabled={isUserLoading}
              type="button"
              onClick={addInWishlist}
            >
              <Img
                className={s.productMain__icon}
                src="/img/icons/product/heart-empty.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
