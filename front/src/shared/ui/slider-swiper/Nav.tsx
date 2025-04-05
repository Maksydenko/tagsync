import { FC, MutableRefObject, useEffect, useState } from "react";
import { SwiperRef } from "swiper/react";
import { SwiperOptions } from "swiper/types";

interface NavProps {
  initialSlide: SwiperOptions["initialSlide"];
  loop: SwiperOptions["loop"];
  slidesLength: number;
  swiperRef: MutableRefObject<SwiperRef>;
}

export const Nav: FC<NavProps> = ({
  initialSlide,
  loop,
  slidesLength,
  swiperRef,
}) => {
  const [isFirstSlide, setIsFirstSlide] = useState(!loop && initialSlide === 0);
  const [isLastSlide, setIsLastSlide] = useState(
    !loop && initialSlide === slidesLength - 1
  );

  // Slide
  interface ISlide {
    (direction: "next" | "prev"): void;
  }
  const slide: ISlide = (direction) => {
    const swiperCurrent = swiperRef.current;
    const swiper = swiperCurrent?.swiper;

    switch (direction) {
      case "prev":
        swiper?.slidePrev();
        break;
      case "next":
        swiper?.slideNext();
      default:
        break;
    }
  };

  useEffect(() => {
    if (loop) {
      return;
    }

    const swiperCurrent = swiperRef.current;
    const swiper = swiperCurrent?.swiper;

    swiper?.on("slideChange", () => {
      const { isBeginning, isEnd } = swiper;

      setIsFirstSlide(isBeginning);
      setIsLastSlide(isEnd);
    });
  }, [loop, swiperRef]);

  const arrow = <span className="slider-swiper__arrow _icon-arrow-top"></span>;

  return (
    <>
      <button
        aria-label="Previous slide"
        className="slider-swiper__btn slider-swiper__btn_prev"
        disabled={isFirstSlide}
        type="button"
        onClick={() => {
          slide("prev");
        }}
      >
        {arrow}
      </button>
      <button
        aria-label="Next slide"
        className="slider-swiper__btn slider-swiper__btn_next"
        disabled={isLastSlide}
        type="button"
        onClick={() => {
          slide("next");
        }}
      >
        {arrow}
      </button>
    </>
  );
};
