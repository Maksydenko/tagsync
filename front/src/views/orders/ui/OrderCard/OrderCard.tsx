import { FC } from "react";
import Link from "next/link";
import { clsx } from "clsx";

import { IOrder } from "@/features/orders";

import { formatDate, formatPrice } from "@/shared/model";
import { Img, Loader } from "@/shared/ui";

import s from "./OrderCard.module.scss";

interface OrderCardProps {
  className?: string;
  orderData: IOrder;
}

export const OrderCard: FC<OrderCardProps> = ({
  className,
  orderData: { items, order_time, total_order_price },
}) => (
  <div className={clsx(s.orderCard, className)}>
    <div className={s.orderCard__body}>
      <ul className={s.orderCard__list}>
        {items.map(({ images, product_id, product_title, slug }) => (
          <li key={product_id} className={s.orderCard__item}>
            <Link className={s.orderCard__link} href={`/${slug}/${product_id}`}>
              <Img
                alt={product_title}
                className={s.orderCard__img}
                height={120}
                loader={<Loader />}
                src={images?.[0]}
                width={120}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className={s.orderCard__content}>
        <span className={s.orderCard__date}>
          {formatDate({
            date: new Date(order_time),
          })}
        </span>
        <span className={s.orderCard__total}>
          {formatPrice({
            number: total_order_price,
          })}
        </span>
      </div>
    </div>
  </div>
);
