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
  type = 'button',
  ...props
}) => {
  const classNames = clsx(s.btn, isLoading && s.btn_loading);
  const iconValue = icon?.value;
  const isDisabled = disabled || isLoading;

  const getBodyElement = (children: ReactNode) => (
    <div className={s.btn__body}>
      <div className={s.btn__content}>
        {typeof children === 'string' ? (
          <p className={s.btn__box}>{children}</p>
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
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore */
      ['aria-disabled']: isDisabled || children.props['aria-disabled'],
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore */
      children: getBodyElement(children.props.children),
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore */
      className: clsx(classNames, className, children.props.className)
    });
  }

  return (
    <button
      className={clsx(classNames, className)}
      disabled={isDisabled}
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      {...props}
    >
      {getBodyElement(children)}
    </button>
  );
};
