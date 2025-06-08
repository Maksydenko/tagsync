"use client";

import { FC, useState } from "react";
import { clsx } from "clsx";
import { Swiper } from "swiper/types";

import { Breakpoint } from "@/shared/config";
import { Direction, useBreakpointCheck } from "@/shared/model";
import { Img, Loader, SliderSwiper } from "@/shared/ui";

import s from "./ProductSliders.module.scss";

interface ProductSlidersProps {
  className?: string;
  images: string[];
  title: string;
}

export const ProductSliders: FC<ProductSlidersProps> = ({
  className,
  images,
  title,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | Swiper>(null);
  const isMobile = useBreakpointCheck(Breakpoint.Mobile);

  const loader = <Loader className={s.productSliders__loader} />;

  return (
    <div className={clsx(s.productSliders, className)}>
      <div className={s.productSliders__body}>
        <SliderSwiper
          autoHeight={false}
          className={s.productSliders__miniSlider}
          direction={isMobile ? Direction.Horizontal : Direction.Vertical}
          navigation={false}
          slides={images?.map((img) => ({
            label: img,
            value: (
              <Img
                alt={title}
                className={s.productSliders__img}
                customLoader={loader}
                height={735}
                src={img}
                width={735}
              />
            ),
          }))}
          slidesPerView={4}
          spaceBetween={16}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        />
        <div className={s.productSliders__content}>
          <SliderSwiper
            autoHeight={false}
            className={clsx(
              s.productSliders__slider,
              !images.length && s.productSliders__slider_empty
            )}
            slides={images?.map((img, index) => ({
              label: img,
              value: (
                <Img
                  alt={title}
                  className={s.productSliders__img}
                  customLoader={loader}
                  height={172}
                  priority={index === 0}
                  src={img}
                  width={172}
                />
              ),
            }))}
            thumbs={{
              swiper: thumbsSwiper,
            }}
            pagination
          />
        </div>
      </div>
    </div>
  );
};
