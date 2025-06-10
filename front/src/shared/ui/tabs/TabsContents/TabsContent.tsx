import { FC, ReactNode } from 'react';

import { TabPanel } from '@headlessui/react';

import { ILink } from '@/shared/model';

import s from '../Tabs.module.scss';

interface TabsContentProps {
  content: ILink<ReactNode>['value'];
}

export const TabsContent: FC<TabsContentProps> = ({ content }) => (
  <TabPanel className={s.tabs__content}>{content}</TabPanel>
);
