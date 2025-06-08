import { FC } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { UserWrapper } from "@/widgets/user-wrapper";

import { EditUserForm } from "@/features/auth";

import { Translation } from "@/shared/config";

import s from "./Profile.module.scss";

interface ProfileProps {
  className?: string;
}

export const Profile: FC<ProfileProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <div className={clsx(s.profilePage, className)}>
      <UserWrapper className={s.profile} title={tShared("user.profile")}>
        <EditUserForm className={s.profile__form} />
      </UserWrapper>
    </div>
  );
};
