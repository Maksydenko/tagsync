import { FC, ReactNode } from "react";
import dynamic from "next/dynamic";
import { clsx } from "clsx";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { Locale, montserrat, openSans, Phase } from "@/shared/model";

import { Providers } from "./providers";

import "@/application/styles/globals.scss";

const Sidebar = dynamic(() =>
  import("@/widgets/sidebar").then((module) => module.Sidebar)
);
const ScrollToTop = dynamic(() =>
  import("@/widgets/scroll-to-top").then((module) => module.ScrollToTop)
);

interface LayoutProviderProps {
  children: ReactNode;
  locale: Locale;
}

export const LayoutProvider: FC<LayoutProviderProps> = async ({
  children,
  locale,
}) => (
  <html
    className={clsx(openSans.variable, montserrat.variable)}
    id="html"
    lang={locale}
    suppressHydrationWarning
  >
    <body>
      <Providers locale={locale}>
        <div className="layout">
          <Header className="layout__header" />
          <Sidebar className="layout__sidebar" />
          <ScrollToTop className="layout__scrollToTop" />
          <main>{children}</main>
          <Footer className="layout__footer" />
        </div>
        {process.env.NEXT_PUBLIC_PHASE !== Phase.Development && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </Providers>
    </body>
  </html>
);
