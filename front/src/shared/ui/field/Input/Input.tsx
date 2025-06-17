'use client';

import { HTMLInputTypeAttribute, ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn
} from 'react-hook-form';

import { Translation } from '@/shared/config';
import { Img } from '@/shared/ui';

import s from './Input.module.scss';

interface InputProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  label?: string;
  name: Path<T>;
  onBlur?: () => void;
  onFocus?: () => void;
  options?: RegisterOptions<T>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
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
  const tShared = useTranslations(Translation.Shared);

  const {
    formState: { errors },
    register
  } = formReturn;
  const { onBlur: handleBlur, ...restRegister } = register(name, options);

  const error = errors[name];
  const disabled = options?.disabled;

  const isPassword = type === 'password';
  const Tag = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={clsx(s.input, className)}>
      <Tag
        aria-invalid={!!error}
        aria-label={label}
        aria-required={!!options?.required}
        autoComplete={name}
        className={s.input__input}
        disabled={disabled}
        id={name}
        placeholder={placeholder}
        type={showPassword ? 'text' : type}
        onBlur={e => {
          handleBlur(e);
          onBlur?.();
        }}
        onFocus={onFocus}
        {...props}
        {...restRegister}
      />
      {isPassword && (
        <button
          aria-label={tShared(`password-${showPassword ? 'closed' : 'opened'}`)}
          className={s.input__btn}
          type="button"
          onClick={() => {
            setShowPassword(prev => !prev);
          }}
        >
          <Img
            alt={tShared(`password-${showPassword ? 'closed' : 'opened'}`)}
            className={s.input__icon}
            height={20}
            src={`/img/icons/form/eye-${
              showPassword ? 'opened' : 'closed'
            }.svg`}
            width={20}
            isSvg
          />
        </button>
      )}
    </div>
  );
};
