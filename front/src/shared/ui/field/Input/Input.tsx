import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { clsx } from "clsx";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import { Img } from "@/shared/ui";

import s from "./Input.module.scss";

interface InputProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  label?: string;
  name: Path<T>;
  onBlur?: () => void;
  onFocus?: () => void;
  options?: RegisterOptions<T>;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
}

export const Input = <T extends FieldValues>({
  className,
  formReturn,
  label,
  name,
  onBlur,
  onFocus,
  options,
  placeholder,
  type,
  ...props
}: InputProps<T>): ReactNode => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors },
    register,
  } = formReturn;

  const error = errors[name];
  const { onBlur: handleBlur, ...restRegister } = register(name, options);

  const disabled = options?.disabled;
  const required = options?.required;

  const isPassword = type === "password";
  const Tag = type === "textarea" ? "textarea" : "input";

  return (
    <div className={clsx(s.input, className)}>
      <Tag
        aria-disabled={!!disabled}
        aria-invalid={!!error}
        aria-label={label}
        aria-placeholder={placeholder}
        aria-required={!!required}
        autoComplete={name}
        className={s.input__input}
        disabled={disabled}
        id={name}
        placeholder={placeholder}
        required={!!required}
        type={showPassword ? "text" : type}
        onBlur={(e) => {
          handleBlur(e);
          onBlur?.();
        }}
        onFocus={onFocus}
        {...props}
        {...restRegister}
      />
      {isPassword && (
        <button
          className={s.input__btn}
          type="button"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          <Img
            className={s.input__icon}
            height={20}
            src={`/img/icons/form/eye-${
              showPassword ? "opened" : "closed"
            }.svg`}
            width={20}
            isSvg
          />
        </button>
      )}
    </div>
  );
};
