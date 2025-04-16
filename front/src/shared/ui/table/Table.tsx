import { ReactNode } from "react";
import { clsx } from "clsx";

import { Table as TTable } from "@tanstack/react-table";

import { TableBody } from "./TableItems/TableBody";
import { TableHead } from "./TableItems/TableHead";

import s from "./Table.module.scss";

interface TableProps<T> {
  className?: string;
  table: TTable<T>;
}

export const Table = <T,>({ className, table }: TableProps<T>): ReactNode => {
  return (
    <table className={clsx(s.table, className)}>
      <TableHead table={table} />
      <TableBody table={table} />
    </table>
  );
};
