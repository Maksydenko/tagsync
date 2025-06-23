import { ReactNode } from 'react';
import { Messages, NextIntlClientProvider } from 'next-intl';
import { DeepPartial } from 'react-hook-form';

import { render, RenderOptions } from '@testing-library/react';

import { Locale } from '@/shared/config';

interface RenderWithIntlOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: Locale;
  messages?: DeepPartial<Messages>;
}

export const renderWithIntl = (
  ui: ReactNode,
  { locale = Locale.EN, messages, ...restOptions }: RenderWithIntlOptions = {}
) =>
  render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    restOptions
  );
