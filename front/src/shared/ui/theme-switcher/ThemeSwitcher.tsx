'use client';

import { FC } from 'react';
import { clsx } from 'clsx';

import { useMounted } from '@/shared/model';

import { themeData } from './theme.data';

import { ThemeItems } from './ThemeItems/ThemeItems';

import s from './ThemeSwitcher.module.scss';

interface IThemeSwitcher {
  className?: string;
}

export const ThemeSwitcher: FC<IThemeSwitcher> = ({ className }) => {
  const isMounted = useMounted();

  return (
    <div className={clsx(s.themeSwitcher, className)}>
      <div className={s.themeSwitcher__body}>
        <ThemeItems themes={themeData} />
        {isMounted && <span className={s.themeSwitcher__slider}></span>}
      </div>
    </div>
  );
};
