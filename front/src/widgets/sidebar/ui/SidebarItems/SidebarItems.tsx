"use client";

import { FC } from "react";

import { useQuery } from "@tanstack/react-query";

import { ProductsService } from "@/features/products";

import { QueryKey } from "@/shared/model";

import { SidebarItem } from "./SidebarItem";

import s from "../Sidebar.module.scss";

export const SidebarItems: FC = () => {
  const { data: categoriesData } = useQuery({
    queryFn: async () => ProductsService.getCategories(),
    queryKey: [QueryKey.Categories],
  });

  return (
    <ul className={s.sidebar__list}>
      {categoriesData?.data.map((category) => (
        <SidebarItem key={category.slug} category={category} />
      ))}
    </ul>
  );
};
