import { FC, ReactNode } from "react";
import { clsx } from "clsx";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { Locale, montserrat, openSans } from "@/shared/model";

import { Providers } from "./providers";

import "@/app/styles/globals.scss";

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
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <Providers locale={locale}>
          <div className="layout">
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};
