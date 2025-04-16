import { FC, ReactNode } from "react";
import { clsx } from "clsx";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { Locale, montserrat, openSans } from "@/shared/model";

import { Providers } from "./providers";

import "@/application/styles/globals.scss";

interface LayoutProviderProps {
  children: ReactNode;
  locale: Locale;
}

export const LayoutProvider: FC<LayoutProviderProps> = async ({
  children,
  locale,
}) => {
  return (
    <html
      className={clsx(openSans.variable, montserrat.variable)}
      id="html"
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <Providers locale={locale}>
          <div id="layout">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
};
