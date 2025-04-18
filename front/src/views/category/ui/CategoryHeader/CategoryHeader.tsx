"use client";

import { FC, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { FilterBadges, IFilter, Sort } from "@/features/filters";

import { ILink, Pathname, Translation } from "@/shared/model";
import { Breadcrumbs } from "@/shared/ui";

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
  const tShared = useTranslations(Translation.Shared);

  // TODO: handle real category
  const breadcrumbs: ILink[] = [
    {
      label: tShared("pathnames.home"),
      value: Pathname.Home,
    },
    {
      label: "Category",
      value: pathname.split("/")[2],
    },
  ];

  return (
    <div className={clsx(s.categoryHeader, className)}>
      <div className={s.categoryHeader__body}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className={s.categoryHeader__title}>Category</h1>
        <div className={s.categoryHeader__content}>
          <Suspense>
            <FilterBadges
              className={s.categoryHeader__filters}
              filtersData={filtersData}
            />
            <Sort className={s.categoryHeader__sort} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
