import { useTranslations } from "next-intl";

import { formConfig } from "@/shared/config";
import { IField } from "@/shared/model";

import { IProfileForm } from "../interfaces";

export const getProfileFields = (
  tShared: ReturnType<typeof useTranslations>
): IField<IProfileForm>[] => {
  return [
    {
      label: tShared("form.name.label"),
      name: "name",
      options: {
        minLength: {
          message: tShared("form.name.min", {
            value: formConfig.name.min,
          }),
          value: formConfig.name.min,
        },
        pattern: {
          message: tShared("form.name.pattern"),
          value: formConfig.name.pattern,
        },
        required: tShared("form.name.required"),
      },
      type: "text",
    },
    {
      label: tShared("form.surname.label"),
      name: "surname",
      options: {
        minLength: {
          message: tShared("form.surname.min", {
            value: formConfig.name.min,
          }),
          value: formConfig.name.min,
        },
        pattern: {
          message: tShared("form.surname.pattern"),
          value: formConfig.name.pattern,
        },
        required: tShared("form.surname.required"),
      },
      type: "text",
    },
    {
      label: tShared("form.phone.label"),
      name: "phone",
      options: {
        maxLength: {
          message: tShared("form.phone.pattern", {
            value: formConfig.phone.max,
          }),
          value: formConfig.phone.max,
        },
        pattern: {
          message: tShared("form.phone.pattern"),
          value: formConfig.phone.pattern,
        },
        required: tShared("form.phone.required"),
      },
      type: "phone",
    },
  ];
};
