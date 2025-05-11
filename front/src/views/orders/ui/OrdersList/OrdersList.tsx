"use client";

import { FC } from "react";
import { clsx } from "clsx";

import { useQuery } from "@tanstack/react-query";

import { AuthService } from "@/features/auth";
import { OrdersService } from "@/features/orders";

import { QueryKey } from "@/shared/model";
import { Loader } from "@/shared/ui";

import { OrderCard } from "../OrderCard/OrderCard";

import s from "./OrdersList.module.scss";

interface OrdersListProps {
  className?: string;
}

export const OrdersList: FC<OrdersListProps> = ({ className }) => {
  const { data: userData } = useQuery({
    queryFn: async () => AuthService.getUserData(),
    queryKey: [QueryKey.User],
  });
  const userEmail = userData?.data.email;

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    enabled: !!userEmail,
    queryFn: async () => {
      if (!userEmail) {
        return;
      }

      return OrdersService.get(userEmail);
    },
    queryKey: [QueryKey.Orders, userEmail],
  });

  return (
    <div className={clsx(s.ordersList, className)}>
      {isLoadingOrders ? (
        <Loader className={s.ordersList__loader} />
      ) : (
        <ul className={s.ordersList__list}>
          {ordersData?.data.map((order) => (
              <li key={order.order_time} className={s.ordersList__item}>
                <OrderCard
                  className={s.ordersList__orderCard}
                  orderData={order}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
