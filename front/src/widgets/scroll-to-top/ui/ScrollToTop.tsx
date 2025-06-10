'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { animate } from 'framer-motion';

import { Translation } from '@/shared/config';
import { useActiveOnScroll } from '@/shared/model';
import { Img } from '@/shared/ui';

import s from './ScrollToTop.module.scss';

interface ScrollToTopProps {
  className?: string;
}

export const ScrollToTop: FC<ScrollToTopProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);
  const isActive = useActiveOnScroll(110);

  const handleClick = () => {
    const { scrollTo, scrollY } = window;

    animate(scrollY, 0, {
      duration: 0.8,
      onUpdate: (value) => {
        scrollTo(0, value);
      }
    });
  };

  return (
    <div
      className={clsx(
        s.scrollToTop,
        isActive && s.scrollToTop_active,
        className
      )}
    >
      <button
        aria-label={tShared('scroll-to-top')}
        className={s.scrollToTop__btn}
        type="button"
        onClick={handleClick}
      >
        <Img
          alt={tShared('arrow')}
          className={s.scrollToTop__icon}
          src="/img/icons/form/arrow-down.svg"
          isSvg
        />
      </button>
    </div>
  );
};
