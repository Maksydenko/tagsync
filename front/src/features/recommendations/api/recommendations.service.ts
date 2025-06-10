import { axiosInstance, IResponse } from '@/application/api';

import { IProduct } from '@/entities/product';

export const RecommendationsService = {
  getAlsoViewed: async (id: IProduct['product_id']) => {
    try {
      const response: IResponse<IProduct[]> = await axiosInstance.get(
        `/Recommendation/also-viewed/${id}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getCompatible: async (id: IProduct['product_id']) => {
    try {
      const response: IResponse<IProduct[]> = await axiosInstance.get(
        `/Recommendation/compatible/${id}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getPriceBased: async (id: IProduct['product_id']) => {
    try {
      const response: IResponse<IProduct[]> = await axiosInstance.get(
        `/Recommendation/price-based/${id}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getSimilar: async (id: IProduct['product_id']) => {
    try {
      const response: IResponse<IProduct[]> = await axiosInstance.get(
        `/Recommendation/similar/${id}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },
};
