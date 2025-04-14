import { Locale } from "../enums";

interface IFormatNumber extends Intl.NumberFormatOptions {
  locales?: Locale;
  number: number;
}

export const formatNumber = ({
  locales = Locale.UK,
  minimumFractionDigits = 0,
  number = 0,
  useGrouping = true,
  ...props
}: IFormatNumber) => {
  return number.toLocaleString(locales, {
    minimumFractionDigits,
    useGrouping,
    ...props,
  });
};
