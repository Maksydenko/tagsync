'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import { StepWizardChildProps } from 'react-step-wizard';

import { useMutation } from '@tanstack/react-query';

import {
  AuthForm,
  getCredentialsFields,
  ICredentialsForm
} from '@/features/auth';

import { Pathname, Translation } from '@/shared/config';
import { ErrorCode, MutationKey } from '@/shared/model';
import { Btn } from '@/shared/ui';

import s from './CredentialsForm.module.scss';

interface CredentialsFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const CredentialsForm: FC<CredentialsFormProps> = ({
  className,
  nextStep
}) => {
  const [submissionMessage, setSubmissionMessage] = useState('');
  const tShared = useTranslations(Translation.Shared);

  const storedFormData = sessionStorage.getItem(MutationKey.Credentials);
  const parsedFormData: ICredentialsForm | undefined =
    storedFormData && JSON.parse(storedFormData);

  const form = useForm<ICredentialsForm>({
    defaultValues: parsedFormData,
    mode: 'onChange'
  });

  const { isPending: isRegisterPending, mutate: register } = useMutation({
    mutationFn: async (data: ICredentialsForm) => {
      const { AuthService } = await import('@/features/auth');
      const response = await AuthService.checkEmailExists(data.email);

      if (response.data.exists) {
        throw new Error(ErrorCode.UserAlreadyExists);
      }

      return data;
    },
    mutationKey: [MutationKey.Credentials],
    onError: error => {
      const errorMessages = {
        default: 'errors.unknown',
        [ErrorCode.UserAlreadyExists]: 'errors.user-already-exists'
      };
      const errorMessage =
        errorMessages[error.message as keyof typeof errorMessages] ||
        errorMessages['default'];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: data => {
      sessionStorage.setItem(MutationKey.Credentials, JSON.stringify(data));

      setSubmissionMessage('');
      nextStep?.();
    }
  });

  return (
    <AuthForm
      btns={
        <>
          <Btn
            className={s.credentialsForm__submit}
            isLoading={isRegisterPending}
            type="submit"
          >
            {tShared('form.submit')}
          </Btn>
          <Link
            className={s.credentialsForm__link}
            href={Pathname.ResetPassword}
          >
            {tShared('forgot-password')}
          </Link>
        </>
      }
      className={clsx(s.credentialsForm, className)}
      fields={getCredentialsFields(tShared, form)}
      formReturn={form}
      isLoading={isRegisterPending}
      submissionMessage={submissionMessage}
      onSubmit={register}
    />
  );
};
