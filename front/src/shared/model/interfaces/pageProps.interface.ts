import { Locale } from '../../config/enums/locale.enum';

export interface IPageProps {
  params: Promise<IParams>;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  searchParams?: Promise<any>;
}

export interface IParams {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
  locale: Locale;
}
