"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IDatabase } from "@/shared/lib";
import {
  MutationKey,
  Pathname,
  QueryKey,
  removeLocalePrefix,
  Translation,
  userData,
} from "@/shared/model";

import s from "./UserWrapperList.module.scss";

interface UserWrapperListProps {
  className?: string;
}

export const UserWrapperList: FC<UserWrapperListProps> = ({ className }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const tShared = useTranslations(Translation.Shared);

  const supabase = createClientComponentClient<IDatabase>();

  const queryClient = useQueryClient();

  const { isPending: isLogoutPending, mutate: logout } = useMutation({
    mutationFn: async () => {
      return supabase.auth.signOut();
    },
    mutationKey: [MutationKey.Logout],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.User],
      });
      push(Pathname.Login);
    },
  });

  return (
    <div className={clsx(s.userWrapperList, className)}>
      <ul className={s.userWrapperList__list}>
        {userData.map(({ label, value }) => {
          return (
            <li
              key={value}
              className={clsx(
                s.userWrapperList__item,
                value === removeLocalePrefix(pathname) &&
                  s.userWrapperList__item_active
              )}
            >
              <Link className={s.userWrapperList__link} href={value}>
                {tShared("user." + label)}
              </Link>
            </li>
          );
        })}
        <li className={s.userWrapperList__item}>
          <button
            className={s.userWrapperList__link}
            disabled={isLogoutPending}
            onClick={() => {
              logout();
            }}
          >
            {tShared("user.logout")}
          </button>
        </li>
      </ul>
    </div>
  );
};
