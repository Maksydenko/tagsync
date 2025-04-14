import { useTranslations } from "next-intl";

import { formConfig } from "@/shared/config";
import { IField } from "@/shared/model";

import { IResetPasswordForm } from "../interfaces";

export const getResetPasswordFields = (
  tShared: ReturnType<typeof useTranslations>
): IField<IResetPasswordForm>[] => {
  return [
    {
      label: tShared("form.email.label"),
      name: "email",
      options: {
        maxLength: {
          message: tShared("form.email.max", {
            value: formConfig.email.max,
          }),
          value: formConfig.email.max,
        },
        pattern: {
          message: tShared("form.email.pattern"),
          value: formConfig.email.pattern,
        },
        required: tShared("form.email.required"),
      },
      type: "email",
    },
  ];
};
