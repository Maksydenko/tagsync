import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface IField<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id"> {
  label: string;
  name: Path<T>;
  options?: RegisterOptions<T>;
  type: HTMLInputTypeAttribute;
}
