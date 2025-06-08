"use client";

import { FC, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { clsx } from "clsx";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { IProductCharacteristic } from "@/entities/product";

import { Locale, Translation } from "@/shared/config";
import { ILink } from "@/shared/model";
import { Table } from "@/shared/ui";

import s from "./Characteristics.module.scss";

interface CharacteristicsProps {
  characteristics: IProductCharacteristic[];
  className?: string;
}

export const Characteristics: FC<CharacteristicsProps> = ({
  characteristics,
  className,
}) => {
  const tProduct = useTranslations(Translation.Product);
  const locale = useLocale() as Locale;

  const columns: ColumnDef<ILink>[] = [
    {
      accessorKey: "label",
      header: "",
    },
    {
      accessorKey: "value",
      header: "",
    },
  ];

  const data: ILink[] = useMemo(
    () =>
      characteristics.map((characteristic) => ({
        label: characteristic.translations[locale],
        value:
          characteristic.value_translations?.[locale] || characteristic.value,
      })),
    [characteristics, locale]
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={clsx(s.characteristics, className)}>
      <div className={s.characteristics__body}>
        <h2 className={s.characteristics__title}>
          {tProduct("characteristics")}
        </h2>
        <Table className={s.characteristics__table} table={table} />
      </div>
    </div>
  );
};
