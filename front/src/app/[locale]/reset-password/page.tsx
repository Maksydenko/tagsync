import { NextPage } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ResetPassword } from '@/views/reset-password';

import { Translation } from '@/shared/config';
import { generateMetaTitle } from '@/shared/lib';
import { IPageProps, IParams } from '@/shared/model';

interface ResetPasswordPageProps {
  params: Promise<IParams>;
}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> = async props => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <ResetPassword />;
};

export default ResetPasswordPage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tResetPassword = await getTranslations({
    locale,
    namespace: Translation.ResetPassword
  });

  return {
    title: generateMetaTitle(tResetPassword('title'))
  };
};
