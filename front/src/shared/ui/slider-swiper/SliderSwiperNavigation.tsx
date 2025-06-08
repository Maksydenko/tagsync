import { FC, MutableRefObject, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { SwiperRef } from "swiper/react";
import { SwiperOptions } from "swiper/types";

import { Translation } from "@/shared/config";
import { Direction, SlideDirection } from "@/shared/model";

import { Img } from "../img/Img";

import s from "./SliderSwiper.module.scss";

interface SliderSwiperNavigationProps {
  direction: Direction;
  initialSlide: SwiperOptions["initialSlide"];
  loop: SwiperOptions["loop"];
  slidesLength: number;
  swiperRef: MutableRefObject<SwiperRef>;
}

export const SliderSwiperNavigation: FC<SliderSwiperNavigationProps> = ({
  direction,
  initialSlide,
  loop,
  slidesLength,
  swiperRef,
}) => {
  const [isFirstSlide, setIsFirstSlide] = useState(!loop && initialSlide === 0);
  const [isLastSlide, setIsLastSlide] = useState(
    !loop && initialSlide === slidesLength - 1
  );

  const tShared = useTranslations(Translation.Shared);

  const slide = (slideDirection: SlideDirection) => {
    const { current: swiperElement } = swiperRef;
    const swiper = swiperElement?.swiper;

    const slides = {
      [SlideDirection.Next]: () => {
        swiper?.slideNext();
      },
      [SlideDirection.Prev]: () => {
        swiper?.slidePrev();
      },
    };

    slides[slideDirection]();
  };

  useEffect(() => {
    if (loop) {
      return;
    }

    const { current: swiperElement } = swiperRef;
    const swiper = swiperElement?.swiper;

    swiper?.on("slideChange", () => {
      const { isBeginning, isEnd } = swiper;

      setIsFirstSlide(isBeginning);
      setIsLastSlide(isEnd);
    });
  }, [loop, swiperRef]);

  const isVertical = direction === Direction.Vertical;

  const getIcon = () => (
    <Img
      alt={tShared("arrow")}
      className={s.sliderSwiper__icon}
      src="/img/icons/form/arrow-down.svg"
      isSvg
    />
  );

  return (
    <>
      <button
        aria-label="<"
        className={clsx(
          s.sliderSwiper__btn,
          s.sliderSwiper__btn_prev,
          isVertical && s.sliderSwiper__btn_vertical
        )}
        disabled={isFirstSlide}
        type="button"
        onClick={() => {
          slide(SlideDirection.Prev);
        }}
      >
        {getIcon()}
      </button>
      <button
        aria-label=">"
        className={clsx(
          s.sliderSwiper__btn,
          s.sliderSwiper__btn_next,
          isVertical && s.sliderSwiper__btn_vertical
        )}
        disabled={isLastSlide}
        type="button"
        onClick={() => {
          slide(SlideDirection.Next);
        }}
      >
        {getIcon()}
      </button>
    </>
  );
};
