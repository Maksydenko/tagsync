'use client';

import { FC, KeyboardEventHandler } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx';

import { handleArrowFocus, ILink, useMounted } from '@/shared/model';
import { Img } from '@/shared/ui';

import s from '../ThemeSwitcher.module.scss';

interface ThemeItemProps {
  theme: ILink;
}

export const ThemeItem: FC<ThemeItemProps> = ({ theme: { label, value } }) => {
  const tShared = useTranslations('shared');
  const { setTheme, theme } = useTheme();

  const isMounted = useMounted();

  const isChecked = theme === value;
  const id = `${value}-theme`;

  const switchTheme = () => {
    if (isChecked) {
      return;
    }

    setTheme(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLLabelElement> = e => {
    const { key } = e;

    if (key === 'Enter' || key === ' ') {
      switchTheme();

      return;
    }

    handleArrowFocus({
      e,
      selector: `.${s.themeSwitcher__label}`
    });
  };

  return (
    <>
      <input
        aria-label={tShared(`themes.${value}`)}
        checked={isMounted && isChecked}
        className={s.themeSwitcher__input}
        data-testid={`${id}-input`}
        id={id}
        type="radio"
        onChange={switchTheme}
      />
      <label
        className={clsx(
          s.themeSwitcher__label,
          isMounted && isChecked && s.themeSwitcher__label_checked
        )}
        data-testid={`${id}-label`}
        htmlFor={id}
        {...(isMounted && {
          onKeyDown: handleKeyDown,
          tabIndex: 0
        })}
      >
        <Img
          alt={tShared(`themes.${value}`)}
          className={s.themeSwitcher__img}
          height={20}
          src={label}
          width={20}
          isSvg
        />
      </label>
    </>
  );
};
