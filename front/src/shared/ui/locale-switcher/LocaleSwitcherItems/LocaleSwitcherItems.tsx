import { FC } from 'react';

import { localeData } from '../locale.data';

import { LocaleSwitcherItem } from './LocaleSwitcherItem';

import s from '../LocaleSwitcher.module.scss';

export const LocaleSwitcherItems: FC = () => (
  <ul className={s.localeSwitcher__list}>
    {localeData.map(locale => (
      <LocaleSwitcherItem key={locale.value} locale={locale} />
    ))}
  </ul>
);
