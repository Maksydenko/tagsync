import { FC } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useAtom } from 'jotai';

import { categoriesAtom } from '@/entities/product';

import { Locale } from '@/shared/config';

import s from './Footer.module.scss';

export const FooterList: FC = () => {
  const locale = useLocale() as Locale;
  const [{ data: categoriesData }] = useAtom(categoriesAtom);

  return (
    <ul className={s.footer__list}>
      {categoriesData?.data.map((category) => (
        <li key={category.slug} className={s.footer__item}>
          <Link className={s.footer__link} href={`/${category.slug}`}>
            {category.translations_slug[locale]}
          </Link>
        </li>
      ))}
    </ul>
  );
};
