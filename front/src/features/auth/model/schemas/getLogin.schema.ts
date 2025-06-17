import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import { z } from 'zod';

import { formConfig } from '@/shared/config';
import { checkValidTld } from '@/shared/model';

export const getLoginZodSchema = (
  tShared: ReturnType<typeof useTranslations>
) =>
  z.object({
    email: z
      .string({
        required_error: tShared('form.email.required')
      })
      .max(
        formConfig.email.max,
        tShared('form.email.max', {
          value: formConfig.email.max
        })
      )
      .regex(formConfig.email.pattern, tShared('form.email.pattern'))
      .refine(checkValidTld, {
        message: tShared('form.email.pattern')
      }),
    password: z
      .string({
        required_error: tShared('form.password.required')
      })
      .min(
        formConfig.password.min,
        tShared('form.password.min', {
          value: formConfig.password.min
        })
      )
      .max(
        formConfig.password.max,
        tShared('form.password.max', {
          value: formConfig.password.max
        })
      )
      .regex(formConfig.password.pattern, tShared('form.password.pattern'))
  });

export const getLoginYupSchema = (
  tShared: ReturnType<typeof useTranslations>
) =>
  yup.object().shape({
    email: yup
      .string()
      .required(tShared('form.email.required'))
      .max(
        formConfig.email.max,
        tShared('form.email.max', {
          value: formConfig.email.max
        })
      )
      .matches(formConfig.email.pattern, tShared('form.email.pattern'))
      .test('is-valid-tld', tShared('form.email.pattern'), checkValidTld),
    password: yup
      .string()
      .required(tShared('form.password.required'))
      .min(
        formConfig.password.min,
        tShared('form.password.min', {
          value: formConfig.password.min
        })
      )
      .max(
        formConfig.password.max,
        tShared('form.password.max', {
          value: formConfig.password.max
        })
      )
      .matches(formConfig.password.pattern, tShared('form.password.pattern'))
  });
