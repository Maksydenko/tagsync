import { Locale } from "../enums/locale.enum";

export interface IPageProps<T = unknown> {
  params: Promise<IParams>;
  searchParams?: Promise<T>;
}

export interface IParams {
  locale: Locale;
}
