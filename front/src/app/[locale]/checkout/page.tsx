import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import Checkout from "@/views/checkout";

import { IParams } from "@/shared/model";

interface CheckoutPageProps {
  params: Promise<IParams>;
}

const CheckoutPage: NextPage<CheckoutPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Checkout />;
};

export default CheckoutPage;
