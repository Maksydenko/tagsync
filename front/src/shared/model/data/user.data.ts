import { Pathname } from "../enums";
import { ILinkWithIcon } from "../interfaces";

export const userData: ILinkWithIcon[] = [
  {
    icon: "/img/icons/user.svg",
    label: "profile",
    value: Pathname.Profile,
  },
  {
    icon: "/img/icons/product/compare.svg",
    label: "comparisons",
    value: Pathname.Comparisons,
  },
  {
    icon: "/img/icons/product/heart-empty.svg",
    label: "wishlist",
    value: Pathname.Wishlist,
  },
  {
    icon: "/img/icons/order.svg",
    label: "orders",
    value: Pathname.Orders,
  },
];
