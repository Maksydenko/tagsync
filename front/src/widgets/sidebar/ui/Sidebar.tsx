import { FC } from "react";
import clsx from "clsx";

import { SidebarItems } from "./SidebarItems/SidebarItems";

import s from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => (
  <aside className={clsx(className, s.sidebar)}>
    <SidebarItems />
  </aside>
);
