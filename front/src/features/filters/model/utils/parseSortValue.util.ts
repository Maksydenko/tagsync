import { SearchParam } from '@/shared/model';

export const parseSortValue = (value: string) => {
  const [sort_by, sort_order] = value.split(',');

  const query: Record<string, string> = {
    [SearchParam.SortBy]: sort_by
  };

  if (sort_order) {
    query[SearchParam.SortOrder] = sort_order;
  }

  return query;
};
