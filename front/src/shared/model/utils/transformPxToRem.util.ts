import { BASE_FONT_SIZE } from "../constants/baseFontSize.const";

export const transformPxToRem = (px: number) => `${px / BASE_FONT_SIZE}rem`;
