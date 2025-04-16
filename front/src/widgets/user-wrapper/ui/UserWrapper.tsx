"use client";

import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

import { IDatabase } from "@/shared/lib";
import { Pathname, QueryKey } from "@/shared/model";
import { Loader } from "@/shared/ui";

import { UserWrapperList } from "./UserWrapperList/UserWrapperList";

import s from "./UserWrapper.module.scss";

interface UserWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const UserWrapper: FC<UserWrapperProps> = ({
  children,
  className,
  title,
}) => {
  const { push } = useRouter();
  const supabase = createClientComponentClient<IDatabase>();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryFn: async () => {
      const res = await supabase.auth.getUser();

      return res.data;
    },
    queryKey: [QueryKey.User],
  });
  const user = userData?.user;

  useEffect(() => {
    if (isUserLoading || user) {
      return;
    }

    push(Pathname.Login);
  }, [isUserLoading, push, user]);

  return (
    <div className={clsx(s.userWrapper, className)}>
      <div className={s.userWrapper__container}>
        {isUserLoading || !user ? (
          <Loader className={s.userWrapper__loader} />
        ) : (
          <div className={s.userWrapper__body}>
            <UserWrapperList className={s.userWrapper__list} />
            <div className={s.userWrapper__content}>
              {title && <h1 className={s.userWrapper__title}>{title}</h1>}
              <div className={s.userWrapper__box}>{children}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
