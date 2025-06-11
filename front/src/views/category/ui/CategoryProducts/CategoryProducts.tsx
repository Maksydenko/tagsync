'use client';

import { FC } from 'react';
import { clsx } from 'clsx';

import { IProducts } from '@/features/products';

import { ProductCard } from '@/entities/product';

import { Pagination } from '@/shared/ui';

import s from './CategoryProducts.module.scss';

interface CategoryProductsProps {
  className?: string;
  productsData: IProducts;
}

export const CategoryProducts: FC<CategoryProductsProps> = ({
  className,
  productsData
}) => (
  <div className={clsx(s.categoryProducts, className)}>
    <div className={s.categoryProducts__body}>
      <div className={s.categoryProducts__content}>
        {productsData.products.map(product => (
          <ProductCard key={product.product_id} productData={product} />
        ))}
      </div>
      <Pagination
        className={s.categoryProducts__pagination}
        itemsPerPage={+process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE!}
        itemsPerTotal={productsData.count_category}
      />
    </div>
  </div>
);
