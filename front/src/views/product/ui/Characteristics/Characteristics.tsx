"use client";

import { FC } from "react";
import { clsx } from "clsx";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { IProductCharacteristic } from "@/entities/product";

import { Table } from "@/shared/ui";

import s from "./Characteristics.module.scss";

const columns: ColumnDef<IProductCharacteristic>[] = [
  {
    accessorKey: "name",
    header: "",
  },
  {
    accessorKey: "value",
    header: "",
  },
];

interface CharacteristicsProps {
  characteristics: IProductCharacteristic[];
  className?: string;
}

export const Characteristics: FC<CharacteristicsProps> = ({
  characteristics,
  className,
}) => {
  const table = useReactTable({
    columns,
    data: characteristics,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={clsx(s.characteristics, className)}>
      <div className={s.characteristics__body}>
        <h2 className={s.characteristics__title}>Characteristics</h2>
        <Table className={s.characteristics__table} table={table} />
      </div>
    </div>
  );
};
