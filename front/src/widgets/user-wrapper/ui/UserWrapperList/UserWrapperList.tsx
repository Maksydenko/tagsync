'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useMutation } from '@tanstack/react-query';

import { Pathname, Translation } from '@/shared/config';
import { IDatabase, useInvalidateAtom } from '@/shared/lib';
import {
  MutationKey,
  QueryKey,
  removeLocalePrefix,
  userData
} from '@/shared/model';
import { Img } from '@/shared/ui';

import s from './UserWrapperList.module.scss';

interface UserWrapperListProps {
  className?: string;
}

export const UserWrapperList: FC<UserWrapperListProps> = ({ className }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const tShared = useTranslations(Translation.Shared);
  const invalidateUser = useInvalidateAtom([QueryKey.User]);

  const { isPending: isLogoutPending, mutate: logout } = useMutation({
    mutationFn: async () => {
      const supabase = createClientComponentClient<IDatabase>();

      return supabase.auth.signOut();
    },
    mutationKey: [MutationKey.Logout],
    onSuccess: async () => {
      await invalidateUser();
      push(Pathname.Login);
    }
  });

  return (
    <div className={clsx(s.userWrapperList, className)}>
      <ul className={s.userWrapperList__list}>
        {userData.map(({ icon, label, value }) => (
          <li
            key={value}
            className={clsx(
              s.userWrapperList__item,
              value === removeLocalePrefix(pathname) &&
                s.userWrapperList__item_active
            )}
          >
            <Link className={s.userWrapperList__link} href={value}>
              <Img
                alt={label}
                className={s.userWrapperList__icon}
                src={icon}
                isSvg
              />
              <p>{tShared(`user.${label}`)}</p>
            </Link>
          </li>
        ))}
        <li className={s.userWrapperList__item}>
          <button
            className={s.userWrapperList__link}
            disabled={isLogoutPending}
            type="button"
            onClick={() => {
              if (isLogoutPending) {
                return;
              }

              logout();
            }}
          >
            <Img
              alt={tShared('user.logout')}
              className={s.userWrapperList__icon}
              src="/img/icons/logout.svg"
              isSvg
            />
            <p>{tShared('user.logout')}</p>
          </button>
        </li>
      </ul>
    </div>
  );
};
