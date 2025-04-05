"use client";

import { KeyboardEvent, ReactNode, useState } from "react";
import { clsx } from "clsx";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import s from "./Checkbox.module.scss";

interface CheckboxProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  label?: string;
  name: Path<T>;
  options?: RegisterOptions<T>;
}

export const Checkbox = <T extends FieldValues>({
  className,
  formReturn,
  label,
  name,
  options,
  ...props
}: CheckboxProps<T>): ReactNode => {
  const [isFocused, setIsFocused] = useState(false);

  const TRIGGERED_KEYS = ["Enter", " "];

  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = formReturn;
  const isChecked = watch(name);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!TRIGGERED_KEYS.includes(e.key)) {
      return;
    }

    setValue(name, !isChecked as PathValue<T, Path<T>>);
  };

  return (
    <div
      className={clsx(
        s.checkbox,
        isFocused && s.checkbox_focused,
        errors[name] && s.checkbox_error,
        className
      )}
    >
      <input
        {...register(name, options)}
        {...props}
        id={name}
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onKeyDown={handleKeyDown}
      />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
};
