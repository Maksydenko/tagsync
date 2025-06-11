import {
  ButtonHTMLAttributes,
  cloneElement,
  FC,
  isValidElement,
  ReactNode
} from 'react';
import { clsx } from 'clsx';

import { ILink } from '@/shared/model';

import { Img } from '../img/Img';
import { Loader } from '../loader/Loader';

import s from './Btn.module.scss';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  icon?: ILink<ReactNode>;
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
  const classNames = clsx(s.btn, isLoading && s.btn_loading);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore */
      className: clsx(classNames, className, children.props.className)
    });
  }

  const isDisabled = disabled || isLoading;
  const iconValue = icon?.value;

  return (
    <button
      className={clsx(classNames, className)}
      disabled={isDisabled}
      {...props}
    >
      <div className={s.btn__body}>
        <div className={s.btn__content}>
          {typeof children === 'string' ? (
            <div className={s.btn__box}>{children}</div>
          ) : (
            children
          )}
          {typeof iconValue === 'string' ? (
            <Img
              alt={icon?.label}
              className={s.btn__icon}
              height={20}
              src={iconValue}
              width={20}
              isSvg
            />
          ) : (
            iconValue
          )}
        </div>
        {isLoading && <Loader className={s.btn__loader} />}
      </div>
    </button>
  );
};
