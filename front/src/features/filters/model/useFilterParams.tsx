"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

import { SearchParam, Time } from "@/shared/model";

import { IFilter } from "../api";

export const useFilterParams = (
  filtersData: IFilter[],
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  form: UseFormReturn<any>
) => {
  // TODO: handle real price range
  const defaultFilters = useMemo(() => {
    return {
      [SearchParam.Price]: {
        max: 1_000_000,
        min: 0,
      },
    };
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const filterDebounceDelay =
    Number(process.env.NEXT_PUBLIC_FILTER_DEBOUNCE_DELAY) *
    Time.MillisecondsInSecond;

  useEffect(() => {
    const { current: timeoutElement } = timeoutRef;

    const subscription = form.watch((formValues) => {
      if (timeoutElement) {
        clearTimeout(timeoutElement);
      }

      timeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (formValues[SearchParam.Price]) {
          const [min, max] = formValues[SearchParam.Price];
          const isDefaultPrice =
            min === defaultFilters[SearchParam.Price].min &&
            max === defaultFilters[SearchParam.Price].max;

          if (isDefaultPrice) {
            params.delete(SearchParam.Price);
          } else {
            params.set(SearchParam.Price, `${min},${max}`);
          }
        }

        filtersData.forEach(({ list: filterList, value: filterValue }) => {
          params.delete(filterValue);

          const checked = filterList
            .map((item) => item.value)
            .filter((name) => formValues[name]);

          if (checked.length) {
            params.set(filterValue, checked.join(","));
          }
        });

        push(`?${params.toString()}`);
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
    searchParams,
  ]);
};
