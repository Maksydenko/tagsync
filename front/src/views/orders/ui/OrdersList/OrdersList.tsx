'use client';

import { FC } from 'react';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import { useQuery } from '@tanstack/react-query';

import { OrdersService } from '@/features/orders';

import { userAtom } from '@/entities/user';

import { QueryKey } from '@/shared/model';
import { Accordion, Loader } from '@/shared/ui';

import { OrderCard } from '../OrderCard/OrderCard';
import { OrderCardContent } from '../OrderCardContent/OrderCardContent';

import s from './OrdersList.module.scss';

interface OrdersListProps {
  className?: string;
}

export const OrdersList: FC<OrdersListProps> = ({ className }) => {
  const [{ data: userData }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    enabled: !!userEmail,
    queryFn: async () => {
      if (!userEmail) {
        return;
      }

      return OrdersService.get(userEmail);
    },
    queryKey: [QueryKey.Orders, userEmail]
  });

  const items = ordersData?.data.map(order => ({
    children: (
      <OrderCardContent
        className={s.ordersList__orderCardContent}
        order={order}
      />
    ),
    key: order.order_time,
    label: <OrderCard className={s.ordersList__orderCard} orderData={order} />
  }));

  return (
    <div className={clsx(s.ordersList, className)}>
      {isLoadingOrders ? (
        <Loader className={s.ordersList__loader} />
      ) : (
        <div className={s.ordersList__body}>
          <Accordion
            className={s.ordersList__collapse}
            items={items}
            accordion
            isReverseIcon
          />
        </div>
      )}
    </div>
  );
};
