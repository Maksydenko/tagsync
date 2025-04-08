import { FC } from "react";
import { clsx } from "clsx";

import { LocaleSwitcher, ThemeSwitcher } from "@/shared/ui";

import { menuData } from "../../model";

import { MenuItems } from "./MenuItems/MenuItems";

import s from "./Menu.module.scss";

interface MenuProps {
  breakpoint: number;
  className?: string;
  isScrollLocked: boolean;
  onClick: () => void;
}

export const Menu: FC<MenuProps> = ({ className, isScrollLocked, onClick }) => {
  return (
    <div className={clsx(s.menu, className)}>
      <button
        className={clsx(
          s.menu__button,
          isScrollLocked && s.menu__button_active
        )}
        type="button"
        onClick={onClick}
      >
        <span />
      </button>
      <div
        className={clsx(s.menu__body, isScrollLocked && s.menu__body_active)}
      >
        <nav className={s.menu__content}>
          <ul className={s.menu__list}>
            <MenuItems links={menuData} onClick={onClick} />
          </ul>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </nav>
      </div>
    </div>
  );
};
