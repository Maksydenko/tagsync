"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { LeaveReview } from "@/features/reviews";

import { IProduct } from "@/entities/product";
import { IReview, ReviewCard } from "@/entities/review";

import { Translation } from "@/shared/model";

import s from "./Reviews.module.scss";

interface ReviewsProps {
  className?: string;
  productId: IProduct["product_id"];
  reviewsData: IReview[];
}

export const Reviews: FC<ReviewsProps> = ({
  className,
  productId,
  reviewsData,
}) => {
  const tProduct = useTranslations(Translation.Product);

  return (
    <div className={clsx(s.reviews, className)}>
      <div className={s.reviews__body}>
        <div className={s.reviews__header}>
          <h2 className={s.reviews__title}>
            {tProduct("reviews")} ({reviewsData.length})
          </h2>
          <LeaveReview productId={productId} />
        </div>
        {!!reviewsData.length && (
          <ul className={s.reviews__list}>
            {reviewsData.map((review) => (
                <li key={review.id}>
                  <ReviewCard review={review} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
