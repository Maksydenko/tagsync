'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { Pathname, Translation } from '@/shared/config';
import { Img } from '@/shared/ui';

import { Copyright } from './Copyright/Copyright';

import s from './Footer.module.scss';

const FooterList = dynamic(() =>
  import('./FooterList').then(module => module.FooterList)
);

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);

  return (
    <footer className={clsx(s.footer, className)}>
      <div className={s.footer__body}>
        <div className={s.footer__container}>
          <div className={s.footer__content}>
            <div className={s.footer__box}>
              <Link className={s.footer__logo} href={Pathname.Home}>
                <Img
                  alt={`${tShared('logo')} "TagSync"`}
                  className={s.footer__img}
                  height={35}
                  src="/img/logos/logo.png"
                  width={70}
                  isSvg
                />
                <p>TagSync</p>
              </Link>
              <div className={s.footer__text}>
                <p>{tShared('footer.text')}</p>
              </div>
            </div>
            <div className={s.footer__box}>
              <h6 className={s.footer__title}>
                {tShared('pathnames.categories')}
              </h6>
              <FooterList />
            </div>
          </div>
        </div>
        <Copyright className={s.footer__copyright} />
      </div>
    </footer>
  );
};
