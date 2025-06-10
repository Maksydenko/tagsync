'use client';

import { HTMLInputTypeAttribute, ReactNode, useState } from 'react';
import { clsx } from 'clsx';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from 'react-hook-form';

import { ILink } from '@/shared/model';

import { formatLabel } from './formatLabel.util';

import { Checkbox } from './Checkbox/Checkbox';
import { Input } from './Input/Input';
import { Phone } from './Phone/Phone';
import { Range } from './Range/Range';
import { Rating } from './Rating/Rating';
import { Select } from './Select/Select';

import s from './Field.module.scss';

interface FieldProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  items?: ILink[];
  label?: string;
  message?: string;
  name: Path<T>;
  options?: RegisterOptions<T>;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const Field = <T extends FieldValues>({
  className,
  formReturn,
  items = [],
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
    case 'checkbox':
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
    case 'range':
    case 'ranges':
      field = (
        <Range
          {...props}
          formReturn={formReturn}
          name={name}
          options={options}
          {...(type === 'ranges' && {
            range: true,
          })}
        />
      );
      break;
    case 'rating':
      field = (
        <Rating
          {...props}
          formReturn={formReturn}
          name={name}
          options={options}
        />
      );
      break;
    case 'select':
      field = (
        <Select {...props} formReturn={formReturn} items={items} name={name} />
      );
      break;
    case 'tel':
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
        options?.disabled && s.field_disabled,
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
        {typeof error?.message === 'string' && (
          <p className={s.field__error}>{error.message}</p>
        )}
      </div>
    </div>
  );
};
