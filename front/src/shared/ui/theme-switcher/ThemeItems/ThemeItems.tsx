import { FC } from 'react';

import { ILink } from '@/shared/model';

import { ThemeItem } from './ThemeItem';

interface ThemeItemsProps {
  themes: ILink[];
}

export const ThemeItems: FC<ThemeItemsProps> = ({ themes }) => themes.map((theme) => <ThemeItem key={theme.value} theme={theme} />);
