'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthForm } from '@/features/auth';

import { IProduct } from '@/entities/product';
import { userAtom } from '@/entities/user';

import { Translation } from '@/shared/config';
import { MutationKey, QueryKey } from '@/shared/model';
import { Btn, Popup } from '@/shared/ui';

import { getLeaveReviewFields, ILeaveReviewForm } from '../../model';

import s from './LeaveReview.module.scss';

interface LeaveReviewProps {
  className?: string;
  productId: IProduct['product_id'];
}

export const LeaveReview: FC<LeaveReviewProps> = ({ className, productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const tShared = useTranslations(Translation.Shared);
  const queryClient = useQueryClient();

  const [{ data: userData }] = useAtom(userAtom);
  const user = userData?.data;

  const form = useForm<ILeaveReviewForm>({
    // TODO: remove default values
    defaultValues: {
      rating: 5,
    },
    mode: 'onChange',
  });

  const close = useCallback(() => {
    form.reset();
    setIsOpen(false);
    setSubmissionMessage('');
  }, [form]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    close();
  }, [close, isOpen]);

  const { isPending: isLeaveReviewPending, mutate: leaveReview } = useMutation({
    mutationFn: async (data: ILeaveReviewForm) => {
      if (!user) {
        return;
      }

      const ReviewsService = await import('../../api').then(
        (module) => module.ReviewsService
      );

      await ReviewsService.add({
        comment: data.review,
        firstName: user.firstName,
        lastName: user.lastName,
        product_id: productId,
        rating: data.rating,
        userEmail: user.email,
      });
    },
    mutationKey: [MutationKey.LeaveReview],
    onError: (error) => {
      const errorMessages = {
        default: 'errors.unknown',
      };
      const errorMessage = errorMessages['default'];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.Reviews],
      });

      close();
    },
  });

  return (
    <div className={clsx(s.leaveReview, className)}>
      <Popup
        btn={
          <Btn className={s.leaveReview__btn} asChild>
            <p>{tShared('review.leave-review')}</p>
          </Btn>
        }
        className={s.leaveReview__popup}
        forceOpen={isOpen}
        setForceOpen={setIsOpen}
      >
        <div className={s.leaveReview__body}>
          <h2 className={s.leaveReview__title}>
            {tShared('review.leave-review')}
          </h2>
          <AuthForm
            btns={
              <Btn
                className={s.leaveReview__submit}
                isLoading={isLeaveReviewPending}
                type="submit"
              >
                {tShared('form.submit')}
              </Btn>
            }
            className={s.leaveReview__form}
            fields={getLeaveReviewFields(tShared)}
            formReturn={form}
            submissionMessage={submissionMessage}
            onSubmit={leaveReview}
          />
        </div>
      </Popup>
    </div>
  );
};
