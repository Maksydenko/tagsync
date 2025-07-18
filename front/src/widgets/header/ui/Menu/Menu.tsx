import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import { Cart } from '@/entities/cart';
import { categoriesAtom } from '@/entities/product';
import { User } from '@/entities/user';

import { Locale, Translation } from '@/shared/config';
import { LocaleSwitcher, ThemeSwitcher } from '@/shared/ui';

import { menuData } from '../../model';

import { Search } from '../Search/Search';
import { MenuItems } from './MenuItems/MenuItems';

import s from './Menu.module.scss';

interface MenuProps {
  breakpoint: number;
  className?: string;
  isScrollLocked: boolean;
  onClick: () => void;
}

export const Menu: FC<MenuProps> = ({ className, isScrollLocked, onClick }) => {
  const locale = useLocale() as Locale;
  const tShared = useTranslations(Translation.Shared);

  const [{ data: categoriesData }] = useAtom(categoriesAtom);

  const elements = (
    <div className={s.menu__elements}>
      <Search className={s.menu__search} />
      <Cart className={s.menu__cart} />
    </div>
  );

  return (
    <div className={clsx(s.menu, className)}>
      <button
        aria-label={tShared(
          `header.menu.${isScrollLocked ? 'close' : 'open'}-menu`
        )}
        className={clsx(
          s.menu__button,
          isScrollLocked && s.menu__button_active
        )}
        type="button"
        onClick={onClick}
      >
        <span />
      </button>
      <div
        className={clsx(s.menu__body, isScrollLocked && s.menu__body_active)}
      >
        <nav className={s.menu__content}>
          <ul className={s.menu__list}>
            <MenuItems
              links={[
                ...menuData,
                {
                  label: 'categories',
                  value:
                    categoriesData?.data?.map(category => ({
                      icon: category.img,
                      label: category.translations_slug[locale],
                      value: category.slug
                    })) || []
                }
              ]}
              onClick={onClick}
            />
          </ul>
          <LocaleSwitcher className={s.menu__localeSwitcher} />
          <ThemeSwitcher />
          {elements}
        </nav>
      </div>
      {elements}
      <User
        className={s.menu__user}
        {...(isScrollLocked && {
          onClick
        })}
      />
    </div>
  );
};
