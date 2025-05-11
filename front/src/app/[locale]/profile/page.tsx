import { NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import Profile from "@/views/profile";

import { IPageProps } from "@/shared/model";

const ProfilePage: NextPage<IPageProps> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return <Profile />;
};

export default ProfilePage;
