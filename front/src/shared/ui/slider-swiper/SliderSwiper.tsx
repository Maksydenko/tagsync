"use client";

import { FC, ReactNode, useEffect, useRef } from "react";
import { clsx } from "clsx";
// import Swiper core and required modules
import {
  // Scrollbar,
  // HashNavigation,
  Keyboard,
  Navigation,
  Pagination,
  // Mousewheel,
  // FreeMode,
  // Autoplay,
  // Parallax,
  Virtual,
} from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper types
import { SwiperOptions } from "swiper/types";

import { IBreakpoints } from "./breakpoints.interface";

import { useBullets } from "./useBullets";

import s from "./SliderSwiper.module.scss";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
// import "swiper/scss/scrollbar";

export interface SliderSwiperProps extends SwiperOptions {
  autoplayDelay?: number;
  autoplayDisableOnInteraction?: boolean;
  autoplayStopOnLastSlide?: boolean;
  breakpoints?: IBreakpoints;
  children: ReactNode[];
  className?: string;
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
}

const SliderSwiper: FC<SliderSwiperProps> = ({
  // Auto height
  autoHeight = true,
  // Autoplay
  autoplay,
  // Pause between slides
  autoplayDelay = 1000,

  // Disable after manual override
  autoplayDisableOnInteraction,
  // Stop on last slide
  autoplayStopOnLastSlide,
  // Breakpoints (adaptive)
  breakpoints,
  // Active slide in the center
  centeredSlides,

  children,
  className,

  // Slider horizontal/vertical
  direction = "horizontal",
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
  // Turn on/off
  keyboardEnabled = true,

  // Keyboard management

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
  navigation,
  // No swiping
  noSwiping,
  noSwipingClass = "swiper-no-swiping",
  // Update slider when slider items change
  observer = true,
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
  // The number of flipped slides
  slidesPerGroup = 1,

  // Number of slides for showing
  slidesPerView = 1,
  // Switching when clicking on a slide
  slideToClickedSlide,
  // The indent between the slides
  spaceBetween = 0,
  // Speed
  speed = 300,
  // Sweep/dragging angle
  touchAngle = 45,
  // Sweep sensitivity
  touchRatio = 1,
  // Virtual slides
  virtual,
  // Disabling functionality if there are more slides than needed
  watchOverflow = true,
}) => {
  const { length: childrenLength } = children;

  const swiperRef = useRef<any>(null);

  const isBullets =
    pagination &&
    paginationType === "bullets" &&
    breakpoints &&
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    useBullets(slidesPerView, childrenLength, breakpoints);

  useEffect(() => {
    const swiperCurrent = swiperRef?.current;
    const swiper = swiperCurrent?.swiper;

    if (!swiper) {
      return;
    }

    swiperCurrent.querySelectorAll("*").forEach((element: any) => {
      element.setAttribute("tabIndex", "-1");
    });
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

  const slideItems = children.map((slide, index) => (
    <SwiperSlide
      key={index}
      {...(hash && {
        "data-hash": `${hash}-${index}`,
      })}
      {...(virtual && {
        virtualIndex: index,
      })}
    >
      {slide}
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
      <Swiper
        className={s.sliderSwiper__swiper}
        ref={swiperRef}
        // Modules
        modules={[
          Navigation,
          Pagination,
          // Scrollbar,
          // HashNavigation,
          Keyboard,
          // Mousewheel,
          // FreeMode,
          // Autoplay,
          // Parallax,
          Virtual,
        ]}
        // Arrows
        navigation={navigation}
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
        slideToClickedSlide={slideToClickedSlide}
        // Hash navigation
        {...(hash && {
          hashNavigation:
            // Track the condition
            { watchState: hashNavigationWatchState },
        })}
        // Switching when clicking on a slide
        touchAngle={touchAngle}
        // Grab cursor
        grabCursor={grabCursor}
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
        freeMode={freeMode}
        // Autoplay
        {...(autoplay && {
          autoplay: {
            // Pause between slides
            delay: autoplayDelay,
            // Stop on last slide
            stopOnLastSlide: autoplayStopOnLastSlide,
            // Disable after manual override
            disableOnInteraction: autoplayDisableOnInteraction,
          },
        })}
        // The number of flipped slides
        breakpoints={breakpoints}
        // Update slider when slider items change
        observer={observer}
        // Starting slide
        initialSlide={initialSlide}
        // Loop slider
        loop={loop}
        // Free mode
        noSwiping={noSwiping}
        // Breakpoints (adaptive)
        noSwipingClass={noSwipingClass}
        // Speed
        parallax={parallax}
        // Virtual slides
        virtual={virtual}
        // Turn on/off parallax
        slidesPerGroup={slidesPerGroup}
        // Active slide in the center
        centeredSlides={centeredSlides}
        // No swiping
        speed={speed}
        // Horizontal/vertical slider
        direction={direction}
        watchOverflow={watchOverflow}
        // The indent between the slides
        spaceBetween={spaceBetween}
      >
        {slideItems}
      </Swiper>
    </div>
  );
};

export default SliderSwiper;
