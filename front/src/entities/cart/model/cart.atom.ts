import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { atomWithQuery } from 'jotai-tanstack-query';

import { queryOptions } from '@tanstack/react-query';

import { CartService } from '@/entities/cart';

import { QueryKey } from '@/shared/model';

export const cartOpenAtom = atom(false);

export const cartAtom = atomFamily((userEmail: string | undefined) =>
  atomWithQuery(() =>
    queryOptions({
      enabled: !!userEmail,
      queryFn: () => CartService.get(userEmail!),
      queryKey: [QueryKey.Cart, userEmail],
    })
  )
);
