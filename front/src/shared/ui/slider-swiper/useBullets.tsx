import { SwiperOptions } from "swiper/types";

import { addBreakpointDesktop } from "./addBreakpointDesktop.util";

import { IBreakpoint, IBreakpoints } from "./breakpoints.interface";

interface IUseBullets {
  breakpoints?: IBreakpoints;
  slidesLength: number;
  slidesPerView: SwiperOptions["slidesPerView"];
}

export const useBullets = ({
  breakpoints,
  slidesLength,
  slidesPerView = 1,
}: IUseBullets) => {
  if (!breakpoints) {
    if (+slidesPerView < slidesLength) {
      return true;
    }

    return false;
  }

  const breakpointsArray: IBreakpoint[] = Object.entries(breakpoints).map(
    ([, { isBreakpoint, slidesPerView: slides }]) => ({
        isBreakpoint,
        slides,
      })
  );

  const breakpointsWithDesktop = addBreakpointDesktop(
    slidesPerView,
    breakpointsArray
  );

  const results = breakpointsWithDesktop.map((breakpoint) => {
    const { isBreakpoint, slides } = breakpoint;

    if (isBreakpoint && Number(slides) < slidesLength) {
      return true;
    }

    return false;
  });

  return results.includes(true);
};
