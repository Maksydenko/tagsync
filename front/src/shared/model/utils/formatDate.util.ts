import { DateTime } from 'luxon';

import { Locale } from '@/shared/config';

import { DateFormat } from '../enums';

interface IFormatDate {
  date: Date;
  format?: DateFormat;
  locale?: string;
}

export const formatDate = ({
  date,
  format = DateFormat.Default,
  locale = Locale.Default,
}: IFormatDate) =>
  DateTime.fromISO(date.toISOString(), {
    locale,
  }).toFormat(format);
