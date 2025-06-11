import { FC, ReactNode } from 'react';

import { TabList } from '@headlessui/react';

import { ILink } from '@/shared/model';

import { TabsTitle } from './TabsTitle';

import s from '../Tabs.module.scss';

interface TitlesProps {
  isVertical?: boolean;
  tabs: ILink<ReactNode>[];
}

export const TabsTitles: FC<TitlesProps> = ({ isVertical, tabs }) => (
  <TabList className={s.tabs__titles}>
    {tabs.map(tab => (
      <TabsTitle
        key={tab.label}
        isVertical={isVertical}
        tab={tab}
        tabsLength={tabs.length}
      />
    ))}
  </TabList>
);
