"use client";

import { FC } from "react";

import { ILink } from "@/shared/model";

import { MenuItem } from "./MenuItem";

interface MenuItemsProps {
  links: ILink[];
  onClick?: () => void;
}

export const MenuItems: FC<MenuItemsProps> = ({ links }) => {
  return links.map((link) => {
    return <MenuItem key={link.value} link={link} />;
  });
};
