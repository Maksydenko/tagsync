import { FC } from "react";
import { useTranslations } from "next-intl";

import { IProduct, ProductsSlider } from "@/entities/product";

import { Translation } from "@/shared/model";

import s from "./Home.module.scss";

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
      "/img/logos/logo.png",
      "/img/logos/logo.png",
    ],
    price: "14499",
    product_id: index,
    rating: 3.5,
    title: "GeForce RTX 3060 ASUS Dual",
  })
);

export const Home: FC = () => {
  const tHome = useTranslations(Translation.Home);

  return (
    <div className={s.homePage}>
      <p>{tHome("title")}</p>
      <ProductsSlider productsData={productsData} title={tHome("title")} />
    </div>
  );
};
