'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import { FilterBadges, Filters, IFilter, Sort } from '@/features/filters';

import { categoriesAtom } from '@/entities/product';

import { Locale, Pathname, Translation } from '@/shared/config';
import { ILink } from '@/shared/model';
import { Breadcrumbs, Btn, Popup } from '@/shared/ui';

import s from './CategoryHeader.module.scss';

interface CategoryHeaderProps {
  className?: string;
  filtersData: IFilter[];
}

export const CategoryHeader: FC<CategoryHeaderProps> = ({
  className,
  filtersData
}) => {
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const tShared = useTranslations(Translation.Shared);
  const tCategory = useTranslations(Translation.Category);

  const [{ data: categoriesData }] = useAtom(categoriesAtom);

  const categories = categoriesData?.data;
  const categorySlug = pathname.split('/')[2];
  /* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */
  const category = categories?.find(
    category => category.slug === categorySlug
  )!;
  const categoryTitle = category?.translations_slug[locale];

  const breadcrumbs: ILink[] = [
    {
      label: tShared('pathnames.home'),
      value: Pathname.Home
    },
    {
      label: categoryTitle,
      value: categorySlug
    }
  ];

  return (
    <div className={clsx(s.categoryHeader, className)}>
      <div className={s.categoryHeader__body}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className={s.categoryHeader__title}>{categoryTitle}</h1>
        <div className={s.categoryHeader__content}>
          <FilterBadges
            className={s.categoryHeader__filterBadges}
            filtersData={filtersData}
          />
          <div className={s.categoryHeader__box}>
            <Popup
              btn={
                <Btn
                  className={s.categoryHeader__btn}
                  icon={{
                    label: tCategory('filters.label'),
                    value: '/img/icons/form/filter.svg'
                  }}
                  type="button"
                  asChild
                >
                  <p>{tCategory('filters.label')}</p>
                </Btn>
              }
              classNameBtn={s.categoryHeader__popup}
            >
              <Filters
                className={s.categoryHeader__filters}
                filtersData={filtersData}
              />
            </Popup>
            <Sort className={s.categoryHeader__sort} />
          </div>
        </div>
      </div>
    </div>
  );
};
