import { FC } from "react";
import { clsx } from "clsx";
import { ItemType } from "rc-collapse/es/interface";

import { Collapse } from "@/shared/ui";

import s from "./Filter.module.scss";

interface FilterProps {
  className?: string;
  items: ItemType[];
}

export const Filter: FC<FilterProps> = ({ className, items }) => {
  return (
    <Collapse
      className={clsx(s.filter, className)}
      items={items}
      isReverseIcon
    />
  );
};
