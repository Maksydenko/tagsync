import { NextPage } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Registration from '@/views/registration';

import { Translation } from '@/shared/config';
import { generateMetaTitle } from '@/shared/lib';
import { IPageProps, IParams } from '@/shared/model';

interface RegistrationPageProps {
  params: Promise<IParams>;
}

const RegistrationPage: NextPage<RegistrationPageProps> = async props => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Registration />;
};

export default RegistrationPage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tRegistration = await getTranslations({
    locale,
    namespace: Translation.Registration
  });

  return {
    revalidate: process.env.REVALIDATE_TIMEOUT,
    title: generateMetaTitle(tRegistration('title'))
  };
};
