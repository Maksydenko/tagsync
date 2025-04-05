import { ButtonHTMLAttributes, cloneElement, FC, isValidElement } from "react";
import { clsx } from "clsx";

import { Loader } from "../loader/Loader";

import s from "./Btn.module.scss";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Btn: FC<BtnProps> = ({
  asChild,
  children,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore */
      className: clsx(s.btn, children.props.className, className),
    });
  }

  return (
    <button
      className={clsx(s.btn, isLoading && s.btn_loading, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className={s.btn__body}>
        <div className={s.btn__content}>{children}</div>
        {isLoading && <Loader className={s.btn__loader} />}
      </div>
    </button>
  );
};
