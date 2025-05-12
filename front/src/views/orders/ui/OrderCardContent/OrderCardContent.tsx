"use client";

import { FC, useMemo } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { IOrder } from "@/features/orders";

import { formatPrice, ILink, Translation } from "@/shared/model";
import { Img, Table } from "@/shared/ui";

import s from "./OrderCardContent.module.scss";

interface OrderCardContentProps {
  className?: string;
  order: IOrder;
}

export const OrderCardContent: FC<OrderCardContentProps> = ({
  className,
  order,
}) => {
  const tShared = useTranslations(Translation.Shared);

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
    () => [
      {
        label: tShared("form.name.label"),
        value: order.full_name,
      },
      {
        label: tShared("form.address.label"),
        value: order.address,
      },
      {
        label: tShared("form.phone.label"),
        value: order.phone,
      },
    ],
    [order, tShared]
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(order);

  return (
    <div className={clsx(s.orderCardContent, className)}>
      <div className={s.orderCardContent__body}>
        <ul className={s.orderCardContent__list}>
          {order.items.map((item) => (
            <li key={item.product_id} className={s.orderCardContent__item}>
              <div className={s.orderCardContent__content}>
                <Img
                  alt={item.product_title}
                  className={s.orderCardContent__img}
                  src={item.images[0]}
                />
                <h2 className={s.orderCardContent__title}>
                  {item.product_title}
                </h2>
              </div>
              <div className={s.orderCardContent__box}>
                <div className={s.orderCardContent__prices}>
                  <span className={s.orderCardContent__price}>
                    {formatPrice({
                      number: item.price_per_item,
                    })}
                  </span>
                  <span className={s.orderCardContent__quantity}>
                    {item.quantity}
                  </span>
                  <span className={s.orderCardContent__total}>
                    {formatPrice({
                      number: item.total_price,
                    })}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Table className={s.orderCardContent__table} table={table} />
      </div>
    </div>
  );
};
