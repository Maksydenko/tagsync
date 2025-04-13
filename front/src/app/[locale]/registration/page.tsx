import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { IParams } from "@/shared/model";

import Registration from "@/views/registration";

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
