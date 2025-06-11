'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import { StepWizardChildProps } from 'react-step-wizard';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import {
  AuthForm,
  getProfileFields,
  ICredentialsForm,
  IProfileForm
} from '@/features/auth';

import { Pathname, Translation } from '@/shared/config';
import { useInvalidateAtom } from '@/shared/lib';
import { MutationKey, QueryKey } from '@/shared/model';
import { Btn } from '@/shared/ui';

import s from './ProfileForm.module.scss';

interface ProfileFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const ProfileForm: FC<ProfileFormProps> = ({ className }) => {
  const [submissionMessage, setSubmissionMessage] = useState('');
  const { push } = useRouter();

  const tShared = useTranslations(Translation.Shared);
  const invalidateUser = useInvalidateAtom([QueryKey.User]);

  const form = useForm<IProfileForm>({
    mode: 'onChange'
  });

  const { isPending: isRegistrationPending, mutate: registration } =
    useMutation({
      mutationFn: async (data: IProfileForm) => {
        const storedFormData = sessionStorage.getItem(MutationKey.Credentials);
        const parsedFormData: ICredentialsForm | undefined =
          storedFormData && JSON.parse(storedFormData);

        if (!parsedFormData) {
          throw new Error();
        }

        const AuthService = await import('@/features/auth').then(
          module => module.AuthService
        );

        const { email, password } = parsedFormData;

        await AuthService.register({
          email,
          password
        });

        await AuthService.addUserData({
          address: data.address.trim(),
          city: data.city.trim(),
          email,
          firstName: data.name.trim(),
          lastName: data.surname.trim(),
          phone: data.phone.replace(/\s+/g, '')
        });
      },
      mutationKey: [MutationKey.Profile],
      onError: (error: AuthError) => {
        const errorMessages = {
          default: 'errors.unknown'
        };
        const errorMessage =
          errorMessages[error.code as keyof typeof errorMessages] ||
          errorMessages['default'];

        setSubmissionMessage(errorMessage);
        console.warn(error);
      },
      onSuccess: async () => {
        sessionStorage.removeItem(MutationKey.Credentials);
        await invalidateUser();

        push(Pathname.Home);
      }
    });

  return (
    <AuthForm
      btns={
        <Btn
          className={s.profileForm__submit}
          isLoading={isRegistrationPending}
          type="submit"
        >
          {tShared('form.submit')}
        </Btn>
      }
      className={clsx(s.profileForm, className)}
      fields={getProfileFields(tShared)}
      formReturn={form}
      isLoading={isRegistrationPending}
      submissionMessage={submissionMessage}
      onSubmit={registration}
    />
  );
};
