import { axiosInstance, IResponse } from '@/application/api';

import { IResult } from '@/shared/api';

import { ICheckout, IOrder } from './orders.interface';

export const OrdersService = {
  checkout: async (data: ICheckout) => {
    const response: IResponse<IResult> = await axiosInstance.post(
      '/Orders/checkout',
      data
    );

    return response;
  },

  get: async (email: string) => {
    const response: IResponse<IOrder[]> = await axiosInstance.get(
      `/Orders/${email}`
    );

    return response;
  }
};
