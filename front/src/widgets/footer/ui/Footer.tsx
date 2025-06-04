"use client";

import { FC } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { categoriesAtom } from "@/entities/product";

import { Locale, Pathname, Translation } from "@/shared/model";
import { Img } from "@/shared/ui";

import { Copyright } from "./Copyright/Copyright";

import s from "./Footer.module.scss";

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => {
  const locale = useLocale() as Locale;
  const tShared = useTranslations(Translation.Shared);

  const [{ data: categoriesData }] = useAtom(categoriesAtom);

  return (
    <footer className={clsx(s.footer, className)}>
      <div className={s.footer__body}>
        <div className={s.footer__container}>
          <div className={s.footer__content}>
            <div className={s.footer__box}>
              <Link className={s.footer__logo} href={Pathname.Home}>
                <Img
                  alt="TagSync"
                  className={s.footer__img}
                  height={35}
                  src="/img/logos/logo.png"
                  width={70}
                  isSvg
                />
                <p>TagSync</p>
              </Link>
              <div className={s.footer__text}>
                <p>{tShared("footer.text")}</p>
              </div>
            </div>
            <div className={s.footer__box}>
              <h6 className={s.footer__title}>
                {tShared("pathnames.categories")}
              </h6>
              <ul className={s.footer__list}>
                {categoriesData?.data.map((category) => (
                  <li key={category.slug} className={s.footer__item}>
                    <Link className={s.footer__link} href={`/${category.slug}`}>
                      {category.translations_slug[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Copyright className={s.footer__copyright} />
      </div>
    </footer>
  );
};
