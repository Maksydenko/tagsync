import { FC } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Translation } from '@/shared/config';
import { ILink, ILinkWithIcon } from '@/shared/model';
import { Collapse, Dropdown, Img } from '@/shared/ui';

import s from '../Menu.module.scss';

interface MenuItemProps {
  link: ILink<ILinkWithIcon[] | string>;
  onClick?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
  link: { label, value },
  onClick
}) => {
  const tShared = useTranslations(Translation.Shared);
  const translatedLabel = tShared(`pathnames.${label}`);

  const isLink = typeof value === 'string';
  const Tag = isLink ? Link : 'div';

  return (
    <li className={s.menu__item}>
      {isLink ? (
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        /* @ts-ignore */
        <Tag
          className={s.menu__link}
          onClick={onClick}
          {...(isLink && {
            href: value
          })}
        >
          {translatedLabel}
        </Tag>
      ) : (
        <>
          <Dropdown
            className={s.menu__dropdown}
            items={value.map(item => ({
              icon: item?.icon,
              label: item.label,
              value: item.value
            }))}
          >
            {translatedLabel}
          </Dropdown>
          <Collapse btn={translatedLabel} className={s.menu__collapse}>
            <ul className={s.menu__subList}>
              {value.map(item => (
                <li key={item.label} className={s.menu__subItem}>
                  <Link className={s.menu__subLink} href={`/${item.value}`}>
                    <p>{item.label}</p>
                    <Img
                      alt={item.label}
                      className={s.menu__subIcon}
                      src={item.icon}
                      isSvg
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Collapse>
        </>
      )}
    </li>
  );
};
