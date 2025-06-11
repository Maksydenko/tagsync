'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { StepWizardChildProps } from 'react-step-wizard';

import { useMutation } from '@tanstack/react-query';

import { AuthForm } from '@/features/auth';

import { userAtom } from '@/entities/user';

import { Translation } from '@/shared/config';
import { useInvalidateAtom } from '@/shared/lib';
import { MutationKey, QueryKey } from '@/shared/model';
import { Btn } from '@/shared/ui';

import { getEditUserFields, IEditUserForm } from '../../model';

import s from './EditUserForm.module.scss';

interface EditUserFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const EditUserForm: FC<EditUserFormProps> = ({ className }) => {
  const tShared = useTranslations(Translation.Shared);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const invalidateUser = useInvalidateAtom([QueryKey.User]);
  const [{ data: userData }] = useAtom(userAtom);

  const user = userData?.data;

  const { isPending: isEditUserPending, mutate: editUser } = useMutation({
    mutationFn: async ({
      address,
      city,
      name,
      phone,
      surname
    }: IEditUserForm) => {
      if (!user) {
        return;
      }

      const AuthService = await import('@/features/auth').then(
        module => module.AuthService
      );

      return AuthService.changeUserData({
        address: address.trim(),
        city: city.trim(),
        email: user.email,
        firstName: name.trim(),
        lastName: surname.trim(),
        phone: phone.replace(/\s+/g, '')
      });
    },
    mutationKey: [MutationKey.EditUser],
    onError: error => {
      const errorMessages = {
        default: 'errors.unknown'
      };
      const errorMessage =
        errorMessages[error.message as keyof typeof errorMessages] ||
        errorMessages['default'];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: async () => invalidateUser()
  });

  const form = useForm<IEditUserForm>({
    mode: 'onChange'
  });
  const { reset } = form;

  useEffect(() => {
    if (!user) {
      return;
    }

    const { address, city, email, firstName, lastName, phone } = user;

    reset({
      address,
      city,
      email,
      name: firstName,
      phone,
      surname: lastName
    });
  }, [reset, user]);

  return (
    <AuthForm
      btns={
        <Btn
          className={s.editUserForm__submit}
          isLoading={isEditUserPending}
          type="submit"
        >
          {tShared('form.submit')}
        </Btn>
      }
      className={clsx(s.editUserForm, className)}
      fields={getEditUserFields(tShared)}
      formReturn={form}
      isLoading={isEditUserPending}
      submissionMessage={submissionMessage}
      onSubmit={editUser}
    />
  );
};
