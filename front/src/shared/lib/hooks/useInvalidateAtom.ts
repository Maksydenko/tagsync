import { useAtom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import { QueryKey } from '@/shared/model';

export const useInvalidateAtom = (queryKeys: QueryKey[]) => {
  const [queryClient] = useAtom(queryClientAtom);

  return async () =>
    await Promise.allSettled(
      queryKeys.map((key) =>
        queryClient.invalidateQueries({
          queryKey: [key],
        })
      )
    );
};
