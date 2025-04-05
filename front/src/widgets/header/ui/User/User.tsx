"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import initials from "initials";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { IDatabase } from "@/shared/lib";
import { MutationKey, Pathname, QueryKey, Translation } from "@/shared/model";
import { Dropdown, Img, Loader } from "@/shared/ui";

import s from "./User.module.scss";

interface UserProps {
  className?: string;
  onClick?: () => void;
}

export const User: FC<UserProps> = ({ className, onClick }) => {
  const { push } = useRouter();

  const tShared = useTranslations(Translation.Shared);
  const supabase = createClientComponentClient<IDatabase>();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryFn: async () => {
      const res = await supabase.auth.getUser();

      return res.data;
    },
    queryKey: [QueryKey.User],
  });
  const userEmail = userData?.user?.email;

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

  const userIcon = (
    <Img
      alt={tShared("user.account")}
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
        ) : (
          <>
            {userData?.user ? (
              <Dropdown
                className={s.user__dropdown}
                isDisabled={isUserLoading}
                items={[
                  {
                    label: tShared("user.account"),
                    value: Pathname.Account,
                  },
                  {
                    label: "logout",
                    value: (
                      <button
                        disabled={isLogoutPending}
                        type="button"
                        onClick={() => {
                          logout();
                        }}
                      >
                        {tShared("user.logout")}
                      </button>
                    ),
                  },
                ]}
              >
                {userEmail ? initials(userEmail) : userIcon}
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
          </>
        )}
      </div>
    </div>
  );
};
