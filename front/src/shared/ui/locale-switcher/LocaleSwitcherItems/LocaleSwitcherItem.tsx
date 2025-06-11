'use client';

import { FC, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { Locale } from '@/shared/config';
import { ILink } from '@/shared/model';

import { usePathname, useRouter } from '@/i18n/navigation';

import s from '../LocaleSwitcher.module.scss';

interface LocaleSwitcherItemProps {
  locale: ILink;
  onClick?: () => void;
}

export const LocaleSwitcherItem: FC<LocaleSwitcherItemProps> = ({
  locale: { label, value }
}) => {
  const [isPending, startTransition] = useTransition();

  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const locale = useLocale();

  const isDisabled = value === locale || isPending;

  const handleClick = () => {
    const nextLocale = value as Locale;

    startTransition(() => {
      replace(
        {
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks
          params,
          pathname
        },
        {
          locale: nextLocale
        }
      );
    });
  };

  return (
    <li className={s.localeSwitcher__item}>
      <button
        aria-label={label}
        className={s.localeSwitcher__btn}
        disabled={isDisabled}
        type="button"
        onClick={handleClick}
      >
        {label}
      </button>
    </li>
  );
};
