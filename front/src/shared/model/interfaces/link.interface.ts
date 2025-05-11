import { Key } from "react";

export interface ILink<T = string> {
  id?: Key;
  label: string;
  value: T;
}

export interface ILinkWithIcon<T = string> extends ILink<T> {
  icon: string;
}
