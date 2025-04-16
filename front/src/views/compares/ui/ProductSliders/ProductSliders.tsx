"use client";

import { FC, useState } from "react";
import { clsx } from "clsx";
import { Swiper } from "swiper/types";

import { Breakpoint, useBreakpointCheck } from "@/shared/model";
import { Direction } from "@/shared/model";
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
          breakpoints={{
            [Breakpoint.Mobile]: {
              slidesPerView: 4,
            },
            [Breakpoint.Tablet]: {
              slidesPerView: 4,
            },
          }}
          className={s.productSliders__miniSlider}
          direction={isMobile ? Direction.Horizontal : Direction.Vertical}
          navigation={false}
          slides={images?.map((img, index) => ({
            label: index.toString(),
            value: (
              <Img
                alt={title}
                className={s.productSliders__img}
                loader={loader}
                src={img}
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
            className={s.productSliders__slider}
            slides={images?.map((img, index) => ({
              label: index.toString(),
              value: (
                <Img
                  alt={title}
                  className={s.productSliders__img}
                  loader={loader}
                  src={img}
                />
              ),
            }))}
            thumbs={{
              swiper: thumbsSwiper,
            }}
            pagination
            virtual
          />
        </div>
      </div>
    </div>
  );
};
