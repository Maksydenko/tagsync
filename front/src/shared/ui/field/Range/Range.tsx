"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";
import Slider, { SliderProps } from "rc-slider";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import { formatNumber } from "@/shared/model";

import "rc-slider/assets/index.css";
import s from "./Range.module.scss";

interface RangeProps<T extends FieldValues> extends SliderProps {
  className?: string;
  formReturn: UseFormReturn<T>;
  name: Path<T>;
  options?: RegisterOptions<T>;
}

export const Range = <T extends FieldValues>({
  className,
  formReturn,
  name,
  options,
  ...props
}: RangeProps<T>): ReactNode => {
  const { register, setValue, watch } = formReturn;
  const {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    max: registerMax,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    min: registerMin,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    onBlur,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    onChange,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    ref,
    ...restRegister
  } = register(name, options);

  const defaultMin = options?.min;
  const defaultMax = options?.max;

  const watchedValue = watch(name);

  const min = watchedValue?.[0] ?? defaultMin;
  const max = watchedValue?.[1] ?? defaultMax;

  return (
    <div className={clsx(s.range, className)}>
      <div className={s.range__body}>
        <div className={s.range__content}>
          <p className={s.range__label}>
            {formatNumber({
              number: min,
            })}
          </p>
          <p className={s.range__label}>
            {formatNumber({
              number: max,
            })}
          </p>
        </div>
        <Slider
          disabled={options?.disabled}
          value={watch(name)}
          onChange={(value) => {
            setValue(name, value as PathValue<T, Path<T>>);
          }}
          {...(typeof defaultMin === "number" && {
            min: defaultMin,
          })}
          {...(typeof defaultMax === "number" && {
            max: defaultMax,
          })}
          {...props}
          {...restRegister}
        />
      </div>
    </div>
  );
};
