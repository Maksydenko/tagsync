"use client";

import { FC, ReactNode, useRef } from "react";
import { clsx } from "clsx";

import { Menu, MenuButton } from "@headlessui/react";

import { ILink, useWindowListener } from "@/shared/model";

import { Img } from "../img/Img";
import { DropdownItems } from "./DropdownItems/DropdownItems";

import s from "./Dropdown.module.scss";

interface DropdownProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  items: ILink<ReactNode>[];
}

export const Dropdown: FC<DropdownProps> = ({
  children,
  className,
  icon = "/img/icons/form/arrow-down.svg",
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

  const isStringChildren = typeof children === "string";

  return (
    <Menu as="div" className={clsx(s.dropdown, className)}>
      <MenuButton
        ref={menuButtonRef}
        className={s.dropdown__btn}
        disabled={isDisabled}
        {...(isStringChildren && {
          "aria-label": children,
        })}
      >
        {isStringChildren ? (
          <div className={s.dropdown__box}>{children}</div>
        ) : (
          children
        )}
        {typeof icon === "string" ? (
          <Img
            className={s.dropdown__icon}
            src={icon}
            {...(isStringChildren && {
              alt: children,
            })}
            height={20}
            width={20}
            isSvg
          />
        ) : (
          icon
        )}
      </MenuButton>
      <DropdownItems items={items} />
    </Menu>
  );
};
