import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import Orders from "@/views/orders";

import { IPageProps } from "@/shared/model";

const OrdersPage: NextPage<IPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Orders />;
};

export default OrdersPage;
