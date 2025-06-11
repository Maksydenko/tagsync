import { FC } from 'react';

import { localeData } from '../locale.data';

import { LocaleSwitcherItem } from './LocaleSwitcherItem';

interface LocaleSwitcherItemsProps {
  onClick?: () => void;
}

export const LocaleSwitcherItems: FC<LocaleSwitcherItemsProps> = ({
  onClick
}) =>
  localeData.map(locale => (
    <LocaleSwitcherItem key={locale.value} locale={locale} onClick={onClick} />
  ));
