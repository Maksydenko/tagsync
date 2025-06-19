import { NextPage } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Checkout from '@/views/checkout';

import { Translation } from '@/shared/config';
import { generateMetaTitle } from '@/shared/lib';
import { IPageProps, IParams } from '@/shared/model';

interface CheckoutPageProps {
  params: Promise<IParams>;
}

const CheckoutPage: NextPage<CheckoutPageProps> = async props => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Checkout />;
};

export default CheckoutPage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tShared = await getTranslations({
    locale,
    namespace: Translation.Shared
  });

  return {
    title: generateMetaTitle(tShared('cart.btns.checkout'))
  };
};
