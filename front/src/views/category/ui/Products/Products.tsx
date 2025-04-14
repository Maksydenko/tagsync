"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";

import { ProductCard } from "@/entities/product";
import { IProduct } from "@/entities/product/api";

import { SearchParam } from "@/shared/model";
import { Pagination } from "@/shared/ui";

import s from "./Products.module.scss";

// TODO: handle real products
const ALL_PRODUCTS_COUNT = 40;
const productsData: IProduct[] = Array.from(
  {
    length: ALL_PRODUCTS_COUNT,
  },
  (_, index) => ({
    id: index,
    images: [
      "/img/logos/logo.png",
      "/img/logos/logo.png",
      "/img/logos/logo.png",
    ],
    price: "14499",
    product_parameters: [
      {
        name: "memory",
        value: "12GB",
      },
      {
        name: "memory_type",
        value: "GDDR6",
      },
      {
        name: "memory_bus",
        value: "192-bit",
      },
    ],
    rating: 3.5,
    title: "GeForce RTX 3060 ASUS Dual",
  })
);

interface ProductsProps {
  className?: string;
}

export const Products: FC<ProductsProps> = ({ className }) => {
  const ITEMS_PER_PAGE = +process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE!;

  const searchParams = useSearchParams();
  const pageParam = searchParams.get(SearchParam.Page);
  const page = Number(pageParam) || 1;

  return (
    <div className={clsx(s.products, className)}>
      <div className={s.products__body}>
        <div className={s.products__content}>
          {/* TODO: handle real paginated products */}
          {productsData
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
            .map((product) => {
              return <ProductCard key={product.id} productData={product} />;
            })}
        </div>
        <Pagination
          className={s.products__pagination}
          itemsPerPage={ITEMS_PER_PAGE}
          itemsPerTotal={ALL_PRODUCTS_COUNT}
        />
      </div>
    </div>
  );
};
