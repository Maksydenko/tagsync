"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import initials from "initials";
import { useAtom } from "jotai";

import { useMutation } from "@tanstack/react-query";

import { Pathname, Translation } from "@/shared/config";
import { useInvalidateAtom } from "@/shared/lib";
import {
  MutationKey,
  QueryKey,
  userData as userLinksData,
} from "@/shared/model";
import { Dropdown, Img, Loader } from "@/shared/ui";

import { userAtom } from "../../model";

import s from "./User.module.scss";

interface UserProps {
  className?: string;
  onClick?: () => void;
}

export const User: FC<UserProps> = ({ className, onClick }) => {
  const { push } = useRouter();
  const tShared = useTranslations(Translation.Shared);

  const [{ data: userData, isLoading: isUserLoading }] = useAtom(userAtom);
  const invalidateUser = useInvalidateAtom([QueryKey.User]);

  const user = userData?.data;
  const userName = `${user?.firstName} ${user?.lastName}`;

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const AuthService = await import("@/features/auth").then(
        (module) => module.AuthService
      );

      return AuthService.logout();
    },
    mutationKey: [MutationKey.Logout],
    onSuccess: async () => {
      await invalidateUser();
      push(Pathname.Login);
    },
  });

  const userIcon = (
    <Img
      alt={tShared("user.profile")}
      className={s.user__icon}
      height={20}
      src="/img/icons/user.svg"
      width={20}
      isSvg
    />
  );

  return (
    <div className={clsx(s.user, className)}>
      <div className={s.user__body}>
        {isUserLoading ? (
          <Loader className={s.user__loader} />
        ) : user ? (
          <Dropdown
            className={s.user__dropdown}
            icon={null}
            isDisabled={isUserLoading}
            items={[
              ...userLinksData.map(({ label, ...rest }) => ({
                label: tShared(`user.${label}`),
                ...rest,
              })),
              {
                icon: "/img/icons/logout.svg",
                label: tShared("user.logout"),
                value: () => {
                  logout();
                },
              },
            ]}
          >
            {userName ? initials(userName) : userIcon}
          </Dropdown>
        ) : (
          <Link
            className={s.user__link}
            href={Pathname.Login}
            onClick={onClick}
          >
            {userIcon}
          </Link>
        )}
      </div>
    </div>
  );
};
