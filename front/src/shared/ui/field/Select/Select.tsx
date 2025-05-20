"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { ILink } from "@/shared/model";

import { Img } from "../../img/Img";

import s from "./Select.module.scss";

interface SelectProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  icon?: ReactNode;
  items: ILink[];
  name: Path<T>;
  options?: RegisterOptions<T>;
}

export const Select = <T extends FieldValues>({
  className,
  formReturn: { register, setValue, watch },
  icon = "/img/icons/form/arrow-down.svg",
  items,
  name,
  options,
  ...props
}: SelectProps<T>): ReactNode => {
  const {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    onChange,
    ...restRegister
  } = register(name, options);

  return (
    <div className={clsx(s.select, className)}>
      <div className={s.select__body}>
        <Listbox
          defaultValue={items[0]}
          disabled={options?.disabled}
          value={watch(name)}
          onChange={(value) => {
            setValue(name, value as PathValue<T, Path<T>>);
          }}
        >
          <ListboxButton
            className={s.select__listbox}
            {...props}
            {...restRegister}
          >
            <p>{watch(name).label}</p>
            {typeof icon === "string" ? (
              <Img
                className={s.select__icon}
                height={20}
                src={icon}
                width={20}
                isSvg
              />
            ) : (
              icon
            )}
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className={s.select__options}
            transition
          >
            {items.map((item) => (
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
