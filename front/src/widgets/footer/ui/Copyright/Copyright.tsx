import { FC } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { Translation } from "@/shared/model";

import s from "./Copyright.module.scss";

interface CopyrightProps {
  className?: string;
}

export const Copyright: FC<CopyrightProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <div className={clsx(s.copyright, className)}>
      <div className={s.copyright__container}>
        <p>
          {tShared("footer.copyright")} © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
