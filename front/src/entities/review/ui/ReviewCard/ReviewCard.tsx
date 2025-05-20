"use client";

import { FC } from "react";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { formatDate } from "@/shared/model";
import { Rating } from "@/shared/ui";

import { IReview } from "../../api";

import s from "./ReviewCard.module.scss";

interface ReviewCardProps {
  className?: string;
  review: IReview;
}

export const ReviewCard: FC<ReviewCardProps> = ({ className, review }) => {
  const form = useForm({
    defaultValues: {
      rating: review.rating,
    },
  });

  return (
    <div className={clsx(s.reviewCard, className)}>
      <div className={s.reviewCard__body}>
        <div className={s.reviewCard__header}>
          <h3 className={s.reviewCard__title}>{review.userEmail}</h3>
          <p className={s.reviewCard__date}>
            {formatDate({
              date: new Date(review.createdAt),
            })}
          </p>
        </div>
        <Rating
          className={s.reviewCard__rating}
          formReturn={form}
          name="rating"
          options={{
            disabled: true,
          }}
        />
        <div className={s.reviewCard__text}>
          <p>{review.comment}</p>
        </div>
      </div>
    </div>
  );
};
