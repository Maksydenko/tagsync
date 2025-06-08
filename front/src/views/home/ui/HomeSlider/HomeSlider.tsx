import { FC } from "react";
import { clsx } from "clsx";

import { SliderSwiper } from "@/shared/ui";

import { HomeSlide } from "./HomeSlide/HomeSlide";

import s from "./HomeSlider.module.scss";

interface HomeSliderProps {
  className?: string;
}

export const HomeSlider: FC<HomeSliderProps> = ({ className }) => {
  const slides = ["gaming", "recommendations", "delivery"];

  return (
    <div className={clsx(s.homeSlider, className)}>
      <div className={s.homeSlider__body}>
        <SliderSwiper
          autoHeight={false}
          className={s.homeSlider__slider}
          slides={slides.map((slide, index) => ({
            label: slide,
            value: (
              <HomeSlide
                key={slide}
                className={s.homeSlider__slide}
                isPriority={index === 0}
                slide={slide}
              />
            ),
          }))}
          spaceBetween={0}
          autoplay
          loop
          pagination
        />
      </div>
    </div>
  );
};
