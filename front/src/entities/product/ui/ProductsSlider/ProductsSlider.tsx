import { FC } from "react";
import { clsx } from "clsx";

import { SliderSwiper } from "@/shared/ui";

import { IProduct } from "../../api";

import { ProductCard } from "../ProductCard/ProductCard";

import s from "./ProductsSlider.module.scss";

interface ProductsSliderProps {
  className?: string;
  productsData: IProduct[];
  title?: string;
}

export const ProductsSlider: FC<ProductsSliderProps> = ({
  className,
  productsData,
  title,
}) => {
  return (
    <div className={clsx(s.productsSlider, className)}>
      <div className={s.productsSlider__body}>
        {title && <h2 className={s.productsSlider__title}>{title}</h2>}
        <SliderSwiper
          className={s.productsSlider__slider}
          slides={productsData.map((product) => {
            const { product_id } = product;

            return {
              label: product_id.toString(),
              value: (
                <ProductCard
                  key={product_id}
                  className={s.productsSlider__productCard}
                  productData={product}
                />
              ),
            };
          })}
          slidesPerView={4}
        />
      </div>
    </div>
  );
};
