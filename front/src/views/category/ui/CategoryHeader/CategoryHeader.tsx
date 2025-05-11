"use client";

import { FC, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { clsx } from "clsx";

import { useQuery } from "@tanstack/react-query";

import { FilterBadges, Filters, IFilter, Sort } from "@/features/filters";
import { ProductsService } from "@/features/products";

import { ILink, Locale, Pathname, QueryKey, Translation } from "@/shared/model";
import { Breadcrumbs, Btn, Popup } from "@/shared/ui";

import s from "./CategoryHeader.module.scss";

interface CategoryHeaderProps {
  className?: string;
  filtersData: IFilter[];
}

export const CategoryHeader: FC<CategoryHeaderProps> = ({
  className,
  filtersData,
}) => {
  const pathname = usePathname();

  const locale = useLocale() as Locale;
  const tShared = useTranslations(Translation.Shared);

  const { data: categoriesData } = useQuery({
    queryFn: async () => ProductsService.getCategories(),
    queryKey: [QueryKey.Categories],
  });

  const categories = categoriesData?.data;
  const categorySlug = pathname.split("/")[2];
  /* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */
  const category = categories?.find((category) => category.slug === categorySlug)!;
  const categoryTitle = category?.translations_slug[locale];

  const breadcrumbs: ILink[] = [
    {
      label: tShared("pathnames.home"),
      value: Pathname.Home,
    },
    {
      label: categoryTitle,
      value: categorySlug,
    },
  ];

  return (
    <div className={clsx(s.categoryHeader, className)}>
      <div className={s.categoryHeader__body}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className={s.categoryHeader__title}>{categoryTitle}</h1>
        <div className={s.categoryHeader__content}>
          <Suspense>
            <FilterBadges
              className={s.categoryHeader__filterBadges}
              filtersData={filtersData}
            />
            <Popup
              btn={
                <Btn
                  className={s.categoryHeader__btn}
                  icon="/img/icons/form/filter.svg"
                  type="button"
                  asChild
                >
                  Filters
                </Btn>
              }
            >
              <Filters
                className={s.categoryHeader__filters}
                filtersData={filtersData}
              />
            </Popup>
            <Sort className={s.categoryHeader__sort} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
