import { axiosInstance, IResponse } from "@/application/api";

import { IProduct } from "@/entities/product";

import { IResult } from "@/shared/api";

import { IAddToWishlist } from "./wishlist.interface";

export const WishlistService = {
  add: async (data: IAddToWishlist) => {
    const response: IResponse<IResult> = await axiosInstance.post(
      "/Wishlist/add",
      data
    );

    return response;
  },

  get: async (email: string) => {
    const response: IResponse<IProduct[]> = await axiosInstance.get(
      `/Wishlist/${email}`
    );

    return response;
  },

  remove: async (data: IAddToWishlist) => {
    const response: IResponse<IResult> = await axiosInstance.delete(
      "/Wishlist/remove",
      {
        data,
      }
    );

    return response;
  },
};
