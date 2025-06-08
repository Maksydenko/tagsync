"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { Translation } from "@/shared/config";
import { ILink, SearchParam } from "@/shared/model";
import { Select } from "@/shared/ui";

import { getSortsData, useSortParams } from "../../model";

import s from "./Sort.module.scss";

interface SortProps {
  className?: string;
}

export const Sort: FC<SortProps> = ({ className }) => {
  const searchParams = useSearchParams();
  const tCategory = useTranslations(Translation.Category);

  const sorts = getSortsData(tCategory);

  const urlSortBy = searchParams.get(SearchParam.SortBy);
  const urlSortOrder = searchParams.get(SearchParam.SortOrder);

  const urlSortValue = urlSortBy
    ? urlSortOrder
      ? [urlSortBy, urlSortOrder].join(",")
      : urlSortBy
    : null;

  const defaultSort =
    sorts.find((sort) => sort.value === urlSortValue) || sorts[0];

  const form = useForm<{
    [SearchParam.SortBy]: ILink;
  }>({
    defaultValues: {
      [SearchParam.SortBy]: defaultSort,
    },
    mode: "onChange",
  });

  const watchedSort = form.watch(SearchParam.SortBy);
  const watchedSortValue = watchedSort?.value;

  useSortParams(watchedSortValue);

  return (
    <div className={clsx(s.sort, className)}>
      <Select formReturn={form} items={sorts} name={SearchParam.SortBy} />
    </div>
  );
};
