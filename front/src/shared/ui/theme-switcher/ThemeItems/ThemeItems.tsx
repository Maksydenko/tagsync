import { FC } from "react";

import { ILink } from "@/shared/model";

import { ThemeItem } from "./ThemeItem";

interface ThemeItemsProps {
  themes: ILink[];
}

export const ThemeItems: FC<ThemeItemsProps> = ({ themes }) => {
  return themes.map((theme) => {
    return <ThemeItem key={theme.value} theme={theme} />;
  });
};
