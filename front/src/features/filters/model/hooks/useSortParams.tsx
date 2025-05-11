"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SearchParam, sortSearchParams } from "@/shared/model";

import { parseSortValue } from "../utils";

export const useSortParams = (sortValue: string) => {
  const { push } = useRouter();

  useEffect(() => {
    if (!sortValue) {
      return;
    }

    const query = parseSortValue(sortValue);
    const paramsToReset = [SearchParam.Page];
    const currentParams = new URLSearchParams(window.location.search);

    paramsToReset.forEach((param) => currentParams.delete(param));

    Object.entries(query).forEach(([key, val]) => currentParams.set(key, val));

    push(`?${sortSearchParams(currentParams)}`);
  }, [push, sortValue]);
};
