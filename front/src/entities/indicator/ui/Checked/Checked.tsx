import { FC } from "react";
import { clsx } from "clsx";

import { Img } from "@/shared/ui";

import s from "./Checked.module.scss";

interface CheckedProps {
  className?: string;
}

export const Checked: FC<CheckedProps> = ({ className }) => (
    <div className={clsx(s.checked, className)}>
      <Img
        className={s.checked__icon}
        src="/img/icons/form/checkmark.svg"
        isSvg
      />
    </div>
  );
