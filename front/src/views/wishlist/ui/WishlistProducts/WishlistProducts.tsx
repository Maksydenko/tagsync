"use client";

import { FC } from "react";
import { clsx } from "clsx";

import { ProductCard } from "@/entities/product";
import { IProduct } from "@/entities/product/api";

import s from "./WishlistProducts.module.scss";

// TODO: handle real wishlistProducts
const productsData: IProduct[] = Array.from(
  {
    length: 20,
  },
  (_, index) => ({
    characteristics: [
      {
        name: "price",
        translations: {
          en: "Price",
          uk: "Ціна",
        },
        value: "13999",
        value_translations: {
          en: "13999 UAH",
          uk: "13999 ₴",
        },
      },
      {
        name: "price",
        translations: {
          en: "Price",
          uk: "Ціна",
        },
        value: "13999",
        value_translations: {
          en: "13999 UAH",
          uk: "13999 ₴",
        },
      },
      {
        name: "price",
        translations: {
          en: "Price",
          uk: "Ціна",
        },
        value: "13999",
        value_translations: {
          en: "13999 UAH",
          uk: "13999 ₴",
        },
      },
    ],
    images: [
      "/img/logos/logo.png",
      "/img/logos/logo.png",
      "/img/logos/logo.png",
    ],
    price: "14499",
    product_id: index,
    rating: 3.5,
    title: "GeForce RTX 3060 ASUS Dual",
  })
);

interface WishlistProductsProps {
  className?: string;
}

export const WishlistProducts: FC<WishlistProductsProps> = ({ className }) => {
  return (
    <div className={clsx(s.wishlistProducts, className)}>
      <div className={s.wishlistProducts__body}>
        {productsData.map((product) => {
          return <ProductCard key={product.product_id} productData={product} />;
        })}
      </div>
    </div>
  );
};
