'use client';

import { FC } from 'react';

import { ILink } from '@/shared/model';

import { MenuItem } from './MenuItem';

interface MenuItemsProps {
  links: ILink[];
  onClick?: () => void;
}

export const MenuItems: FC<MenuItemsProps> = ({ links }) =>
  links.map(link => <MenuItem key={link.value} link={link} />);
