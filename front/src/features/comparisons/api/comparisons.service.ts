import { axiosInstance, IResponse } from "@/application/api";

import { IResult } from "@/shared/api";

import { TComparison } from "./comparisons.type";

import { IAddComparison } from "./addComparison.interface";

export const ComparisonsService = {
  add: async (data: IAddComparison) => {
    const response: IResponse<IResult> = await axiosInstance.post(
      "/Comparison/add",
      data
    );

    return response;
  },

  get: async (email: string) => {
    const response: IResponse<TComparison> = await axiosInstance.get(
      `/Comparison/${email}`
    );

    return response;
  },

  remove: async (data: IAddComparison) => {
    const response: IResponse<IResult> = await axiosInstance.delete(
      "/Comparison/remove",
      {
        data,
      }
    );

    return response;
  },
};
