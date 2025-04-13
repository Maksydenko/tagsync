import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { IParams } from "@/shared/model";

import Login from "@/views/login";

interface LoginPageProps {
  params: Promise<IParams>;
}

const LoginPage: NextPage<LoginPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Login />;
};

export default LoginPage;
