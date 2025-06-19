import { NextPage } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Profile from '@/views/profile';

import { Translation } from '@/shared/config';
import { generateMetaTitle } from '@/shared/lib';
import { IPageProps } from '@/shared/model';

const ProfilePage: NextPage<IPageProps> = async props => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Profile />;
};

export default ProfilePage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tShared = await getTranslations({
    locale,
    namespace: Translation.Shared
  });

  return {
    title: generateMetaTitle(tShared('user.profile'))
  };
};
