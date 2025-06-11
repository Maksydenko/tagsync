import { FC } from 'react';

import { MenuItems } from '@headlessui/react';

import { ILink, ILinkWithIcon } from '@/shared/model';

import { DropdownItem } from './DropdownItem';

import s from '../Dropdown.module.scss';

interface DropdownItemsProps {
  items: (
    | ILink<(() => unknown) | string>
    | ILinkWithIcon<(() => unknown) | string>
  )[];
}

export const DropdownItems: FC<DropdownItemsProps> = ({ items }) => (
  <MenuItems anchor="bottom end" className={s.dropdownItems} transition>
    {items.map(item => (
      <DropdownItem key={item.label} item={item} />
    ))}
  </MenuItems>
);
