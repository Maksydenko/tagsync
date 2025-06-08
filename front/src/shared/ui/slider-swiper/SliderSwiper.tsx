"use client";

import { FC, ReactNode, useEffect, useRef } from "react";
import { clsx } from "clsx";
// import Swiper core and required modules
import {
  Autoplay,
  // FreeMode,
  // HashNavigation,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  // Parallax,
  // Scrollbar,
  Thumbs,
  Virtual,
} from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import { Direction, ILink } from "@/shared/model";

import { IBreakpoints } from "./breakpoints.interface";

import { useBullets } from "./useBullets";

import { SliderSwiperNavigation } from "./SliderSwiperNavigation";

import s from "./SliderSwiper.module.scss";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
// import "swiper/scss/scrollbar";
import "swiper/scss/thumbs";
import "swiper/scss/virtual";

export interface SliderSwiperProps extends SwiperProps {
  autoplayDelay?: number;
  autoplayDisableOnInteraction?: boolean;
  autoplayStopOnLastSlide?: boolean;
  breakpoints?: IBreakpoints;
  className?: string;
  direction?: Direction.Horizontal | Direction.Vertical;
  hash?: string;
  hashNavigationWatchState?: boolean;
  keyboardEnabled?: boolean;
  keyboardOnlyInViewport?: boolean;
  keyboardPageUpDown?: boolean;
  mousewheelSensitivity?: number;
  paginationClickable?: boolean;
  paginationDynamicBullets?: boolean;
  paginationType?: "bullets" | "fraction" | "progressbar";
  scrollbarDraggable?: boolean;
  slides: ILink<ReactNode>[];
}

export const SliderSwiper: FC<SliderSwiperProps> = ({
  // Auto height
  autoHeight = true,
  // Autoplay
  autoplay,
  // Pause between slides
  autoplayDelay = 5000,
  // Disable after manual override
  autoplayDisableOnInteraction,
  // Stop on last slide
  autoplayStopOnLastSlide,
  // Breakpoints (adaptive)
  breakpoints,
  // Active slide in the center
  centeredSlides,

  // Class name
  className,

  // Slider horizontal/vertical
  direction = Direction.Horizontal,
  // Free mode
  freeMode,
  // Grab cursor
  grabCursor = true,
  // Hash navigation
  hash,
  // Track the condition
  hashNavigationWatchState,
  // Starting slide
  initialSlide = 0,

  // Keyboard management

  // Turn on/off
  keyboardEnabled = true,
  // Turn on/off only when the slider is within the viewport
  keyboardOnlyInViewport = true,
  // Turn on/off the control control of PageUp, PageDown
  keyboardPageUpDown,

  // Loop slider
  loop,
  // Mouse wheel control
  mousewheel,

  // The sensitivity of mouse wheel
  mousewheelSensitivity = 1,
  // Navigation
  navigation = true,

  // No swiping
  noSwiping,
  noSwipingClass = "swiper-no-swiping",
  // Update slider when slider items change
  observer = true,
  onSwiper,
  // Pagination
  pagination,
  // Clickable
  paginationClickable = true,
  // Dynamic bullets
  paginationDynamicBullets,
  // Types: bullets, fraction, progressbar
  paginationType = "bullets",
  // Turn on/off parallax
  parallax,
  // Scrollbar
  scrollbar,
  // The ability to drag scrollbar
  scrollbarDraggable = true,
  // Turning/disabling dragging on a PC
  simulateTouch = true,
  // Slides
  slides,
  // The number of flipped slides
  slidesPerGroup = 1,
  // Number of slides for showing
  slidesPerView = 1,
  // Switching when clicking on a slide
  slideToClickedSlide,
  // The indent between the slides
  spaceBetween = 32,
  // Speed
  speed = 300,
  // Thumbs
  thumbs,
  // Sweep/dragging angle
  touchAngle = 45,
  // Sweep sensitivity
  touchRatio = 1,
  // Virtual slides
  virtual,
  // Disabling navigation if there are more slides than needed
  watchOverflow = true,
}) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const swiperRef = useRef<any>(null);

  const { length: slidesLength } = slides;

  const isBullets =
    pagination &&
    paginationType === "bullets" &&
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    useBullets({
      breakpoints,
      slidesLength,
      slidesPerView,
    });

  useEffect(() => {
    const swiperCurrent = swiperRef?.current;
    const swiper = swiperCurrent?.swiper;

    if (!swiper) {
      return;
    }

    swiperCurrent.querySelectorAll("*").forEach(
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (element: any) => {
        element.setAttribute("tabIndex", "-1");
      }
    );
  }, []);

  useEffect(() => {
    const swiperElement = swiperRef?.current;
    const swiper = swiperElement?.swiper;
    const swiperAutoplay = swiper?.autoplay;

    if (swiperAutoplay) {
      if (autoplay) {
        swiperAutoplay.start();
      } else {
        swiperAutoplay.stop();
      }
    }
  }, [autoplay]);

  const slideItems = slides.map(({ label, value }, index) => (
    <SwiperSlide
      key={label}
      {...(hash && {
        "data-hash": `${hash}${label}`,
      })}
      {...(virtual && {
        virtualIndex: index,
      })}
    >
      {value}
    </SwiperSlide>
  ));

  return (
    <div
      className={clsx(
        s.sliderSwiper,
        isBullets && s.sliderSwiper_bullets,
        className
      )}
    >
      <div className={s.sliderSwiper__body}>
        <Swiper
          ref={swiperRef}
          className={s.sliderSwiper__swiper}
          // Modules
          modules={[
            Autoplay,
            // FreeMode,
            // HashNavigation,
            Keyboard,
            Mousewheel,
            Navigation,
            Pagination,
            // Parallax,
            // Scrollbar,
            Thumbs,
            Virtual,
          ]}
          /* eslint-disable react/jsx-sort-props */
          // Pagination
          {...(pagination && {
            pagination: {
              // Clickable
              clickable: paginationClickable,
              // Dynamic bullets
              dynamicBullets: paginationDynamicBullets,
              // Types: bullets, fraction, progressbar
              type: paginationType,
            },
          })}
          // Scrollbar
          {...(scrollbar && {
            scrollbar: {
              // The ability to drag scrollbar
              draggable: scrollbarDraggable,
            },
          })}
          // Turning/disabling dragging on a PC
          simulateTouch={simulateTouch}
          // Sweep sensitivity
          touchRatio={touchRatio}
          // Sweep/dragging angle
          touchAngle={touchAngle}
          // Grab cursor
          grabCursor={grabCursor}
          // Switching when clicking on a slide
          slideToClickedSlide={slideToClickedSlide}
          // Hash navigation
          {...(hash && {
            hashNavigation: {
              // Track the condition
              watchState: hashNavigationWatchState,
            },
          })}
          // Keyboard management
          {...(keyboardEnabled && {
            keyboard: {
              // Turn on/off
              enabled: keyboardEnabled,
              // Turn on/off only when the slider is within the viewport
              onlyInViewport: keyboardOnlyInViewport,
              // Turn on/off the control control of PageUp, PageDown
              pageUpDown: keyboardPageUpDown,
            },
          })}
          // Mouse wheel control
          {...(mousewheel && {
            mousewheel: {
              // The sensitivity of mouse wheel
              sensitivity: mousewheelSensitivity,
            },
          })}
          // Auto height
          autoHeight={autoHeight}
          // Number of slides for showing
          slidesPerView={slidesPerView}
          // Disabling functionality if there are more slides than needed
          watchOverflow={watchOverflow}
          // The indent between the slides
          spaceBetween={spaceBetween}
          // The number of flipped slides
          slidesPerGroup={slidesPerGroup}
          // Active slide in the center
          centeredSlides={centeredSlides}
          // Starting slide
          initialSlide={initialSlide}
          // Loop slider
          loop={loop}
          // Free mode
          freeMode={freeMode}
          // Autoplay
          {...(autoplay && {
            autoplay: {
              // Pause between slides
              delay: autoplayDelay,
              // Disable after manual override
              disableOnInteraction: autoplayDisableOnInteraction,
              // Stop on last slide
              stopOnLastSlide: autoplayStopOnLastSlide,
            },
          })}
          // Speed
          speed={speed}
          // Horizontal/vertical slider
          direction={direction}
          // Breakpoints (adaptive)
          breakpoints={breakpoints}
          // Update slider when slider items change
          observer={observer}
          // Turn on/off parallax
          parallax={parallax}
          // Virtual slides
          virtual={virtual}
          // No swiping
          noSwiping={noSwiping}
          noSwipingClass={noSwipingClass}
          // Thumbs
          thumbs={thumbs}
          onSwiper={onSwiper}
        >
          {slideItems}
        </Swiper>
        {navigation && (
          <SliderSwiperNavigation
            direction={direction}
            initialSlide={initialSlide}
            loop={loop}
            slidesLength={slidesLength}
            swiperRef={swiperRef}
          />
        )}
      </div>
    </div>
  );
};
