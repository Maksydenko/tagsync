'use client';

import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import RootCollapse, { CollapseProps as RootCollapseProps } from 'rc-collapse';

import motion from './motion.util';

import { Img } from '../img/Img';

import 'rc-collapse/assets/index.css';
import s from './Collapse.module.scss';

interface CollapseProps extends Omit<RootCollapseProps, 'expandIcon'> {
  className?: string;
  expandIcon?: ReactNode;
  isReverseIcon?: boolean;
}

export const Collapse: FC<CollapseProps> = ({
  className,
  expandIcon,
  isReverseIcon,
  ...props
}) => {
  const defaultExpandIcon = (
    <Img className={s.collapse__icon} src="/img/icons/form/arrow-down.svg" />
  );

  const getExpandIcon = () => {
    if (expandIcon) {
      return expandIcon;
    }

    return defaultExpandIcon;
  };

  return (
    <RootCollapse
      className={clsx(
        s.collapse,
        isReverseIcon && s.collapse_reverse,
        className
      )}
      expandIcon={getExpandIcon}
      openMotion={motion}
      {...props}
    />
  );
};
