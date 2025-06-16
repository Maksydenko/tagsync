'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { SearchParam, sortSearchParams } from '@/shared/model';

import { parseSortValue } from '../utils';

const PARAMS_TO_RESET = [SearchParam.Page];

export const useSortParams = (sortValue: string, defaultSortValue: string) => {
  const { push } = useRouter();

  useEffect(() => {
    if (!sortValue) {
      return;
    }

    const query = parseSortValue(sortValue);
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.delete(SearchParam.SortOrder);
    PARAMS_TO_RESET.forEach(param => currentParams.delete(param));

    Object.entries(query).forEach(([key, value]) => {
      if (sortValue === defaultSortValue) {
        currentParams.delete(SearchParam.SortBy);
      } else {
        currentParams.set(key, value);
      }
    });

    push(`?${sortSearchParams(currentParams)}`);
  }, [defaultSortValue, push, sortValue]);
};
