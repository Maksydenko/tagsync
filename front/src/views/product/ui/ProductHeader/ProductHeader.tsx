'use client';

import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { IProduct } from '@/entities/product';

import { Locale, Pathname, Translation } from '@/shared/config';
import { ILink } from '@/shared/model';
import { Breadcrumbs } from '@/shared/ui';

import s from './ProductHeader.module.scss';

interface ProductHeaderProps {
  className?: string;
  productData: IProduct;
}

export const ProductHeader: FC<ProductHeaderProps> = ({
  className,
  productData: { product_id, slug, title: productTitle, translations_slug }
}) => {
  const locale = useLocale() as Locale;
  const tShared = useTranslations(Translation.Shared);

  const breadcrumbs: ILink[] = [
    {
      label: tShared('pathnames.home'),
      value: Pathname.Home
    },
    {
      label: translations_slug[locale],
      value: `/${slug}`
    },
    {
      label: productTitle,
      value: product_id.toString()
    }
  ];

  return (
    <div className={clsx(s.productHeader, className)}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className={s.productHeader__breadcrumbs}
      />
    </div>
  );
};
