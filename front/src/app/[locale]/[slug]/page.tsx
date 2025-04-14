import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { IPageProps } from "@/shared/model";

import Category from "@/views/category";

const CategoryPage: NextPage<IPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Category />;
};

export default CategoryPage;

export const generateStaticParams = async () => {
  // TODO: handle real slugs
  return [
    {
      slug: "category",
    },
  ];
};

export const generateMetadata = async () => {
  return {
    revalidate: process.env.REVALIDATE_TIMEOUT,
  };
};
