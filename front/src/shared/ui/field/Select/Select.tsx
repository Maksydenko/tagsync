'use client';

import { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn
} from 'react-hook-form';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';

import { Translation } from '@/shared/config';
import { ILink } from '@/shared/model';

import { Img } from '../../img/Img';

import s from './Select.module.scss';

interface SelectProps<T extends FieldValues> {
  ariaLabel?: string;
  className?: string;
  formReturn: UseFormReturn<T>;
  icon?: ILink<ReactNode> | null;
  items: ILink[];
  name: Path<T>;
  options?: RegisterOptions<T>;
}

export const Select = <T extends FieldValues>({
  ariaLabel,
  className,
  formReturn: { register, setValue, watch },
  icon = {
    label: '',
    value: '/img/icons/form/arrow-down.svg'
  },
  items,
  name,
  options,
  ...props
}: SelectProps<T>): ReactNode => {
  const currentValue = watch(name);

  const [localValue, setLocalValue] = useState<ILink>(currentValue);
  const tShared = useTranslations(Translation.Shared);

  const {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    onChange,
    ...restRegister
  } = register(name, options);
  const iconValue = icon?.value;

  return (
    <div className={clsx(s.select, className)}>
      <div className={s.select__body}>
        <Listbox
          defaultValue={currentValue}
          disabled={options?.disabled}
          value={localValue}
          onChange={value => {
            setValue(name, value as PathValue<T, Path<T>>);
            setLocalValue(value);
          }}
        >
          <ListboxButton
            aria-label={ariaLabel}
            className={s.select__btn}
            {...props}
            {...restRegister}
          >
            <p>{localValue.label}</p>
            {typeof iconValue === 'string' ? (
              <Img
                alt={icon?.label || tShared('arrow')}
                className={s.select__icon}
                height={20}
                src={iconValue}
                width={20}
                isSvg
              />
            ) : (
              iconValue
            )}
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className={s.select__options}
            transition
          >
            {items.map(item => (
              <ListboxOption
                key={item.value}
                className={s.select__option}
                value={item}
              >
                {item.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
};
