import { NextPage } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Home from '@/views/home';

import { HomePageRecommendationsService } from '@/features/recommendations';

import { Translation } from '@/shared/config';
import { generateMetaTitle } from '@/shared/lib';
import { IPageProps, IParams } from '@/shared/model';

interface HomePageProps {
  params: Promise<IParams>;
}

const HomePage: NextPage<HomePageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  const [popularData, topRatedData] = await Promise.all([
    HomePageRecommendationsService.getPopular(),
    HomePageRecommendationsService.getTopRated(),
  ]);

  return (
    <Home popularData={popularData.data} topRatedData={topRatedData.data} />
  );
};

export default HomePage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tShared = await getTranslations({
    locale,
    namespace: Translation.Shared,
  });
  const tHome = await getTranslations({
    locale,
    namespace: Translation.Home,
  });

  return {
    description: tShared('footer.text'),
    revalidate: process.env.REVALIDATE_TIMEOUT,
    title: generateMetaTitle(tHome('title')),
  };
};
