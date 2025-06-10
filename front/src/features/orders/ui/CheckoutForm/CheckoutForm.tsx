'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { StepWizardChildProps } from 'react-step-wizard';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { AuthForm } from '@/features/auth';

import { userAtom } from '@/entities/user';

import { Pathname, Translation } from '@/shared/config';
import { useInvalidateAtom } from '@/shared/lib';
import { MutationKey, QueryKey } from '@/shared/model';
import { Btn } from '@/shared/ui';

import { getCheckoutFields, ICheckoutForm } from '../../model';

import s from './CheckoutForm.module.scss';

interface CheckoutFormProps extends Partial<StepWizardChildProps> {
  className?: string;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ className }) => {
  const [submissionMessage, setSubmissionMessage] = useState('');
  const { push } = useRouter();

  const tShared = useTranslations(Translation.Shared);

  const invalidateCart = useInvalidateAtom([QueryKey.Cart]);
  const [{ data: userData }] = useAtom(userAtom);
  const user = userData?.data;

  const { isPending: isCheckoutPending, mutate: checkout } = useMutation({
    mutationFn: async ({
      address,
      city,
      name,
      phone,
      surname,
    }: ICheckoutForm) => {
      if (!user) {
        return;
      }

      const OrdersService = await import('@/features/orders').then(
        (module) => module.OrdersService
      );

      return OrdersService.checkout({
        address: address.trim(),
        city: city.trim(),
        fullName: [name.trim(), surname.trim()].join(' '),
        phone: phone.replace(/\s+/g, ''),
        userEmail: user?.email.trim(),
      });
    },
    mutationKey: [MutationKey.Checkout],
    onError: (error: AuthError) => {
      const errorMessages = {
        default: 'errors.unknown',
      };
      const errorMessage =
        errorMessages[error.code as keyof typeof errorMessages] ||
        errorMessages['default'];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: async () => {
      await invalidateCart();
      push(Pathname.Orders);
    },
  });

  const form = useForm<ICheckoutForm>({
    mode: 'onChange',
  });
  const { reset } = form;

  useEffect(() => {
    if (!user) {
      return;
    }

    const { address, city, firstName, lastName, phone } = user;

    reset({
      address,
      city,
      name: firstName,
      phone,
      surname: lastName,
    });
  }, [reset, user]);

  return (
    <AuthForm
      btns={
        <Btn
          className={s.checkoutForm__submit}
          isLoading={isCheckoutPending}
          type="submit"
        >
          {tShared('form.submit')}
        </Btn>
      }
      className={clsx(s.checkoutForm, className)}
      fields={getCheckoutFields(tShared)}
      formReturn={form}
      isLoading={isCheckoutPending}
      submissionMessage={submissionMessage}
      onSubmit={checkout}
    />
  );
};
