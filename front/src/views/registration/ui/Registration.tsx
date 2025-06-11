'use client';

import { FC, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import StepWizard, { StepWizardChildProps } from 'react-step-wizard';

import { Pathname, Translation } from '@/shared/config';
import { useMounted } from '@/shared/model';
import { Btn, Loader } from '@/shared/ui';

import { useChangeStep, useCreateSteps } from '../model';

import { Stepper } from './Stepper/Stepper';

import s from './Registration.module.scss';

export const Registration: FC = () => {
  const stepWizardRef = useRef<null | StepWizardChildProps>(null);

  const tShared = useTranslations(Translation.Shared);
  const tRegistration = useTranslations(Translation.Registration);

  const isMounted = useMounted();

  const { currentStep, defaultStep, handleStepChange } =
    useChangeStep(stepWizardRef);
  const steps = useCreateSteps();

  return (
    <section className={s.registrationPage}>
      <div className={s.registration__container}>
        <div className={s.registration__body}>
          <div className={s.registration__content}>
            <div className={s.registration__box}>
              <h2 className={s.registration__title}>
                {tRegistration('title')}
              </h2>
              {isMounted ? (
                <StepWizard
                  className={s.registration__stepWizard}
                  initialStep={defaultStep}
                  instance={wizard =>
                    (stepWizardRef.current = wizard as StepWizardChildProps)
                  }
                  nav={
                    <Stepper
                      className={s.registration__stepper}
                      current={currentStep}
                      stepsLength={steps.length}
                      onChange={handleStepChange}
                    />
                  }
                  onStepChange={e => handleStepChange(--e.activeStep)}
                >
                  {steps}
                </StepWizard>
              ) : (
                <Loader className={s.registration__loader} />
              )}
            </div>
          </div>
          <div className={s.registration__content}>
            <div className={s.registration__box}>
              <h2 className={s.registration__title}>
                {tRegistration('login.title')}
              </h2>
              <div className={s.registration__text}>
                <p>{tRegistration('login.text')}</p>
              </div>
            </div>
            <Btn asChild>
              <Link className={s.registration__btn} href={Pathname.Login}>
                {tShared('continue')}
              </Link>
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
};
