import { ReactNode } from "react";

import { flexRender, Table as TTable } from "@tanstack/react-table";

import s from "../Table.module.scss";

interface TableHeadProps<T> {
  table: TTable<T>;
}

export const TableHead = <T,>({ table }: TableHeadProps<T>): ReactNode => (
    <thead className={s.table__head}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className={s.table__row}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className={s.table__cell}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
