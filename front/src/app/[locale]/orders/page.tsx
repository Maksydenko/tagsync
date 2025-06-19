import { NextPage } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Orders from '@/views/orders';

import { Translation } from '@/shared/config';
import { generateMetaTitle } from '@/shared/lib';
import { IPageProps } from '@/shared/model';

const OrdersPage: NextPage<IPageProps> = async props => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Orders />;
};

export default OrdersPage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tShared = await getTranslations({
    locale,
    namespace: Translation.Shared
  });

  return {
    title: generateMetaTitle(tShared('user.orders'))
  };
};
