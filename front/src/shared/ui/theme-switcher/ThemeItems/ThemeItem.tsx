"use client";

import { FC, KeyboardEventHandler } from "react";
import { useTheme } from "next-themes";
import { clsx } from "clsx";

import { ILink, useMounted } from "@/shared/model";
import { Img } from "@/shared/ui";

import s from "../ThemeSwitcher.module.scss";

interface ThemeItemProps {
  theme: ILink;
}

export const ThemeItem: FC<ThemeItemProps> = ({ theme: { label, value } }) => {
  const { setTheme, theme } = useTheme();
  const isMounted = useMounted();

  const isChecked = theme === value;

  const switchTheme = () => {
    setTheme(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLLabelElement> = ({ key }) => {
    if (key !== "Enter" && key !== " ") {
      return;
    }

    switchTheme();
  };

  return (
    <>
      <input
        checked={theme === value}
        className={s.themeSwitcher__input}
        id={value}
        type="radio"
        onChange={switchTheme}
      />
      <label
        className={clsx(
          s.themeSwitcher__label,
          isMounted && isChecked && s.themeSwitcher__label_checked
        )}
        htmlFor={value}
        {...(isMounted &&
          !isChecked && {
            onKeyDown: handleKeyDown,
            tabIndex: 0,
          })}
      >
        <Img
          alt={value}
          className={s.themeSwitcher__img}
          height={20}
          src={label}
          width={20}
          isSvg
        />
      </label>
    </>
  );
};
