import { axiosInstance, IResponse } from '@/application/api';

import { IResult } from '@/shared/api';

import { IAddToCart, ICart, IClearCart } from './cart.interface';

export const CartService = {
  add: async (data: IAddToCart) => {
    const response: IResponse<IResult> = await axiosInstance.post(
      '/Cart/add',
      data
    );

    return response;
  },

  clear: async (data: IClearCart) => {
    const response: IResponse<IResult> = await axiosInstance.post(
      '/Cart/clear',
      data
    );

    return response;
  },

  get: async (email: string) => {
    const response: IResponse<ICart> = await axiosInstance.get(
      `/Cart/${email}`
    );

    return response;
  },

  remove: async (data: IAddToCart) => {
    const response: IResponse<IResult> = await axiosInstance.delete(
      '/Cart/remove',
      {
        data
      }
    );

    return response;
  }
};
