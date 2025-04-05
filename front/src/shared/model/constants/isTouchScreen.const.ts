import { isBrowser } from "./isBrowser.const";

export const isTouchScreen =
  isBrowser && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
