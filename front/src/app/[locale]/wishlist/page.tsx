import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import Wishlist from "@/views/wishlist";

import { IPageProps } from "@/shared/model";

const WishlistPage: NextPage<IPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Wishlist />;
};

export default WishlistPage;
