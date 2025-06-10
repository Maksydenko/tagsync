'use client';

import { FC, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';

import { Locale, Translation } from '@/shared/config';
import { SearchParam } from '@/shared/model';
import { Collapse, Field } from '@/shared/ui';

import { IFilter } from '../../api';

import { useFilterParams } from '../../model';

import s from './Filters.module.scss';

interface FiltersProps {
  className?: string;
  filtersData: IFilter[];
}

export const Filters: FC<FiltersProps> = ({ className, filtersData }) => {
  const priceFilter = useMemo(
    () => filtersData.find((filter) => filter.name === SearchParam.Price),
    [filtersData]
  );
  const defaultPrice = useMemo(
    () => ({
      max: Number(
        priceFilter?.values[priceFilter.values.length - 1].split('-')[1]
      ),
      min: Number(priceFilter?.values[0].split('-')[0])
    }),
    [priceFilter?.values]
  );

  const filteredData = useMemo(
    () => filtersData.filter((filter) => filter.name !== SearchParam.Price),
    [filtersData]
  );

  const defaultFilters = useMemo(
    () => ({
      [SearchParam.PriceRange]: defaultPrice
    }),
    [defaultPrice]
  );

  const searchParams = useSearchParams();

  const locale = useLocale() as Locale;
  const tCategory = useTranslations(Translation.Category);

  const defaultValues = useMemo(() => {
    const values: Record<string, boolean | number[]> = {};
    const priceParam = searchParams.get(SearchParam.PriceRange);

    const { max: defaultMax, min: defaultMin } =
      defaultFilters[SearchParam.PriceRange];
    const defaultPrice = [defaultMin, defaultMax];

    if (priceParam) {
      const [minParam, maxParam] = priceParam.split('-');

      const min = Number(minParam);
      const max = Number(maxParam);

      if (!isNaN(min) && !isNaN(max)) {
        values[SearchParam.PriceRange] = [min, max];
      } else {
        values[SearchParam.PriceRange] = defaultPrice;
      }
    } else {
      values[SearchParam.PriceRange] = defaultPrice;
    }

    filteredData.forEach((group) => {
      const paramName =
        group.type === 'int' ? `${group.name}_range` : group.name;
      const param = searchParams.get(paramName);
      const activeValues = param?.split(',') || [];

      activeValues.forEach((value) => {
        if (value) {
          values[`${paramName}-${value}`] = true;
        }
      });
    });

    return values;
  }, [defaultFilters, filteredData, searchParams]);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const form = useForm<any>({
    defaultValues,
    mode: 'onChange'
  });

  useFilterParams({
    defaultPrice,
    filtersData: filteredData,
    form
  });

  const filterFields = [
    {
      children: (
        <div className={s.filters__fields}>
          <Field
            formReturn={form}
            name={SearchParam.PriceRange}
            options={{
              max: defaultFilters[SearchParam.PriceRange].max,
              min: defaultFilters[SearchParam.PriceRange].min
            }}
            type="ranges"
          />
        </div>
      ),
      key: SearchParam.PriceRange,
      label: tCategory('filters.price')
    },
    ...filteredData.map(
      ({
        name: filterName,
        translations: filterTranslations,
        type: groupType,
        values: filterValues
      }) => ({
        children: (
          <div className={s.filters__fields}>
            {filterValues.map((value) => {
              const fieldName = `${
                groupType === 'int' ? `${filterName}_range` : filterName
              }-${value}`;

              return (
                <Field
                  key={value}
                  className={s.authForm__field}
                  formReturn={form}
                  label={value}
                  name={fieldName}
                  type="checkbox"
                />
              );
            })}
          </div>
        ),
        key: filterName,
        label: filterTranslations?.[locale] || filterName
      })
    )
  ];

  return (
    <div className={clsx(s.filters, className)}>
      <form className={s.filters__form}>
        <Collapse
          className={s.filters__collapse}
          defaultActiveKey={[SearchParam.PriceRange, filteredData[0].name]}
          items={filterFields}
          isReverseIcon
        />
      </form>
    </div>
  );
};
