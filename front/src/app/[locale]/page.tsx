import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import Home from "@/views/home";

import { RecommendationsService } from "@/features/recommendations/api/recommendations.service";

import { IParams } from "@/shared/model";

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
