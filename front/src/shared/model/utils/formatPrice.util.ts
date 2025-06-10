import { formatNumber } from './formatNumber.util';

interface IFormatPrice extends Intl.NumberFormatOptions {
  price: number;
}

export const formatPrice = ({
  maximumFractionDigits,
  minimumFractionDigits,
  price,
  ...props
}: IFormatPrice) => {
  if (price < 0) {
    return null;
  }

  const fractionDigits = maximumFractionDigits || minimumFractionDigits;
  const roundedPrice = Math.ceil(price * 100) / 100;

  const formattedNumber = formatNumber({
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
    number: roundedPrice,
    ...props
  });

  if (!formattedNumber) {
    return null;
  }

  return `${formattedNumber} ₴`;
};
