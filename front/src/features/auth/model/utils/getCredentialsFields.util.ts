import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

import { formConfig } from '@/shared/config';
import { checkValidTld, IField } from '@/shared/model';

import { ICredentialsForm } from '../interfaces';

export const getCredentialsFields = (
  tShared: ReturnType<typeof useTranslations>,
  formReturn: UseFormReturn<ICredentialsForm>
): IField<ICredentialsForm>[] => [
  {
    label: tShared('form.email.label'),
    name: 'email',
    options: {
      maxLength: {
        message: tShared('form.email.max', {
          value: formConfig.email.max
        }),
        value: formConfig.email.max
      },
      pattern: {
        message: tShared('form.email.pattern'),
        value: formConfig.email.pattern
      },
      required: tShared('form.email.required'),
      validate: (value: string) =>
        checkValidTld(value) || tShared('form.email.pattern')
    },
    type: 'email'
  },
  {
    label: tShared('form.password.label'),
    name: 'password',
    options: {
      maxLength: {
        message: tShared('form.password.max', {
          value: formConfig.password.max
        }),
        value: formConfig.password.max
      },
      minLength: {
        message: tShared('form.password.min', {
          value: formConfig.password.min
        }),
        value: formConfig.password.min
      },
      onChange: () => {
        const { getValues, trigger } = formReturn;

        if (!getValues('confirmPassword')) {
          return;
        }

        trigger?.('confirmPassword');
      },
      pattern: {
        message: tShared('form.password.pattern'),
        value: formConfig.password.pattern
      },
      required: tShared('form.password.required')
    },
    type: 'password'
  },
  {
    label: tShared('form.confirmPassword.label'),
    name: 'confirmPassword',
    options: {
      required: tShared('form.confirmPassword.required'),
      validate: (value, formValues) => {
        if (!formValues.password) {
          return;
        }

        return (
          value === formValues.password ||
          tShared('form.confirmPassword.pattern')
        );
      }
    },
    type: 'password'
  }
];
