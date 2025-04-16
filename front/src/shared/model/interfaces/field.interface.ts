import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";

import { ILink } from "./link.interface";

export interface IField<T extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "className"
    | "disabled"
    | "id"
    | "max"
    | "maxLength"
    | "min"
    | "minLength"
    | "name"
    | "onBlur"
    | "onChange"
    | "ref"
    | "required"
  > {
  icon?: string;
  isLoading?: boolean;
  items?: ILink[];
  label?: string;
  name: Path<T>;
  options?: RegisterOptions<T>;
  type?: HTMLInputTypeAttribute;
}
