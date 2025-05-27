"use client";

import { FC } from "react";
import { useAtom } from "jotai";

import { categoriesAtom } from "@/entities/product";

import { SidebarItem } from "./SidebarItem";

import s from "../Sidebar.module.scss";

export const SidebarItems: FC = () => {
  const [{ data: categoriesData }] = useAtom(categoriesAtom);

  return (
    <ul className={s.sidebar__list}>
      {categoriesData?.data.map((category) => (
        <SidebarItem key={category.slug} category={category} />
      ))}
    </ul>
  );
};
