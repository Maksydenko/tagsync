'use client';

import { FC, Fragment } from 'react';
import { clsx } from 'clsx';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import { ILink } from '@/shared/model';

import s from './ComparisonCharacteristicsTable.module.scss';

interface ComparisonCharacteristicsTableProps {
  className?: string;
  columns: ColumnDef<ILink<string[]>>[];
  data: ILink<string[]>[];
  productsDataLength: number;
}

export const ComparisonCharacteristicsTable: FC<
  ComparisonCharacteristicsTableProps
> = ({ className, columns, data, productsDataLength }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <table className={clsx(s.table, className)}>
      <thead className={s.table__head}>
        {table.getHeaderGroups().map(({ headers, id }) => (
          <tr key={id} className={clsx(s.table__row, s.table__row_head)}>
            {headers.map((header) => (
              <th
                key={header.id}
                className={clsx(s.table__cell, s.table__cell_head)}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={s.table__body}>
        {data.map(({ label, value }, index) => (
          <Fragment key={index}>
            <tr className={clsx(s.table__row, s.table__row_body)}>
              <td
                className={clsx(s.table__cell, s.table__cell_body)}
                colSpan={productsDataLength}
              >
                {label}
              </td>
            </tr>
            <tr className={clsx(s.table__row, s.table__row_body)}>
              {value.map((v, i) => (
                <td key={i} className={clsx(s.table__cell, s.table__cell_body)}>
                  {v}
                </td>
              ))}
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};
