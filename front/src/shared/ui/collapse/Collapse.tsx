'use client';

import { FC, ReactNode, useState } from 'react';
import { clsx } from 'clsx';

import { ILink } from '@/shared/model';

import { Img } from '../img/Img';

import s from './Collapse.module.scss';

interface CollapseProps {
  btn: ReactNode;
  children: ReactNode;
  className?: string;
  icon?: ILink<ReactNode> | null;
}

export const Collapse: FC<CollapseProps> = ({
  btn,
  children,
  className,
  icon = {
    label: '',
    value: '/img/icons/form/arrow-down.svg'
  }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconValue = icon?.value;

  return (
    <div className={clsx(s.collapse, className)}>
      <button
        className={s.collapse__btn}
        data-open={isOpen}
        type="button"
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        {typeof btn === 'string' ? <p>{btn}</p> : btn}
        {typeof iconValue === 'string' ? (
          <Img
            alt={icon?.label}
            className={s.collapse__icon}
            height={20}
            src={iconValue}
            width={20}
            isSvg
          />
        ) : (
          iconValue
        )}
      </button>
      <div className={clsx(s.collapse__body, isOpen && s.collapse__body_open)}>
        <div className={s.collapse__content}>{children}</div>
      </div>
    </div>
  );
};
