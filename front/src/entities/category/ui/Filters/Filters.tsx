"use client";

import { FC, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";

import { SearchParam, Translation } from "@/shared/model";
import { Collapse, Field } from "@/shared/ui";

import { IFilter } from "../../api";

import { useFilterParams } from "../../model";

import s from "./Filters.module.scss";

interface FiltersProps {
  className?: string;
  filtersData: IFilter[];
}

export const Filters: FC<FiltersProps> = ({ className, filtersData }) => {
  // TODO: handle real price range
  const defaultFilters = useMemo(() => {
    return {
      [SearchParam.Price]: {
        max: 1_000_000,
        min: 0,
      },
    };
  }, []);

  const tCategory = useTranslations(Translation.Category);
  const searchParams = useSearchParams();

  const defaultValues = useMemo(() => {
    const values: Record<string, boolean | number[]> = {};
    const priceParam = searchParams.get(SearchParam.Price);

    const { max: defaultMax, min: defaultMin } =
      defaultFilters[SearchParam.Price];
    const defaultPrice = [defaultMin, defaultMax];

    if (priceParam) {
      const [minParam, maxParam] = priceParam.split(",");

      const min = Number(minParam);
      const max = Number(maxParam);

      if (!isNaN(min) && !isNaN(max)) {
        values[SearchParam.Price] = [min, max];
      } else {
        values[SearchParam.Price] = defaultPrice;
      }
    } else {
      values[SearchParam.Price] = defaultPrice;
    }

    filtersData.forEach((group) => {
      const param = searchParams.get(group.value);
      const activeValues = param?.split(",") || [];

      activeValues.forEach((value) => {
        if (value) {
          values[value] = true;
        }
      });
    });

    return values;
  }, [defaultFilters, filtersData, searchParams]);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const form = useForm<any>({
    defaultValues,
    mode: "onChange",
  });

  useFilterParams(filtersData, form);

  const filterFields = [
    {
      children: (
        <div className={s.filters__fields}>
          <Field
            formReturn={form}
            name={SearchParam.Price}
            options={{
              max: defaultFilters[SearchParam.Price].max,
              min: defaultFilters[SearchParam.Price].min,
            }}
            type="ranges"
          />
        </div>
      ),
      key: SearchParam.Price,
      label: tCategory("filters.price"),
    },
    ...filtersData.map(
      ({ list: filterList, name: filterName, value: filterValue }) => ({
        children: (
          <div className={s.filters__fields}>
            {filterList.map(({ name: itemName, value: itemValue }) => (
              <Field
                key={itemValue}
                className={s.authForm__field}
                formReturn={form}
                label={itemName}
                name={itemValue}
                type="checkbox"
              />
            ))}
          </div>
        ),
        key: filterValue,
        label: filterName,
      })
    ),
  ];

  return (
    <div className={clsx(s.filters, className)}>
      <form className={s.filters__form}>
        <Collapse
          className={s.filters__collapse}
          defaultActiveKey={[
            SearchParam.Price,
            ...filtersData.map((group) => group.value),
          ]}
          items={filterFields}
          isReverseIcon
        />
      </form>
    </div>
  );
};
