import { FC, Suspense } from 'react';

import { Filters, IFilter } from '@/features/filters';
import { IProducts } from '@/features/products';

import { CategoryHeader } from './CategoryHeader/CategoryHeader';
import { CategoryProducts } from './CategoryProducts/CategoryProducts';

import s from './Category.module.scss';

interface CategoryProps {
  filtersData: IFilter[];
  productsData: IProducts;
}

export const Category: FC<CategoryProps> = ({ filtersData, productsData }) => (
    <section className={s.category}>
      <div className={s.category__container}>
        <div className={s.category__body}>
          <CategoryHeader
            className={s.category__header}
            filtersData={filtersData}
          />
          <div className={s.category__content}>
            <Suspense>
              <Filters
                className={s.category__filters}
                filtersData={filtersData}
              />
              <CategoryProducts
                className={s.category__products}
                productsData={productsData}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
