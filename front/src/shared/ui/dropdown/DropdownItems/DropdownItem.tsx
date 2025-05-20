import { FC } from "react";
import Link from "next/link";
import { clsx } from "clsx";

import { MenuItem } from "@headlessui/react";

import { ILink, ILinkWithIcon } from "@/shared/model";
import { checkKeyByTypes } from "@/shared/model";

import { Img } from "../../img/Img";

import s from "../Dropdown.module.scss";

interface DropdownItemProps {
  item:
    | ILink<(() => unknown) | string>
    | ILinkWithIcon<(() => unknown) | string>;
}

export const DropdownItem: FC<DropdownItemProps> = ({ item }) => {
  const { label, value } = item;
  const icon = checkKeyByTypes<
    ILinkWithIcon<(() => unknown) | string>,
    ILink<(() => unknown) | string>
  >(item, "icon")
    ? item?.icon
    : null;

  const iconElement = icon && (
    <Img alt={label} className={s.dropdownItems__icon} src={icon} isSvg />
  );

  return (
    <MenuItem>
      {({ focus }) => (
        <div
          key={label}
          className={clsx(
            s.dropdownItems__item,
            focus && s.dropdownItems__item_active
          )}
        >
          {typeof value === "string" ? (
            <Link href={value}>
              {iconElement}
              <p>{label}</p>
            </Link>
          ) : (
            <button type="button" onClick={value}>
              {iconElement}
              <p>{label}</p>
            </button>
          )}
        </div>
      )}
    </MenuItem>
  );
};
