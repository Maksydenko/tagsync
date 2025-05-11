import { useTranslations } from "next-intl";

import { formConfig } from "@/shared/config";
import { IField } from "@/shared/model";

import { ILoginForm } from "../interfaces";

export const getLoginFields = (
  tShared: ReturnType<typeof useTranslations>
): IField<ILoginForm>[] => [
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
    {
      label: tShared("form.password.label"),
      name: "password",
      options: {
        maxLength: {
          message: tShared("form.password.max", {
            value: formConfig.password.max,
          }),
          value: formConfig.password.max,
        },
        minLength: {
          message: tShared("form.password.min", {
            value: formConfig.password.min,
          }),
          value: formConfig.password.min,
        },
        pattern: {
          message: tShared("form.password.pattern"),
          value: formConfig.password.pattern,
        },
        required: tShared("form.password.required"),
      },
      type: "password",
    },
  ];
