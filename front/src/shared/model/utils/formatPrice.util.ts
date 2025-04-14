import { formatNumber } from "./formatNumber.util";

interface IFormatPrice extends Intl.NumberFormatOptions {
  number: number;
}

export const formatPrice = ({ number, ...props }: IFormatPrice) => {
  return `${formatNumber({
    number,
    ...props,
  })} ₴`;
};
