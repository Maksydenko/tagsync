import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { UserWrapper } from '@/widgets/user-wrapper';

import { Translation } from '@/shared/config';

import { WishlistProducts } from './WishlistProducts/WishlistProducts';

import s from './Wishlist.module.scss';

interface WishlistProps {
  className?: string;
}

export const Wishlist: FC<WishlistProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <div className={clsx(s.wishlistPage, className)}>
      <UserWrapper className={s.wishlist} title={tShared('user.wishlist')}>
        <WishlistProducts className={s.wishlist__products} />
      </UserWrapper>
    </div>
  );
};
