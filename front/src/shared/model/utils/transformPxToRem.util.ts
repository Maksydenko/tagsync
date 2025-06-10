import { FontSize } from "@/shared/config";

export const transformPxToRem = (px: number) => {
  if (Number.isNaN(px)) {
    return null;
  }

  return `${px / FontSize.Default}rem`;
};
