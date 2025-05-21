import { atomWithQuery } from "jotai-tanstack-query";

import { queryOptions } from "@tanstack/react-query";

import { ProductsService } from "@/features/products";

import { QueryKey } from "@/shared/model";

export const categoriesAtom = atomWithQuery(() =>
  queryOptions({
    queryFn: async () => ProductsService.getCategories(),
    queryKey: [QueryKey.Categories],
  })
);
