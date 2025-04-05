"use client";

import { FC, ReactNode, useRef } from "react";
import { clsx } from "clsx";

import { Menu, MenuButton } from "@headlessui/react";

import { useWindowListener } from "@/shared/model";

import { IDropdown } from "./dropdown.interface";

import { DropdownItems } from "./DropdownItems/DropdownItems";

import s from "./Dropdown.module.scss";

interface DropdownProps {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  items: IDropdown[];
}

export const Dropdown: FC<DropdownProps> = ({
  children,
  className,
  isDisabled,
  items,
}) => {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    const { current: menuButtonElement } = menuButtonRef;

    if (!menuButtonElement?.hasAttribute("data-open")) {
      return;
    }

    menuButtonElement.click();
  };

  useWindowListener("resize", handleClose);

  return (
    <Menu as="div" className={clsx(s.dropdown, className)}>
      <MenuButton
        ref={menuButtonRef}
        className={s.dropdown__btn}
        disabled={isDisabled}
      >
        {children}
      </MenuButton>
      <DropdownItems items={items} />
    </Menu>
  );
};
