import { FC } from 'react';
import { clsx } from 'clsx';

import { LocaleSwitcherItems } from './LocaleSwitcherItems/LocaleSwitcherItems';

import s from './LocaleSwitcher.module.scss';

interface LocaleSwitcherProps {
  className?: string;
  onClick?: () => void;
}

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({
  className,
  onClick,
}) => (
    <ul className={clsx(s.localeSwitcher, className)}>
      <LocaleSwitcherItems onClick={onClick} />
    </ul>
  );
