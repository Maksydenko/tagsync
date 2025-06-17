import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import { z } from 'zod';

import { formConfig } from '@/shared/config';
import { checkValidTld } from '@/shared/model';

export const getCredentialsZodSchema = (
  tShared: ReturnType<typeof useTranslations>
) =>
  z
    .object({
      confirmPassword: z.string(),
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
    })
    .superRefine((data, ctx) => {
      if (!data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tShared('form.confirmPassword.required'),
          path: ['confirmPassword']
        });
      }

      if (data.confirmPassword !== data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tShared('form.confirmPassword.pattern'),
          path: ['confirmPassword']
        });
      }
    });

export const getCredentialsYupSchema = (
  tShared: ReturnType<typeof useTranslations>
) =>
  yup
    .object({
      confirmPassword: yup
        .string()
        .required(tShared('form.confirmPassword.required'))
        .oneOf([yup.ref('password')], tShared('form.confirmPassword.pattern')),
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
    })
    .required();
