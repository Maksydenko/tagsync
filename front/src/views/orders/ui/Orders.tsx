import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { UserWrapper } from '@/widgets/user-wrapper';

import { Translation } from '@/shared/config';

import { OrdersList } from './OrdersList/OrdersList';

import s from './Orders.module.scss';

interface OrdersProps {
  className?: string;
}

export const Orders: FC<OrdersProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <div className={clsx(s.ordersPage, className)}>
      <UserWrapper className={s.orders} title={tShared('user.orders')}>
        <OrdersList className={s.orders__list} />
      </UserWrapper>
    </div>
  );
};
