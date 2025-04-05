import { FC } from "react";
import Link from "next/link";
import { clsx } from "clsx";

import { MenuItem } from "@headlessui/react";

import { IDropdown } from "../dropdown.interface";

import s from "../Dropdown.module.scss";

interface DropdownItemProps {
  item: IDropdown;
}

export const DropdownItem: FC<DropdownItemProps> = ({
  item: { label, value },
}) => {
  const isLink = typeof value === "string";

  return (
    <MenuItem>
      {({ focus }) => {
        return (
          <div
            key={label}
            className={clsx(
              s.dropdownItems__item,
              focus && s.dropdownItems__item_active
            )}
          >
            {isLink ? <Link href={value}>{label}</Link> : value}
          </div>
        );
      }}
    </MenuItem>
  );
};
