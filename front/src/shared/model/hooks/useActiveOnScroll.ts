"use client";

import { useCallback, useState } from "react";

import { useWindowListener } from "./useWindowListener";

export const useActiveOnScroll = (breakpoint: number) => {
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

  return isActive;
};
