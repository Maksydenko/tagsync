"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { ILink, SearchParam, Translation } from "@/shared/model";
import { Select } from "@/shared/ui";

import { getSortsData } from "../../model";

import s from "./Sort.module.scss";

const parseSortValue = (value: string) => {
  const [sort_by, sort_order] = value.split(",");

  const query: Record<string, string> = {
    [SearchParam.SortBy]: sort_by,
  };

  if (sort_order) {
    query[SearchParam.SortOrder] = sort_order;
  }

  return query;
};

interface SortProps {
  className?: string;
}

export const Sort: FC<SortProps> = ({ className }) => {
  const { push } = useRouter();
  const tCategory = useTranslations(Translation.Category);

  const sorts = getSortsData(tCategory);

  const form = useForm<{
    [SearchParam.SortBy]: ILink;
  }>({
    // TODO: set default value from search params
    defaultValues: {
      [SearchParam.SortBy]: sorts[0],
    },
    mode: "onChange",
  });

  const watchedSort = form.watch(SearchParam.SortBy);
  const watchedSortValue = watchedSort?.value;

  useEffect(() => {
    if (!watchedSortValue) return;

    const query = parseSortValue(watchedSortValue);

    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, val]) => searchParams.set(key, val));

    push(`?${searchParams.toString()}`);
  }, [push, watchedSortValue]);

  return (
    <div className={clsx(s.sort, className)}>
      <Select formReturn={form} items={sorts} name={SearchParam.SortBy} />
    </div>
  );
};
