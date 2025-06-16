'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { SearchParam, sortSearchParams, Time } from '@/shared/model';

import { FilterType, IFilter } from '../../api';

import { SEARCH_PARAMS_TO_RESET } from '../searchParamsToReset.const';

interface IUseFilterParams<T extends FieldValues> {
  defaultPrice: {
    max: number;
    min: number;
  };
  filtersData: IFilter[];
  form: UseFormReturn<T>;
}

export const useFilterParams = <T extends FieldValues>({
  defaultPrice,
  filtersData,
  form
}: IUseFilterParams<T>) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const defaultFilters = useMemo(
    () => ({
      [SearchParam.PriceRange]: defaultPrice
    }),
    [defaultPrice]
  );

  const filterDebounceDelay =
    Number(process.env.NEXT_PUBLIC_FILTER_DEBOUNCE_DELAY) *
    Time.MillisecondsInSecond;

  useEffect(() => {
    const { current: timeoutElement } = timeoutRef;

    const subscription = form.watch(formValues => {
      if (timeoutElement) {
        clearTimeout(timeoutElement);
      }

      timeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        SEARCH_PARAMS_TO_RESET.forEach(param => params.delete(param));

        if (formValues[SearchParam.PriceRange]) {
          const [min, max] = formValues[SearchParam.PriceRange];
          const { max: defaultMax, min: defaultMin } =
            defaultFilters[SearchParam.PriceRange];

          const isDefaultPrice = min === defaultMin && max === defaultMax;

          if (isDefaultPrice) {
            params.delete(SearchParam.PriceRange);
          } else {
            params.set(SearchParam.PriceRange, [min, max].join('-'));
          }
        }

        filtersData.forEach(
          ({ name: filterName, type: filterType, values: filterValues }) => {
            const filterNameParam =
              filterType === FilterType.Int
                ? `${filterName}_range`
                : filterName;

            params.delete(filterNameParam);

            const checked = filterValues.filter(
              name => formValues[[filterNameParam, name].join('-')]
            );

            if (!checked.length) {
              return;
            }

            params.set(filterNameParam, checked.join(','));
          }
        );

        push(`?${sortSearchParams(params)}`);
      }, filterDebounceDelay);
    });

    return () => {
      if (timeoutElement) {
        clearTimeout(timeoutElement);
      }

      subscription.unsubscribe();
    };
  }, [
    defaultFilters,
    filterDebounceDelay,
    filtersData,
    form,
    push,
    searchParams
  ]);
};
