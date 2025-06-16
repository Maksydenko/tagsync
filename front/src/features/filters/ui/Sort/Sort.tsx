'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';

import { Translation } from '@/shared/config';
import { SearchParam } from '@/shared/model';
import { Select } from '@/shared/ui';

import { getSortsData, ISortForm, useSortParams } from '../../model';

import s from './Sort.module.scss';

interface SortProps {
  className?: string;
}

export const Sort: FC<SortProps> = ({ className }) => {
  const searchParams = useSearchParams();
  const tCategory = useTranslations(Translation.Category);

  const urlSortBy = searchParams.get(SearchParam.SortBy);
  const urlSortOrder = searchParams.get(SearchParam.SortOrder);

  const urlSortValue = urlSortBy
    ? urlSortOrder
      ? [urlSortBy, urlSortOrder].join(',')
      : urlSortBy
    : null;

  const sorts = getSortsData(tCategory);
  const [defaultSort] = sorts;

  const form = useForm<ISortForm>({
    defaultValues: {
      [SearchParam.SortBy]:
        sorts.find(sort => sort.value === urlSortValue) || defaultSort
    },
    mode: 'onChange'
  });

  const watchedSort = form.watch(SearchParam.SortBy);
  const watchedSortValue = watchedSort?.value;

  useSortParams(watchedSortValue, defaultSort.value);

  return (
    <div className={clsx(s.sort, className)}>
      <Select formReturn={form} items={sorts} name={SearchParam.SortBy} />
    </div>
  );
};
