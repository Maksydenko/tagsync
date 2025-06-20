'use client';

import { FC, ReactNode, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { Menu, MenuButton } from '@headlessui/react';

import { Translation } from '@/shared/config';
import { ILink, ILinkWithIcon, useWindowListener } from '@/shared/model';

import { Img } from '../img/Img';
import { DropdownItems } from './DropdownItems/DropdownItems';

import s from './Dropdown.module.scss';

interface DropdownProps {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  icon?: ILink<ReactNode> | null;
  isDisabled?: boolean;
  items: (
    | ILink<(() => unknown) | string>
    | ILinkWithIcon<(() => unknown) | string>
  )[];
}

export const Dropdown: FC<DropdownProps> = ({
  ariaLabel,
  children,
  className,
  icon = {
    label: '',
    value: '/img/icons/form/arrow-down.svg'
  },
  isDisabled,
  items
}) => {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const tShared = useTranslations(Translation.Shared);

  const iconValue = icon?.value;

  const handleClose = () => {
    const { current: menuButtonElement } = menuButtonRef;

    if (!menuButtonElement?.hasAttribute('data-open')) {
      return;
    }

    menuButtonElement.click();
  };
  useWindowListener('resize', handleClose);

  return (
    <Menu as="div" className={clsx(s.dropdown, className)}>
      <MenuButton
        ref={menuButtonRef}
        aria-label={ariaLabel}
        className={s.dropdown__btn}
        disabled={isDisabled}
      >
        {typeof children === 'string' ? (
          <p className={s.dropdown__box}>{children}</p>
        ) : (
          children
        )}
        {typeof iconValue === 'string' ? (
          <Img
            alt={icon?.label || tShared('arrow')}
            className={s.dropdown__icon}
            height={20}
            src={iconValue}
            width={20}
            isSvg
          />
        ) : (
          iconValue
        )}
      </MenuButton>
      <DropdownItems items={items} />
    </Menu>
  );
};
