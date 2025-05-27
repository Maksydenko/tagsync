import { FC, ReactNode } from "react";
import { clsx } from "clsx";

import { Tab } from "@headlessui/react";

import { ILink, Percent } from "@/shared/model";

import s from "../Tabs.module.scss";

interface TabsTitleProps {
  isVertical?: boolean;
  tab: ILink<ReactNode>;
  tabsLength: number;
}

export const TabsTitle: FC<TabsTitleProps> = ({
  isVertical,
  tab: { value },
  tabsLength,
}) => {
  const titleItem = typeof value === "string" ? <p>{value}</p> : value;

  const tabWidth = Percent.Full / tabsLength;
  const titleStyle = {
    inlineSize: `${tabWidth}%`,
  };

  return (
    <Tab
      className={({ selected }) =>
        clsx(s.tabs__title, selected && s.tabs__titleActive)
      }
      style={isVertical ? {} : titleStyle}
    >
      {titleItem}
    </Tab>
  );
};
