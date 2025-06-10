import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

import { Locale } from '@/shared/config';

import { NextIntlProvider } from './nextIntlClient.provider';
import { QueryProvider } from './query/query.provider';

import { ReduxProvider } from './reduxProvider';

interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
}

export const Providers: FC<ProvidersProps> = ({ children, locale }) => (
  <ReduxProvider>
    <QueryProvider>
      <NextIntlProvider locale={locale}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlProvider>
    </QueryProvider>
  </ReduxProvider>
);
