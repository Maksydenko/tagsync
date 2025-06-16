'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { SearchParam, sortSearchParams } from '@/shared/model';

import { SEARCH_PARAMS_TO_RESET } from '../searchParamsToReset.const';

import { parseSortValue } from '../utils';

export const useSortParams = (sortValue: string, defaultSortValue: string) => {
  const { push } = useRouter();

  useEffect(() => {
    if (!sortValue) {
      return;
    }

    const query = parseSortValue(sortValue);
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete(SearchParam.SortOrder);
    SEARCH_PARAMS_TO_RESET.forEach(param => searchParams.delete(param));

    Object.entries(query).forEach(([key, value]) => {
      if (sortValue === defaultSortValue) {
        searchParams.delete(SearchParam.SortBy);
      } else {
        searchParams.set(key, value);
      }
    });

    push(`?${sortSearchParams(searchParams)}`);
  }, [defaultSortValue, push, sortValue]);
};
