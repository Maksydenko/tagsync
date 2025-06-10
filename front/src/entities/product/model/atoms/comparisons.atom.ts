import { atomFamily } from 'jotai/utils';
import { atomWithQuery } from 'jotai-tanstack-query';

import { queryOptions } from '@tanstack/react-query';

import { ComparisonsService } from '@/features/comparisons';

import { QueryKey } from '@/shared/model';

export const comparisonsAtom = atomFamily((userEmail: string | undefined) =>
  atomWithQuery(() =>
    queryOptions({
      enabled: !!userEmail,
      queryFn: () => ComparisonsService.get(userEmail!),
      queryKey: [QueryKey.Comparisons, userEmail]
    })
  )
);
