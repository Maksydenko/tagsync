import { defineRouting } from 'next-intl/routing';

import { Locale } from '@/shared/config';

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: Locale.Default,

  // A list of all locales that are supported
  locales: [Locale.EN, Locale.UK],
});
