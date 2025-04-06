"use client";

import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { clsx } from "clsx";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import { formatLabel } from "./formatLabel.util";

import { Checkbox } from "./Checkbox/Checkbox";
import { Input } from "./Input/Input";
import { Phone } from "./Phone/Phone";

import s from "./Field.module.scss";

interface FieldProps<T extends FieldValues> {
  className?: string;
  disabled?: boolean;
  formReturn: UseFormReturn<T>;
  label?: string;
  message?: string;
  name: Path<T>;
  options?: RegisterOptions<T>;
  placeholder?: string;
  required?: boolean;
  type: HTMLInputTypeAttribute;
}

export const Field = <T extends FieldValues>({
  className,
  disabled,
  formReturn,
  label,
  name,
  options,
  placeholder,
  required,
  type,
  ...props
}: FieldProps<T>): ReactNode => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    formState: { errors },
  } = formReturn;
  const error = errors[name];

  const formattedLabel = label && formatLabel(label, required);
  const formattedPlaceholder =
    placeholder && formatLabel(placeholder, required);

  let field;

  switch (type) {
    case "checkbox":
      return (
        <Checkbox
          {...props}
          className={className}
          formReturn={formReturn}
          label={formattedLabel}
          name={name}
          options={options}
        />
      );
    case "tel":
      field = (
        <Phone
          {...props}
          formReturn={formReturn}
          label={formattedLabel}
          name={name}
          options={options}
          placeholder={formattedPlaceholder}
        />
      );
      break;
    default:
      field = (
        <Input
          {...props}
          formReturn={formReturn}
          label={formattedLabel}
          name={name}
          options={options}
          placeholder={formattedPlaceholder}
          type={type}
          onBlur={() => {
            setIsFocused(false);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
        />
      );
      break;
  }

  return (
    <div
      className={clsx(
        s.field,
        error && s.field_error,
        isFocused && s.field_focused,
        disabled && s.field_disabled,
        className
      )}
    >
      <div className={s.field__body}>
        {label && (
          <label className={s.field__label} htmlFor={name}>
            {formattedLabel}
          </label>
        )}
        {field}
        {typeof error?.message === "string" && (
          <span className={s.field__error}>{error.message}</span>
        )}
      </div>
    </div>
  );
};
