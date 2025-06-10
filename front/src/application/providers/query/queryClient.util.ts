import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from '@tanstack/react-query';

import { QueryStatus, Time } from '@/shared/model';

const makeQueryClient = () => {
  const STALE_TIME_IN_SECONDS = 60;

  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => (
            defaultShouldDehydrateQuery(query) ||
            query.state.status === QueryStatus.Pending
          ),
      },
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: STALE_TIME_IN_SECONDS * Time.MillisecondsInSecond,
      },
    },
  });
};

export const getQueryClient = () => {
  let browserQueryClient: null | QueryClient = null;

  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
};
