"use client";

import { FC, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

import {
  Breakpoint,
  Pathname,
  useScrollLock,
  useWindowListener,
} from "@/shared/model";
import { Img } from "@/shared/ui";

import { Menu } from "./Menu/Menu";

import s from "./Header.module.scss";

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const BREAKPOINT = Breakpoint.Desktop;
  const pathname = usePathname();

  const { isScrollLocked, setIsScrollLocked } = useScrollLock([
    "main",
    "footer",
  ]);

  const unlockScroll = () => {
    if (!isScrollLocked) {
      return;
    }

    setIsScrollLocked(false);
  };

  const unlockScrollOnBreakpoint = () => {
    const isMoreBreakpoint = window.innerWidth > BREAKPOINT;

    if (isMoreBreakpoint && isScrollLocked) {
      unlockScroll();
    }
  };
  useWindowListener("resize", unlockScrollOnBreakpoint);

  const handleClick = () => {
    const isLessBreakpoint = window.innerWidth < BREAKPOINT;

    if (!isLessBreakpoint) {
      return;
    }

    setIsScrollLocked(!isScrollLocked);
  };

  useEffect(
    () => {
      unlockScroll();
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [pathname]
  );

  return (
    <header className={clsx(s.header, className)}>
      <div className={s.header__container}>
        <div className={s.header__body}>
          <Link
            className={s.header__logo}
            href={Pathname.Home}
            onClick={unlockScroll}
          >
            <Img
              alt="TagSync"
              className={s.header__img}
              height={35}
              src="/img/logos/logo.png"
              width={70}
              isPriority
              isSvg
            />
            <span>TagSync</span>
          </Link>
          <div className={s.header__content}>
            <Menu
              breakpoint={BREAKPOINT}
              className={s.header__menu}
              isScrollLocked={isScrollLocked}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
