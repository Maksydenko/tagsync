import { FC, KeyboardEventHandler } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';

import { ICategory } from '@/features/products';

import { Locale, Translation } from '@/shared/config';
import { handleArrowFocus } from '@/shared/model';
import { Img } from '@/shared/ui';

import s from '../Sidebar.module.scss';

interface ItemProps {
  category: ICategory;
}

export const SidebarItem: FC<ItemProps> = ({
  category: { img, slug, translations_slug }
}) => {
  const locale = useLocale() as Locale;
  const tShared = useTranslations(Translation.Shared);

  const translatedSlug = translations_slug[locale];

  const handleKeyDown: KeyboardEventHandler<HTMLAnchorElement> = e => {
    handleArrowFocus({
      e,
      isVertical: true,
      selector: `.${s.sidebar__link}`
    });
  };

  return (
    <li className={s.sidebar__item}>
      <Link
        className={clsx(s.sidebar__link)}
        href={`/${slug}`}
        onKeyDown={handleKeyDown}
      >
        <Img
          alt={`${tShared('logo')} ${translatedSlug}`}
          className={s.sidebar__icon}
          height={32}
          src={img}
          width={32}
          isSvg
        />
        <p className={clsx(s.sidebar__label, s.sidebar__label_hidden)}>
          {translatedSlug}
        </p>
        <p className={clsx(s.sidebar__label, s.sidebar__label_visible)}>
          {translatedSlug}
        </p>
      </Link>
    </li>
  );
};
