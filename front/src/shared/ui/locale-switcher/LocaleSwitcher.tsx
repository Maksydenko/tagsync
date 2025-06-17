import { FC } from 'react';
import { clsx } from 'clsx';

import { LocaleSwitcherItems } from './LocaleSwitcherItems/LocaleSwitcherItems';

import s from './LocaleSwitcher.module.scss';

interface LocaleSwitcherProps {
  className?: string;
}

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ className }) => (
  <div className={clsx(s.localeSwitcher, className)}>
    <LocaleSwitcherItems />
  </div>
);
