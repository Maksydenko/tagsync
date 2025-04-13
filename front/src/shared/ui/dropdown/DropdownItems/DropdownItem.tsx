import { FC, ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";

import { MenuItem } from "@headlessui/react";

import { ILink } from "@/shared/model";

import s from "../Dropdown.module.scss";

interface DropdownItemProps {
  item: ILink<ReactNode>;
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
