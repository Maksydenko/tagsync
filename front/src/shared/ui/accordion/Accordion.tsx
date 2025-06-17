'use client';

import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import Collapse, { CollapseProps as RootCollapseProps } from 'rc-collapse';

import { Translation } from '@/shared/config';

import motion from './motion.util';

import { Img } from '../img/Img';

import 'rc-collapse/assets/index.css';
import s from './Accordion.module.scss';

interface AccordionProps extends Omit<RootCollapseProps, 'expandIcon'> {
  className?: string;
  expandIcon?: ReactNode;
  isReverseIcon?: boolean;
}

export const Accordion: FC<AccordionProps> = ({
  className,
  expandIcon,
  isReverseIcon,
  ...props
}) => {
  const tShared = useTranslations(Translation.Shared);

  const defaultExpandIcon = (
    <Img
      alt={tShared('arrow')}
      className={s.collapse__icon}
      src="/img/icons/form/arrow-down.svg"
      isSvg
    />
  );

  const getExpandIcon = () => {
    if (expandIcon) {
      return expandIcon;
    }

    return defaultExpandIcon;
  };

  return (
    <Collapse
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
