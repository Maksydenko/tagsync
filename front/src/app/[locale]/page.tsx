import { NextPage } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Home from "@/views/home";

import { RecommendationsService } from "@/features/recommendations/api/recommendations.service";

import { generateMetaTitle } from "@/shared/lib";
import { IPageProps, IParams, Translation } from "@/shared/model";

interface HomePageProps {
  params: Promise<IParams>;
}

const HomePage: NextPage<HomePageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  // TODO: handle common recommendations
  const [alsoViewedData, similarData, priceBasedData] = await Promise.all([
    RecommendationsService.getAlsoViewed(1),
    RecommendationsService.getSimilar(1),
    RecommendationsService.getPriceBased(1),
  ]);

  return (
    <Home
      alsoViewedData={alsoViewedData.data}
      priceBasedData={priceBasedData.data}
      similarData={similarData.data}
    />
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
    description: tShared("footer.text"),
    revalidate: process.env.REVALIDATE_TIMEOUT,
    title: generateMetaTitle(tHome("title")),
  };
};
