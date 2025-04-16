"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

import { LeaveReview } from "@/features/review";

import { IReview, ReviewCard } from "@/entities/review";

import { Translation } from "@/shared/model";

import s from "./Reviews.module.scss";

// TODO: handle real reviews
const reviewsData: IReview[] = Array.from(
  {
    length: 10,
  },
  (_, index) => ({
    date: new Date(),
    id: index,
    name: "Lorem Ipsum",
    rating: 3.5,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime hic minus fugiat repudiandae officiis quisquam rem optio explicabo possimus perferendis nam, tenetur at dolorum dolorem quo quam, cumque quidem placeat.",
  })
);

interface ReviewsProps {
  className?: string;
}

export const Reviews: FC<ReviewsProps> = ({ className }) => {
  const tProduct = useTranslations(Translation.Product);

  return (
    <div className={clsx(s.reviews, className)}>
      <div className={s.reviews__body}>
        <div className={s.reviews__header}>
          <h2 className={s.reviews__title}>
            {tProduct("reviews")} ({reviewsData.length})
          </h2>
          <LeaveReview />
        </div>
        <ul className={s.reviews__list}>
          {reviewsData.map((review) => {
            return (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
