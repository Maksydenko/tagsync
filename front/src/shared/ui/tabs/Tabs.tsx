"use client";

import { FC, ReactNode } from "react";
import { clsx } from "clsx";

import { TabGroup } from "@headlessui/react";

import { ILink } from "@/shared/model";

import { TabsContents } from "./TabsContents/TabsContents";
import { TabsTitles } from "./TabsTitles/TabsTitles";

import s from "./Tabs.module.scss";

interface TabsProps {
  className?: string;
  defaultTab?: number;
  isVertical?: boolean;
  tabs: ILink<ReactNode>[];
}

const Tabs: FC<TabsProps> = ({
  className,
  defaultTab = 0,
  isVertical,
  tabs,
}) => (
    <div className={clsx(s.tabs, isVertical && s.tabs_vertical, className)}>
      <TabGroup defaultIndex={defaultTab} vertical={isVertical}>
        <TabsTitles isVertical={isVertical} tabs={tabs} />
        <TabsContents tabs={tabs} />
      </TabGroup>
    </div>
  );

export default Tabs;
