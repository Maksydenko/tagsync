"use client";

import { FC } from "react";
import Link from "next/link";
import { clsx } from "clsx";

import { ILink } from "@/shared/model";

import s from "./Breadcrumbs.module.scss";

interface BreadcrumbsProps {
  breadcrumbs: ILink[];
  className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  breadcrumbs,
  className,
}) => {
  return (
    <ul className={clsx(s.breadcrumbs, className)}>
      {breadcrumbs.map(({ label, value }) => {
        return (
          <li key={value} className={s.breadcrumbs__breadcrumb}>
            <Link href={value}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};
