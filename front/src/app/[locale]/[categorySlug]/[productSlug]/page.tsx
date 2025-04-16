import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { IPageProps } from "@/shared/model";

import Product from "@/views/product";

const ProductPage: NextPage<IPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Product />;
};

export default ProductPage;

export const generateStaticParams = async () => {
  return [
    {
      productSlug: "product",
    },
  ];
};

export const generateMetadata = async () => {
  return {
    revalidate: process.env.REVALIDATE_TIMEOUT,
  };
};
