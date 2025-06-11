'use client';

import { KeyboardEvent, ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn
} from 'react-hook-form';

import { Translation } from '@/shared/config';

import { Img } from '../../img/Img';

import s from './Checkbox.module.scss';

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
  const TRIGGERED_KEYS = ['Enter', ' '];

  const [isFocused, setIsFocused] = useState(false);
  const tShared = useTranslations(Translation.Shared);

  const {
    formState: { errors },
    register,
    setValue,
    watch
  } = formReturn;

  const error = errors[name];
  const { onBlur: handleBlur, ...restRegister } = register(name, options);
  const isChecked = watch(name);

  const disabled = options?.disabled;

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
        error && s.checkbox_error,
        className
      )}
    >
      <input
        aria-invalid={!!error}
        aria-label={label}
        aria-required={!!options?.required}
        disabled={disabled}
        id={name}
        type="checkbox"
        onBlur={e => {
          setIsFocused(false);
          handleBlur?.(e);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onKeyDown={handleKeyDown}
        {...props}
        {...restRegister}
      />
      {label && (
        <label htmlFor={name}>
          <Img
            alt={tShared('checkmark')}
            className={s.checkbox__icon}
            height={20}
            src="/img/icons/form/checkmark.svg"
            width={20}
            isSvg
          />
          {label}
        </label>
      )}
    </div>
  );
};
