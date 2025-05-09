"use client";

import { useCallback, useState } from "react";

import { useWindowListener } from "./useWindowListener";

interface IUseActiveOnScroll {
  (isActive: number): {
    isActive: boolean;
  };
}

export const useActiveOnScroll: IUseActiveOnScroll = (breakpoint) => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveOnScroll = useCallback(() => {
    const isMoreBreakpoint = window.scrollY > breakpoint;

    if (isMoreBreakpoint) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [breakpoint]);
  useWindowListener("scroll", handleActiveOnScroll);

  return {
    isActive,
  };
};
