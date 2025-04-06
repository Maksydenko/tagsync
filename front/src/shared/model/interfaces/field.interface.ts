import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";

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
  label: string;
  name: Path<T>;
  options?: RegisterOptions<T>;
  type: HTMLInputTypeAttribute;
}
