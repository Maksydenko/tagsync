import { useTranslations } from "next-intl";

import { IField } from "@/shared/model";

import { ILeaveReviewForm } from "../interfaces";

export const getLeaveReviewFields = (
  tShared: ReturnType<typeof useTranslations>
): IField<ILeaveReviewForm>[] => {
  return [
    {
      name: "rating",
      options: {
        required: tShared("form.review.required"),
      },
      type: "rating",
    },
    {
      label: tShared("form.review.label"),
      name: "review",
      options: {
        required: tShared("form.review.required"),
      },
      type: "textarea",
    },
  ];
};
