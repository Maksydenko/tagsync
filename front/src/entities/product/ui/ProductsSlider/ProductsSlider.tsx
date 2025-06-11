import { FC } from 'react';
import { clsx } from 'clsx';

import { Breakpoint } from '@/shared/config';
import { SliderSwiper } from '@/shared/ui';

import { IProduct } from '../../api';

import { ProductCard } from '../ProductCard/ProductCard';

import s from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  className?: string;
  productsData: IProduct[];
  title?: string;
}

export const ProductsSlider: FC<ProductsSliderProps> = ({
  className,
  productsData,
  title
}) => {
  if (!productsData.length) {
    return null;
  }

  return (
    <div className={clsx(s.productsSlider, className)}>
      <div className={s.productsSlider__body}>
        {title && <h2 className={s.productsSlider__title}>{title}</h2>}
        <SliderSwiper
          breakpoints={{
            [Breakpoint.Mobile]: {
              slidesPerView: 3
            },
            [Breakpoint.MobileSmall]: {
              slidesPerView: 2
            },
            [Breakpoint.Tablet]: {
              slidesPerView: 4
            }
          }}
          className={s.productsSlider__slider}
          slides={productsData.map(product => {
            const { product_id } = product;

            return {
              label: product_id?.toString(),
              value: (
                <ProductCard
                  key={product_id}
                  className={s.productsSlider__productCard}
                  productData={product}
                  isStable
                />
              )
            };
          })}
          slidesPerView={1}
        />
      </div>
    </div>
  );
};
