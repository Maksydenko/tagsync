import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

import { formConfig } from '@/shared/config';
import { IField } from '@/shared/model';

import { IResetPasswordForm } from '../interfaces';

export const getResetPasswordFields = (
  tShared: ReturnType<typeof useTranslations>,
  formReturn: UseFormReturn<IResetPasswordForm>
): IField<IResetPasswordForm>[] => [
    {
      label: tShared('form.password.label'),
      name: 'password',
      options: {
        maxLength: {
          message: tShared('form.password.max', {
            value: formConfig.password.max,
          }),
          value: formConfig.password.max,
        },
        minLength: {
          message: tShared('form.password.min', {
            value: formConfig.password.min,
          }),
          value: formConfig.password.min,
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
          value: formConfig.password.pattern,
        },
        required: tShared('form.password.required'),
      },
      type: 'password',
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
        },
      },
      type: 'password',
    },
  ];
