import { FC } from 'react';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/shared/model';
import { Autocomplete } from '@/shared/ui';

import s from './Search.module.scss';

interface SearchProps {
  className?: string;
}

export const Search: FC<SearchProps> = ({ className }) => {
  const form = useForm({
    mode: 'onChange'
  });
  const search = form.watch('search');

  const { data: searchData } = useQuery({
    enabled: !!search,
    queryFn: async () => {
      const { ProductsService } = await import('@/features/products');

      return ProductsService.search(`?query=${search}`);
    },
    queryKey: [QueryKey.Search, search]
  });

  const items =
    searchData?.data.products.map(item => ({
      label: item.title,
      value: `/${item.slug}/${item.product_id}`
    })) || [];

  return (
    <Autocomplete
      className={clsx(s.search, className)}
      formReturn={form}
      items={items}
      name="search"
    />
  );
};
