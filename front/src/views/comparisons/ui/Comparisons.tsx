import { FC } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { UserWrapper } from "@/widgets/user-wrapper";

import { ComparisonCharacteristics } from "@/entities/product";

import { Translation } from "@/shared/config";

import s from "./Comparisons.module.scss";

interface ComparisonsProps {
  className?: string;
}

export const Comparisons: FC<ComparisonsProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <div className={clsx(s.comparisonsPage, className)}>
      <UserWrapper
        className={s.comparisons}
        title={tShared("user.comparisons")}
      >
        <ComparisonCharacteristics className={s.comparisons__products} />
      </UserWrapper>
    </div>
  );
};
