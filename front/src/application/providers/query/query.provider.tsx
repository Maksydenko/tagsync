'use client';

import { FC } from 'react';

import {
  QueryClientProvider,
  QueryClientProviderProps,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Phase } from '@/shared/model';

import { getQueryClient } from './queryClient.util';

export const QueryProvider: FC<Partial<QueryClientProviderProps>> = ({
  children,
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NEXT_PUBLIC_PHASE === Phase.Development && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
