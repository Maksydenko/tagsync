import { FC } from "react";
import Link from "next/link";
import { clsx } from "clsx";

import { ICartProduct } from "@/features/cart";

import { formatPrice } from "@/shared/model";
import { Img } from "@/shared/ui";

import { ProductCounter } from "./ProductCounter/ProductCounter";

import s from "./CartProduct.module.scss";

interface CartProductProps {
  className?: string;
  productData: ICartProduct;
}

export const CartProduct: FC<CartProductProps> = ({
  className,
  productData,
}) => {
  const { all_price, images, product_id, slug, title } = productData;

  return (
    <div className={clsx(s.cartProduct, className)}>
      <div className={s.cartProduct__body}>
        <Link className={s.cartProduct__link} href={`/${slug}/${product_id}`}>
          <Img alt={title} className={s.cartProduct__img} src={images[0]} />
        </Link>
        <div className={s.cartProduct__content}>
          <h3 className={s.cartProduct__title}>{title}</h3>
          <p className={s.cartProduct__price}>
            {formatPrice({
              number: +all_price,
            })}
          </p>
          <ProductCounter
            className={s.cartProduct__counter}
            productData={productData}
          />
        </div>
      </div>
    </div>
  );
};
