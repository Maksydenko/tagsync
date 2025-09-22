import { atomWithQuery } from 'jotai-tanstack-query';

import { queryOptions } from '@tanstack/react-query';

import { QueryKey } from '@/shared/model';

import { CountriesService } from '../api';

export const countriesAtom = atomWithQuery(() =>
  queryOptions({
    queryFn: async () => CountriesService.getCountries(),
    queryKey: [QueryKey.Countries]
  })
);
