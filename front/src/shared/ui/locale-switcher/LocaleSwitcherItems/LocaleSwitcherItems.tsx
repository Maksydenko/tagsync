import { FC } from "react";

import { localeData } from "../locale.data";

import { LocaleSwitcherItem } from "./LocaleSwitcherItem";

interface LocaleSwitcherItemsProps {
  onClick?: () => void;
}

export const LocaleSwitcherItems: FC<LocaleSwitcherItemsProps> = ({
  onClick,
}) => {
  return localeData.map((locale) => {
    return (
      <LocaleSwitcherItem
        key={locale.value}
        locale={locale}
        onClick={onClick}
      />
    );
  });
};
