import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import Registration from "@/pages/registration";

import { IParams } from "@/shared/model";

interface RegistrationPageProps {
  params: Promise<IParams>;
}

const RegistrationPage: NextPage<RegistrationPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Registration />;
};

export default RegistrationPage;
