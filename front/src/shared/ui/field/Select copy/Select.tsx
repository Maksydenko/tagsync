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
import RootSelect, { OptionProps } from "react-select";

import { ILink } from "@/shared/model";

import { Img } from "../../img/Img";

import s from "./Select.module.scss";

interface SelectProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  icon?: ReactNode;
  isLoading?: boolean;
  items: ILink[];
  name: Path<T>;
  options?: RegisterOptions<T>;
}

export const Select = <T extends FieldValues>({
  className,
  formReturn: { register, setValue, watch },
  icon = "/img/icons/form/arrow-down.svg",
  isLoading,
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
        <RootSelect
          className={s.select__select}
          classNamePrefix="select"
          defaultValue={watch(name)}
          isDisabled={options?.disabled}
          isLoading={isLoading}
          isSearchable={false}
          options={items as OptionProps["options"]}
          onChange={(value) => {
            setValue(name, value as PathValue<T, Path<T>>);
          }}
          {...props}
          {...restRegister}
        />
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
      </div>
    </div>
  );
};
