'use client';

import { FC, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import { IOrder } from '@/features/orders';

import { Translation } from '@/shared/config';
import { formatPrice, ILink } from '@/shared/model';
import { Img, Table } from '@/shared/ui';

import s from './OrderCardContent.module.scss';

interface OrderCardContentProps {
  className?: string;
  order: IOrder;
}

export const OrderCardContent: FC<OrderCardContentProps> = ({
  className,
  order
}) => {
  const tShared = useTranslations(Translation.Shared);

  const columns: ColumnDef<ILink>[] = [
    {
      accessorKey: 'label',
      header: ''
    },
    {
      accessorKey: 'value',
      header: ''
    }
  ];

  const data: ILink[] = useMemo(
    () => [
      {
        label: tShared('form.name.label'),
        value: order.full_name
      },
      {
        label: tShared('form.address.label'),
        value: order.address
      },
      {
        label: tShared('form.phone.label'),
        value: order.phone
      }
    ],
    [order, tShared]
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={clsx(s.orderCardContent, className)}>
      <div className={s.orderCardContent__body}>
        <ul className={s.orderCardContent__list}>
          {order.items.map(
            ({
              images,
              price_per_item,
              product_id,
              product_title,
              quantity,
              slug,
              total_price
            }) => {
              const productUrl = `/${slug}/${product_id}`;

              return (
                <li key={product_id} className={s.orderCardContent__item}>
                  <div className={s.orderCardContent__content}>
                    <Link href={productUrl}>
                      <Img
                        alt={product_title}
                        className={s.orderCardContent__img}
                        src={images[0]}
                      />
                    </Link>
                    <h2 className={s.orderCardContent__title}>
                      <Link href={productUrl}>{product_title}</Link>
                    </h2>
                  </div>
                  <div className={s.orderCardContent__box}>
                    <div className={s.orderCardContent__prices}>
                      <p className={s.orderCardContent__price}>
                        {formatPrice({
                          price: price_per_item
                        })}
                      </p>
                      <p className={s.orderCardContent__quantity}>{quantity}</p>
                      <p className={s.orderCardContent__total}>
                        {formatPrice({
                          price: total_price
                        })}
                      </p>
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </ul>
        <Table className={s.orderCardContent__table} table={table} />
      </div>
    </div>
  );
};
