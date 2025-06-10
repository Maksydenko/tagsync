import { axiosInstance } from '@/application/api';

import { IProduct } from '@/entities/product';

import { IAddReview } from './reviews.interface';

export const ReviewsService = {
  add: async (data: IAddReview) => {
    try {
      const response = await axiosInstance.post('/Review/add', data);

      return response;
    } catch (err) {
      throw err;
    }
  },

  get: async (id: IProduct['product_id']) => {
    try {
      const response = await axiosInstance.get(`/Review/${id}`);

      return response;
    } catch (err) {
      throw err;
    }
  }
};
