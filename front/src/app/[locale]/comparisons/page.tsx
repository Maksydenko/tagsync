import { NextPage } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Comparisons from '@/views/comparisons';

import { Translation } from '@/shared/config';
import { generateMetaTitle } from '@/shared/lib';
import { IPageProps } from '@/shared/model';

const ComparisonsPage: NextPage<IPageProps> = async props => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Comparisons />;
};

export default ComparisonsPage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tShared = await getTranslations({
    locale,
    namespace: Translation.Shared
  });

  return {
    revalidate: process.env.REVALIDATE_TIMEOUT,
    title: generateMetaTitle(tShared('user.comparisons'))
  };
};
