import { FC } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Translation } from '@/shared/config';
import { ILink } from '@/shared/model';

import s from '../Menu.module.scss';

interface MenuItemProps {
  link: ILink;
  onClick?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
  link: { label, value },
  onClick,
}) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <li className={s.menu__item}>
      <Link className={s.menu__link} href={value} onClick={onClick}>
        {tShared(`pathnames.${label}`)}
      </Link>
    </li>
  );
};
