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
  formReturn: UseFormReturn<T>;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: string;
  message?: string;
  name: Path<T>;
  options?: RegisterOptions<T>;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
}

export const Field = <T extends FieldValues>({
  className,
  formReturn,
  isDisabled,
  isRequired,
  label,
  name,
  options,
  placeholder,
  type,
  ...props
}: FieldProps<T>): ReactNode => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    formState: { errors },
  } = formReturn;

  const formattedLabel = label && formatLabel(label, isRequired);
  const formattedPlaceholder =
    placeholder && formatLabel(placeholder, isRequired);
  const currentError = errors[name];

  let field;

  switch (type) {
    case "checkbox":
      return (
        <Checkbox
          className={className}
          formReturn={formReturn}
          label={formattedLabel}
          name={name}
          options={options}
          {...props}
        />
      );
    case "tel":
      field = (
        <Phone
          formReturn={formReturn}
          name={name}
          options={options}
          placeholder={formattedPlaceholder}
          {...props}
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
        currentError && s.field_error,
        isFocused && s.field_focused,
        isDisabled && s.field_disabled,
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
        {typeof currentError?.message === "string" && (
          <span className={s.field__error}>{currentError.message}</span>
        )}
      </div>
    </div>
  );
};
