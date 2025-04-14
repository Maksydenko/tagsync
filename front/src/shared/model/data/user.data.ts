import { Pathname } from "../enums";
import { ILink } from "../interfaces";

export const userData: ILink[] = [
  {
    label: "profile",
    value: Pathname.Profile,
  },
  {
    label: "orders",
    value: Pathname.Orders,
  },
  {
    label: "wishlist",
    value: Pathname.Wishlist,
  },
];
