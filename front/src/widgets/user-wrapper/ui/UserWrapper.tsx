import { FC, ReactNode } from "react";
import { clsx } from "clsx";

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
  return (
    <div className={clsx(s.userWrapper, className)}>
      <div className={s.userWrapper__container}>
        <div className={s.userWrapper__body}>
          <UserWrapperList className={s.userWrapper__list} />
          <div className={s.userWrapper__content}>
            {title && <h1 className={s.userWrapper__title}>{title}</h1>}
            <div className={s.userWrapper__box}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
