"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import {
  Rating as RootRating,
  RatingProps as RootRatingProps,
} from "react-simple-star-rating";

import s from "./Rating.module.scss";

interface RatingProps<T extends FieldValues> extends RootRatingProps {
  className?: string;
  formReturn: UseFormReturn<T>;
  name: Path<T>;
  options?: RegisterOptions<T>;
}

export const Rating = <T extends FieldValues>({
  className,
  formReturn,
  name,
  options,
  ...props
}: RatingProps<T>): ReactNode => {
  const getIcon = (className: string) => {
    return (
      <Image
        alt="star"
        className={clsx(s.rating__icon, s[`rating__icon_${className}`])}
        height={20}
        src="/img/icons/product/star.svg"
        width={20}
      />
    );
  };

  const { getValues, register, setValue } = formReturn;

  return (
    <div className={clsx(s.rating, className)}>
      <RootRating
        allowHover={!options?.disabled}
        emptyIcon={getIcon("empty")}
        fillIcon={getIcon("fill")}
        initialValue={getValues(name) as number}
        onClick={(value) => {
          setValue(name, value as PathValue<T, Path<T>>);
        }}
        {...props}
        {...register(name, options)}
      />
    </div>
  );
};
