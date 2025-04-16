import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthForm } from "@/features/auth";

import { MutationKey, QueryKey, Translation } from "@/shared/model";
import { Btn, Popup } from "@/shared/ui";

import { getLeaveReviewFields, ILeaveReviewForm } from "../../model";

import s from "./LeaveReview.module.scss";

interface LeaveReviewProps {
  className?: string;
}

export const LeaveReview: FC<LeaveReviewProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const tShared = useTranslations(Translation.Shared);

  const form = useForm<ILeaveReviewForm>({
    // TODO: remove default values
    defaultValues: {
      rating: 5,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      return;
    }

    form.reset();
    setIsOpen(false);
    setSubmissionMessage("");
  }, [form, isOpen]);

  const queryClient = useQueryClient();

  const { isPending: isLeaveReviewPending, mutate: leaveReview } = useMutation({
    // TODO: send review to back
    mutationFn: async (data: ILeaveReviewForm) => {
      if (data) {
        throw data;
      }

      return null;
    },
    mutationKey: [MutationKey.LeaveReview],
    onError: (error) => {
      const errorMessages = {
        default: "errors.unknown",
      };
      const errorMessage = errorMessages["default"];

      setSubmissionMessage(errorMessage);
      console.warn(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Reviews],
      });
    },
  });

  return (
    <div className={clsx(s.leaveReview, className)}>
      <Popup
        btn={
          <Btn className={s.leaveReview__btn}>
            {tShared("review.leave-review")}
          </Btn>
        }
        className={s.leaveReview__popup}
        forceOpen={isOpen}
        setForceOpen={setIsOpen}
      >
        <div className={s.leaveReview__body}>
          <h2 className={s.leaveReview__title}>
            {tShared("review.leave-review")}
          </h2>
          <AuthForm
            btns={
              <>
                <Btn
                  className={s.leaveReview__submit}
                  isLoading={isLeaveReviewPending}
                  type="submit"
                >
                  {tShared("form.submit")}
                </Btn>
              </>
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
