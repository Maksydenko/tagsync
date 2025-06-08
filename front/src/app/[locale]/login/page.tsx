import { NextPage } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Login from "@/views/login";

import { Translation } from "@/shared/config";
import { generateMetaTitle } from "@/shared/lib";
import { IPageProps, IParams } from "@/shared/model";

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

export const generateMetadata = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const tLogin = await getTranslations({
    locale,
    namespace: Translation.Login,
  });

  return {
    revalidate: process.env.REVALIDATE_TIMEOUT,
    title: generateMetaTitle(tLogin("title")),
  };
};
