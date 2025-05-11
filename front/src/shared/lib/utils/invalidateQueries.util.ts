import { QueryClient } from "@tanstack/react-query";

export const invalidateQueries = async (
  queryClient: QueryClient,
  queryKeys: string[]
) => {
  await Promise.all(
    queryKeys.map((key) =>
      queryClient.invalidateQueries({
        queryKey: [key],
      })
    )
  );
};
