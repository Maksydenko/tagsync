import { FC } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { Translation } from "@/shared/model";
import { Img } from "@/shared/ui";

import s from "./Checked.module.scss";

interface CheckedProps {
  className?: string;
}

export const Checked: FC<CheckedProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <div className={clsx(s.checked, className)}>
      <Img
        alt={tShared("checkmark")}
        className={s.checked__icon}
        src="/img/icons/form/checkmark.svg"
        isSvg
      />
    </div>
  );
};
