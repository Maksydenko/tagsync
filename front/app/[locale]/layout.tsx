import { FC, ReactNode } from "react";

import { LayoutProvider } from "@/app/providers";

import { IPageProps } from "@/shared/model";

import { routing } from "@/i18n/routing";

import "@/app/styles/globals.scss";

interface LocaleLayoutProps extends IPageProps {
  children: ReactNode;
}

const LocaleLayout: FC<LocaleLayoutProps> = async ({ children, ...props }) => {
  const { locale } = await props.params;

  return <LayoutProvider locale={locale}>{children}</LayoutProvider>;
};

export default LocaleLayout;

export const dynamicParams = false;

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({
    locale,
  }));
};
