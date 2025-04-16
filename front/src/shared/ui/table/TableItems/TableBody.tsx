import { ReactNode } from "react";

import { flexRender, Table as TTable } from "@tanstack/react-table";

import s from "../Table.module.scss";

interface TableBodyProps<T> {
  table: TTable<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>): ReactNode => {
  return (
    <tbody className={s.table__body}>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className={s.table__row}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className={s.table__cell}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
