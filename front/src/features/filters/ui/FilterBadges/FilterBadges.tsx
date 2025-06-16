'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import { Translation } from '@/shared/config';
import { SearchParam, sortSearchParams } from '@/shared/model';

import { IFilter } from '../../api';

import s from './FilterBadges.module.scss';

interface FilterBadgesProps {
  className?: string;
  filtersData: IFilter[];
}

export const FilterBadges: FC<FilterBadgesProps> = ({
  className,
  filtersData
}) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const tCategory = useTranslations(Translation.Category);

  const activeBadges: {
    groupKey: string;
    name: string;
    value: string;
  }[] = [];

  filtersData.forEach(({ name, values }) => {
    const paramValues = searchParams.get(name)?.split(',') || [];

    values.forEach(value => {
      if (!paramValues.includes(value)) {
        return;
      }

      activeBadges.push({
        groupKey: name,
        name: value,
        value
      });
    });
  });

  const removeFilter = (groupKey: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const values = params.get(groupKey)?.split(',').filter(Boolean) || [];

    const updatedValues = values.filter(v => v !== value);
    if (updatedValues.length) {
      params.set(groupKey, updatedValues.join(','));
    } else {
      params.delete(groupKey);
    }

    params.delete(SearchParam.Page);
    push(`?${sortSearchParams(params)}`);
  };

  const removeAllFilters = () => {
    const params = new URLSearchParams(searchParams);

    filtersData.forEach(({ name }) => {
      params.delete(name);
    });

    params.delete(SearchParam.Page);
    push(`?${sortSearchParams(params)}`);
  };

  return (
    <div className={clsx(s.filterBadges, className)}>
      <ul className={s.filterBadges__list}>
        {!!activeBadges.length && (
          <li className={s.filterBadges__item}>
            <button
              className={s.filterBadges__btn}
              type="button"
              onClick={removeAllFilters}
            >
              <p>{tCategory('filters.remove-all')}</p>
              <span className={s.filterBadges__icon} />
            </button>
          </li>
        )}
        {activeBadges.map(({ groupKey, name, value }) => (
          <li key={`${groupKey}-${value}`} className={s.filterBadges__item}>
            <button
              className={s.filterBadges__btn}
              type="button"
              onClick={() => {
                removeFilter(groupKey, value);
              }}
            >
              <p>{name}</p>
              <span className={s.filterBadges__icon} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
