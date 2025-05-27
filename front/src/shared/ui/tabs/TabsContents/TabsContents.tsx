import { FC, ReactNode } from "react";

import { TabPanels } from "@headlessui/react";

import { ILink } from "@/shared/model";

import { TabsContent } from "./TabsContent";

import s from "../Tabs.module.scss";

interface TabsContentsProps {
  tabs: ILink<ReactNode>[];
}

export const TabsContents: FC<TabsContentsProps> = ({ tabs }) => (
    <TabPanels className={s.tabs__contents}>
      {tabs.map(({ label, value }) => <TabsContent key={label} content={value} />)}
    </TabPanels>
  );
