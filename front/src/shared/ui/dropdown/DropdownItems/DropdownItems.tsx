import { FC } from "react";

import { MenuItems } from "@headlessui/react";

import { IDropdown } from "../dropdown.interface";

import { DropdownItem } from "./DropdownItem";

import s from "../Dropdown.module.scss";

interface DropdownItemsProps {
  items: IDropdown[];
}

export const DropdownItems: FC<DropdownItemsProps> = ({ items }) => {
  return (
    <MenuItems anchor="bottom start" className={s.dropdownItems} transition>
      {items.map((item) => {
        return <DropdownItem key={item.label} item={item} />;
      })}
    </MenuItems>
  );
};
