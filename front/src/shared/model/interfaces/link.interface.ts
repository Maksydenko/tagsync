export interface ILink<T = string> {
  label: string;
  value: T;
}

export interface ILinkWithIcon extends ILink {
  icon: string;
}
