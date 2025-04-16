"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { ILink, Pathname, Translation } from "@/shared/model";
import { Breadcrumbs } from "@/shared/ui";

import s from "./ProductHeader.module.scss";

interface ProductHeaderProps {
  className?: string;
}

export const ProductHeader: FC<ProductHeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const tShared = useTranslations(Translation.Shared);

  // TODO: handle real category and product
  const breadcrumbs: ILink[] = [
    {
      label: tShared("pathnames.home"),
      value: Pathname.Home,
    },
    {
      label: "category",
      value: "/" + pathname.split("/")[2],
    },
    {
      label: "product",
      value: pathname.split("/")[3],
    },
  ];

  return (
    <div className={clsx(s.productHeader, className)}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className={s.productHeader__breadcrumbs}
      />
    </div>
  );
};
