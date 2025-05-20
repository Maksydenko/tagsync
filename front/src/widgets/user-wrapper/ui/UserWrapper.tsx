"use client";

import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { userAtom } from "@/shared/lib";
import { Pathname } from "@/shared/model";
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
  const [{ data: userData, isLoading: isUserLoading }] = useAtom(userAtom);

  useEffect(() => {
    if (isUserLoading || userData) {
      return;
    }

    push(Pathname.Login);
  }, [isUserLoading, push, userData]);

  return (
    <div className={clsx(s.userWrapper, className)}>
      <div className={s.userWrapper__container}>
        {isUserLoading || !userData ? (
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
