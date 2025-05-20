import { FC } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import clsx from "clsx";

import { ICategory } from "@/features/products";

import { Locale } from "@/shared/model";
import { Img } from "@/shared/ui";

import s from "../Sidebar.module.scss";

interface ItemProps {
  category: ICategory;
}

export const SidebarItem: FC<ItemProps> = ({
  category: { img, slug, translations_slug },
}) => {
  const locale = useLocale() as Locale;
  const translatedSlug = translations_slug[locale];

  return (
    <li className={s.sidebar__item}>
      <Link className={clsx(s.sidebar__link)} href={`/${slug}`}>
        <Img
          alt={translatedSlug}
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
