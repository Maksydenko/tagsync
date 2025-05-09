"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";

import { ProductCard } from "@/entities/product";
import { IProduct } from "@/entities/product/api";

import { SearchParam } from "@/shared/model";
import { Pagination } from "@/shared/ui";

import s from "./CategoryProducts.module.scss";

// TODO: handle real products
const ALL_PRODUCTS_COUNT = 40;
const productsData: IProduct[] = Array.from(
  {
    length: ALL_PRODUCTS_COUNT,
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

interface CategoryProductsProps {
  className?: string;
}

export const CategoryProducts: FC<CategoryProductsProps> = ({ className }) => {
  const ITEMS_PER_PAGE = +process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE!;

  const searchParams = useSearchParams();

  const pageParam = searchParams.get(SearchParam.Page);
  const page = Number(pageParam) || 1;

  return (
    <div className={clsx(s.categoryProducts, className)}>
      <div className={s.categoryProducts__body}>
        <div className={s.categoryProducts__content}>
          {/* TODO: handle real paginated products */}
          {productsData
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
            .map((product) => {
              return (
                <ProductCard key={product.product_id} productData={product} />
              );
            })}
        </div>
        <Pagination
          className={s.categoryProducts__pagination}
          itemsPerPage={ITEMS_PER_PAGE}
          itemsPerTotal={ALL_PRODUCTS_COUNT}
        />
      </div>
    </div>
  );
};
