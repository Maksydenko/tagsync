import { FC, ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { Locale } from "@/shared/model";

import { NextIntlProvider } from "./nextIntlClient.provider";
import { QueryProvider } from "./query/query.provider";

interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
}

export const Providers: FC<ProvidersProps> = ({ children, locale }) => (
  <QueryProvider>
    <NextIntlProvider locale={locale}>
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlProvider>
  </QueryProvider>
);
