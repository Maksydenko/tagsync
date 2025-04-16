import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { IPageProps } from "@/shared/model";

import Comparisons from "@/views/comparisons";

const ComparisonsPage: NextPage<IPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Comparisons />;
};

export default ComparisonsPage;
