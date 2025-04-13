import { FC, ReactNode } from "react";

import { MenuItems } from "@headlessui/react";

import { ILink } from "@/shared/model";

import { DropdownItem } from "./DropdownItem";

import s from "../Dropdown.module.scss";

interface DropdownItemsProps {
  items: ILink<ReactNode>[];
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
