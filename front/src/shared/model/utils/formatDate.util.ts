import { DateTime } from "luxon";

import { DateFormat, Locale } from "../enums";

interface IFormatDate {
  date: Date;
  format?: DateFormat;
  locale?: string;
}

export const formatDate = ({
  date,
  format = DateFormat.Default,
  locale = Locale.Default,
}: IFormatDate) => {
  return DateTime.fromISO(date.toISOString(), {
    locale,
  }).toFormat(format);
};
