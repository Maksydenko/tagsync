import { AbstractIntlMessages, hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { Translation } from "@/shared/model";

import { routing } from "./routing";

const importMessages = async (
  translations: Translation[],
  locale: string
): Promise<AbstractIntlMessages> => {
  const messages: AbstractIntlMessages = {};

  for (const translation of translations) {
    const file = await import(
      `@/app/translations/${locale}/${translation}.json`
    );

    Object.assign(messages, file.default);
  }

  return messages;
};

const requestConfig = getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Ensure that a valid `locale` is used
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const translations = [
    Translation.Shared,
    Translation.NotFound,
    Translation.Home,
    Translation.Login,
    Translation.Registration,
  ];

  const messages = await importMessages(translations, locale);

  return {
    locale,
    messages,
  };
});

export default requestConfig;
