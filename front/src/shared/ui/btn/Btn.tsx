import {
  ButtonHTMLAttributes,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from "react";
import { clsx } from "clsx";

import { Img } from "../img/Img";
import { Loader } from "../loader/Loader";

import s from "./Btn.module.scss";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
}

export const Btn: FC<BtnProps> = ({
  asChild,
  children,
  className,
  disabled,
  icon,
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

  const isDisabled = disabled || isLoading;
  const isStringChildren = typeof children === "string";

  return (
    <button
      aria-disabled={isDisabled}
      className={clsx(s.btn, isLoading && s.btn_loading, className)}
      disabled={isDisabled}
      {...(isStringChildren && {
        "aria-label": children,
      })}
      {...props}
    >
      <div className={s.btn__body}>
        {isStringChildren ? <span>{children}</span> : children}
        {typeof icon === "string" ? (
          <Img
            className={s.btn__icon}
            src={icon}
            {...(isStringChildren && {
              alt: children,
            })}
            height={20}
            width={20}
            isSvg
          />
        ) : (
          icon
        )}
        {isLoading && <Loader className={s.btn__loader} />}
      </div>
    </button>
  );
};
