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
  const isDisabled = disabled || isLoading;
  const classNames = clsx(s.btn, isLoading && s.btn_loading);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore */
      className: clsx(classNames, children.props.className),
    });
  }

  const isStringChildren = typeof children === "string";

  return (
    <button
      aria-disabled={isDisabled}
      className={clsx(classNames, className)}
      disabled={isDisabled}
      {...(isStringChildren && {
        "aria-label": children,
      })}
      {...props}
    >
      <div className={s.btn__body}>
        <div className={s.btn__content}>
          {isStringChildren ? (
            <div className={s.btn__box}>{children}</div>
          ) : (
            children
          )}
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
        </div>
        {isLoading && <Loader className={s.btn__loader} />}
      </div>
    </button>
  );
};
