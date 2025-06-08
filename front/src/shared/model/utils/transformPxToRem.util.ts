import { FontSize } from "@/shared/config";

export const transformPxToRem = (px: number) => `${px / FontSize.Default}rem`;
