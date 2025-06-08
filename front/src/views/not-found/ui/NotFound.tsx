"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { Translation } from "@/shared/config";

import { useRedirectToHomepage } from "../model";

import s from "./NotFound.module.scss";

export const NotFound: FC = () => {
  const tNotFound = useTranslations(Translation.NotFound);
  const { time } = useRedirectToHomepage();

  return (
    <div className={s.notFoundPage}>
      <section className={s.notFound}>
        <div className={s.notFound__container}>
          <h1 className={s.notFound__title}>{tNotFound("title")}</h1>
          <h2 className={s.notFound__subtitle}>{tNotFound("subtitle")}</h2>
          <div className={s.notFound__text}>
            <p>
              {tNotFound("text")} {time}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
