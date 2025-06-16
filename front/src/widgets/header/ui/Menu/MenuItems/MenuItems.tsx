'use client';

import { FC } from 'react';

import { ILink, ILinkWithIcon } from '@/shared/model';

import { MenuItem } from './MenuItem';

interface MenuItemsProps {
  links: ILink<ILinkWithIcon[] | string>[];
  onClick?: () => void;
}

export const MenuItems: FC<MenuItemsProps> = ({ links }) =>
  links.map(link => <MenuItem key={link.label} link={link} />);
