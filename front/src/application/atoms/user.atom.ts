import { atomWithQuery } from "jotai-tanstack-query";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { queryOptions } from "@tanstack/react-query";

import { IDatabase } from "@/shared/lib";
import { QueryKey } from "@/shared/model";

const supabase = createClientComponentClient<IDatabase>();

export const userAtom = atomWithQuery(() => {
  return queryOptions({
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();

      return data;
    },
    queryKey: [QueryKey.User],
  });
});
