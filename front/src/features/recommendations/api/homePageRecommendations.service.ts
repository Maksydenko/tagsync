import { axiosInstance, IResponse } from '@/application/api';

import { IProduct } from '@/entities/product';

export const HomePageRecommendationsService = {
  getLastviewed: async () => {
    try {
      const response: IResponse<IProduct[]> = await axiosInstance.get(
        '/MainPageRecommendations/lastviewed'
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getPopular: async () => {
    try {
      const response: IResponse<IProduct[]> = await axiosInstance.get(
        '/MainPageRecommendations/popular'
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getTopRated: async () => {
    try {
      const response: IResponse<IProduct[]> = await axiosInstance.get(
        '/MainPageRecommendations/toprated'
      );

      return response;
    } catch (err) {
      throw err;
    }
  }
};
