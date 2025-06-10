import { axiosInstance, IResponse } from '@/application/api';

import { IFilter } from '@/features/filters';

import { IResult } from '@/shared/api';

import { ICategory, IProducts, ITrackView } from './interfaces';

export const ProductsService = {
  getAll: async (query: string) => {
    try {
      const response: IResponse<IProducts> = await axiosInstance.get(
        `/products${query}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getCategories: async () => {
    try {
      const response: IResponse<ICategory[]> = await axiosInstance.get(
        '/products/category'
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getFiltered: async (query: string) => {
    try {
      const response: IResponse<IProducts> = await axiosInstance.get(
        `/productfilter/filter${query}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  getFilters: async (query: string) => {
    try {
      const response: IResponse<IFilter[]> = await axiosInstance.get(
        `/products/filters${query}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  search: async (query: string) => {
    try {
      const response: IResponse<IProducts> = await axiosInstance.get(
        `/search${query}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  trackView: async (data: ITrackView) => {
    try {
      const response: IResponse<IResult> = await axiosInstance.post(
        '/view',
        data
      );

      return response;
    } catch (err) {
      throw err;
    }
  },
};
