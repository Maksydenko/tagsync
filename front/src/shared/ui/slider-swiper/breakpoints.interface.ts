import { SwiperOptions } from 'swiper/types';

export interface IBreakpoint {
  isBreakpoint: boolean | undefined;
  slides: SwiperOptions['slidesPerView'];
}

export interface IBreakpoints {
  [ratio: string]: IBreakpointsValue;
  [width: number]: IBreakpointsValue;
}

interface IBreakpointsValue extends SwiperOptions {
  isBreakpoint?: boolean;
}
