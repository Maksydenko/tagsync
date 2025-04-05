"use client";

import { FC, useTransition } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

import { ILink, Locale } from "@/shared/model";

import { usePathname, useRouter } from "@/i18n/routing";

import s from "../LocaleSwitcher.module.scss";

interface LocaleSwitcherItemProps {
  locale: ILink;
  onClick?: () => void;
}

export const LocaleSwitcherItem: FC<LocaleSwitcherItemProps> = ({
  locale: { label, value },
}) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const locale = useLocale();

  const handleClick = () => {
    const nextLocale = value as Locale;

    startTransition(() => {
      router.replace(
        {
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks
          params,
          pathname,
        },
        {
          locale: nextLocale,
        }
      );
    });
  };

  return (
    <li className={s.localeSwitcher__item}>
      <button
        className={s.localeSwitcher__btn}
        disabled={isPending || value === locale}
        onClick={handleClick}
      >
        {label}
      </button>
    </li>
  );
};
