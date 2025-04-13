import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { IParams } from "@/shared/model";

import Home from "@/views/home";

interface HomePageProps {
  params: Promise<IParams>;
}

const HomePage: NextPage<HomePageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Home />;
};

export default HomePage;
