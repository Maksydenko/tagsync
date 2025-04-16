import { FC } from "react";

import { IProduct, ProductsSlider } from "@/entities/product";

import { Characteristics } from "./Characteristics/Characteristics";
import { ProductHeader } from "./ProductHeader/ProductHeader";
import { ProductMain } from "./ProductMain/ProductMain";
import { ProductSliders } from "./ProductSliders/ProductSliders";
import { Reviews } from "./Reviews/Reviews";

import s from "./Product.module.scss";

// TODO: handle real products
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
      "/img/icons/user.svg",
      "/img/logos/logo.png",
      "/img/icons/user.svg",
      "/img/logos/logo.png",
    ],
    price: "14499",
    product_id: index,
    rating: 3.5,
    title: "GeForce RTX 3060 ASUS Dual",
  })
);

export const Product: FC = () => {
  const [productData] = productsData;

  return (
    <div className={s.productPage}>
      <div className={s.product}>
        <div className={s.product__container}>
          <div className={s.product__body}>
            <ProductHeader className={s.product__header} />
            <div className={s.product__content}>
              <ProductSliders
                className={s.product__sliders}
                images={productData.images}
                title={productData.title}
              />
              <ProductMain
                className={s.product__main}
                productData={productData}
              />
              <Characteristics characteristics={productData.characteristics} />
            </div>
            <ProductsSlider
              productsData={productsData}
              title={"Related products"}
            />
            <ProductsSlider
              productsData={productsData}
              title={"Similar products"}
            />
            <Reviews className={s.product__reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};
