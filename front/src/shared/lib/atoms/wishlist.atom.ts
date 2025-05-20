import { atomFamily } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";

import { queryOptions } from "@tanstack/react-query";

import { WishlistService } from "@/features/wishlist";

import { QueryKey } from "@/shared/model";

export const wishlistAtom = atomFamily((userEmail: string | undefined) =>
  atomWithQuery(() =>
    queryOptions({
      enabled: !!userEmail,
      queryFn: () => WishlistService.get(userEmail!),
      queryKey: [QueryKey.Wishlist, userEmail],
    })
  )
);
