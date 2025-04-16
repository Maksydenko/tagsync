import { Pathname } from "../enums";
import { ILink } from "../interfaces";

export const userData: ILink[] = [
  {
    label: "profile",
    value: Pathname.Profile,
  },
  {
    label: "comparisons",
    value: Pathname.Comparisons,
  },
  {
    label: "wishlist",
    value: Pathname.Wishlist,
  },
  {
    label: "orders",
    value: Pathname.Orders,
  },
];
