import { FC } from "react";
import { useTranslations } from "next-intl";

import { Translation } from "@/shared/model";

import s from "./Home.module.scss";

export const Home: FC = () => {
  const tHome = useTranslations(Translation.Home);

  return (
    <div className={s.homePage}>
      <p>{tHome("title")}</p>
    </div>
  );
};
