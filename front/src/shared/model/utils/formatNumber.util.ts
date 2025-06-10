import { Locale } from "@/shared/config";

interface IFormatNumber extends Intl.NumberFormatOptions {
  locales?: Locale;
  number: number;
}

export const formatNumber = ({
  locales = Locale.UK,
  number = 0,
  useGrouping = true,
  ...props
}: IFormatNumber) => {
  if (Number.isNaN(number)) {
    return null;
  }

  return number.toLocaleString(locales, {
    useGrouping,
    ...props,
  });
};
