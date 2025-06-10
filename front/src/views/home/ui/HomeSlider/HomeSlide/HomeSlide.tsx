'use client';

import { FC } from 'react';
import { Locale, useLocale, useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { Translation } from '@/shared/config';
import { Img, Loader } from '@/shared/ui';

import s from './HomeSlide.module.scss';

interface HomeSlideProps {
  className?: string;
  isPriority?: boolean;
  slide: string;
}

export const HomeSlide: FC<HomeSlideProps> = ({
  className,
  isPriority,
  slide,
}) => {
  const locale = useLocale() as Locale;
  const tHome = useTranslations(Translation.Home);

  return (
    <div className={clsx(s.homeSlide, className)}>
      <div className={s.homeSlide__body}>
        <Img
          alt={tHome(`slider.${slide}`)}
          className={s.homeSlide__img}
          customLoader={<Loader className={s.homeSlide__loader} />}
          priority={isPriority}
          quality={90}
          src={`/img/home/${locale}/${slide}.png`}
        />
      </div>
    </div>
  );
};
