'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useAtom } from 'jotai';

import { useQuery } from '@tanstack/react-query';

import { countriesAtom } from '@/features/countries';
import { CountriesService } from '@/features/countries/api';
import { useTwelveDataWS } from '@/features/currency';

import { IProduct, ProductsSlider } from '@/entities/product';

import { Translation } from '@/shared/config';

import { HomeSlider } from './HomeSlider/HomeSlider';

import s from './Home.module.scss';

interface HomeProps {
  popularData: IProduct[];
  topRatedData: IProduct[];
}

export const Home: FC<HomeProps> = ({ popularData, topRatedData }) => {
  const tHome = useTranslations(Translation.Home);

  const [{ data }] = useAtom(countriesAtom);
  console.log(data);

  return (
    <div className={s.home}>
      <HomeSlider className={s.home__slider} />
      <div className={s.home__container}>
        <div className={s.home__body}>
          <ProductsSlider
            productsData={popularData}
            title={tHome('recommendations.popular')}
          />
          <ProductsSlider
            productsData={topRatedData}
            title={tHome('recommendations.top-rated')}
          />
        </div>
      </div>
    </div>
  );
};
