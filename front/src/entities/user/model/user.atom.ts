import { atomWithQuery } from 'jotai-tanstack-query';

import { queryOptions } from '@tanstack/react-query';

import { AuthService } from '@/features/auth';

import { QueryKey } from '@/shared/model';

export const userAtom = atomWithQuery(() =>
  queryOptions({
    queryFn: async () => AuthService.getUserData(),
    queryKey: [QueryKey.User],
  })
);
