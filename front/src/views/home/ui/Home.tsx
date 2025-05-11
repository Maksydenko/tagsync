import { FC } from "react";
import { useTranslations } from "next-intl";

import { IProduct, ProductsSlider } from "@/entities/product";

import { Translation } from "@/shared/model";

import { HomeSlider } from "./HomeSlider/HomeSlider";

import s from "./Home.module.scss";

interface HomeProps {
  alsoViewedData: IProduct[];
  priceBasedData: IProduct[];
  similarData: IProduct[];
}

export const Home: FC<HomeProps> = ({
  alsoViewedData,
  priceBasedData,
  similarData,
}) => {
  const tHome = useTranslations(Translation.Home);

  return (
    <div className={s.home}>
      <HomeSlider className={s.home__slider} />
      <div className={s.home__container}>
        <div className={s.home__body}>
          <ProductsSlider
            productsData={alsoViewedData}
            title={tHome("recommendations.popular")}
          />
          <ProductsSlider
            productsData={priceBasedData}
            title={tHome("recommendations.recommended")}
          />
          <ProductsSlider
            productsData={similarData}
            title={tHome("recommendations.viewed")}
          />
        </div>
      </div>
    </div>
  );
};
