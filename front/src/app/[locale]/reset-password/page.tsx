import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { ResetPassword } from "@/views/reset-password";

import { IParams } from "@/shared/model";

interface ResetPasswordPageProps {
  params: Promise<IParams>;
}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <ResetPassword />;
};

export default ResetPasswordPage;
