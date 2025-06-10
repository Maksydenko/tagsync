import { FC } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LoginForm } from '@/features/auth';

import { Pathname, Translation } from '@/shared/config';
import { Btn } from '@/shared/ui';

import s from './Login.module.scss';

export const Login: FC = () => {
  const tShared = useTranslations(Translation.Shared);
  const tLogin = useTranslations(Translation.Login);

  return (
    <div className={s.loginPage}>
      <section className={s.login}>
        <div className={s.login__container}>
          <div className={s.login__body}>
            <div className={s.login__content}>
              <div className={s.login__box}>
                <h2 className={s.login__title}>{tLogin('title')}</h2>
                <LoginForm className={s.login__form} />
              </div>
            </div>
            <div className={s.login__content}>
              <div className={s.login__box}>
                <h2 className={s.login__title}>
                  {tLogin('registration.title')}
                </h2>
                <div className={s.login__text}>
                  <p>{tLogin('registration.text')}</p>
                </div>
              </div>
              <Btn asChild>
                <Link className={s.login__btn} href={Pathname.Registration}>
                  {tShared('continue')}
                </Link>
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
