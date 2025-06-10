import { QueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/shared/model';

export const invalidateQueries = async (
  queryClient: QueryClient,
  queryKeys: QueryKey[]
) => {
  await Promise.allSettled(
    queryKeys.map((key) =>
      queryClient.invalidateQueries({
        queryKey: [key]
      })
    )
  );
};
