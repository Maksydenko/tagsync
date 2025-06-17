import { FC, MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { SwiperRef } from 'swiper/react';
import { Swiper, SwiperOptions } from 'swiper/types';

import { Translation } from '@/shared/config';
import { Direction, SlideDirection } from '@/shared/model';

import { Img } from '../img/Img';

import s from './SliderSwiper.module.scss';

interface SliderSwiperNavigationProps {
  direction: Direction;
  initialSlide: SwiperOptions['initialSlide'];
  loop: SwiperOptions['loop'];
  slidesLength: number;
  swiperRef: MutableRefObject<SwiperRef>;
}

export const SliderSwiperNavigation: FC<SliderSwiperNavigationProps> = ({
  direction,
  initialSlide,
  loop,
  slidesLength,
  swiperRef
}) => {
  const [isFirstSlide, setIsFirstSlide] = useState(!loop && initialSlide === 0);
  const [isLastSlide, setIsLastSlide] = useState(
    !loop && initialSlide === slidesLength - 1
  );

  const tShared = useTranslations(Translation.Shared);
  const isVertical = direction === Direction.Vertical;

  const updateNavigation = useCallback(
    ({ isBeginning, isEnd, params, slides }: Swiper) => {
      const isEnoughSlides = slides.length > (params.slidesPerView as number);

      setIsFirstSlide(!isEnoughSlides || isBeginning);
      setIsLastSlide(!isEnoughSlides || isEnd);
    },
    []
  );

  useEffect(() => {
    if (loop) {
      return;
    }

    const { current: swiperElement } = swiperRef;
    const swiper = swiperElement?.swiper;

    if (!swiper) {
      return;
    }

    updateNavigation(swiper);

    swiper.on('slideChange', updateNavigation);

    return () => {
      swiper.off('slideChange', updateNavigation);
    };
  }, [loop, swiperRef, updateNavigation]);

  const slide = (slideDirection: SlideDirection) => {
    const { current: swiperElement } = swiperRef;
    const swiper = swiperElement?.swiper;

    const slides = {
      [SlideDirection.Next]: () => {
        swiper?.slideNext();
      },
      [SlideDirection.Prev]: () => {
        swiper?.slidePrev();
      }
    };

    slides[slideDirection]();
  };

  const getBtn = (direction: SlideDirection) => {
    const isPrevDirection = direction === SlideDirection.Prev;
    const isDisabled = isPrevDirection ? isFirstSlide : isLastSlide;

    return (
      <button
        aria-label={tShared(`slide-directions.${direction}`)}
        className={clsx(
          s.sliderSwiper__btn,
          s[`sliderSwiper__btn_${isPrevDirection ? 'prev' : 'next'}`],
          isVertical && s.sliderSwiper__btn_vertical
        )}
        disabled={isDisabled}
        type="button"
        onClick={() => {
          if (isDisabled) {
            return;
          }

          slide(direction);
        }}
      >
        <Img
          alt={tShared('arrow')}
          className={s.sliderSwiper__icon}
          src="/img/icons/form/arrow-down.svg"
          isSvg
        />
      </button>
    );
  };

  return (
    <>
      {getBtn(SlideDirection.Prev)}
      {getBtn(SlideDirection.Next)}
    </>
  );
};
