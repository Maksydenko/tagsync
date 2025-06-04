"use client";

import { FC } from "react";
import { useLocale } from "next-intl";
import { clsx } from "clsx";

import { Img, Loader } from "@/shared/ui";

import s from "./HomeSlide.module.scss";

interface HomeSlideProps {
  className?: string;
  slide: string;
}

export const HomeSlide: FC<HomeSlideProps> = ({ className, slide }) => {
  const locale = useLocale();

  return (
    <div className={clsx(s.homeSlide, className)}>
      <div className={s.homeSlide__body}>
        <Img
          className={s.homeSlide__img}
          customLoader={<Loader className={s.homeSlide__loader} />}
          quality={90}
          src={`/img/home/${locale}/${slide}.png`}
        />
      </div>
    </div>
  );
};
