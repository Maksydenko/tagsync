import { atomWithQuery } from "jotai-tanstack-query";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { queryOptions } from "@tanstack/react-query";

import { IDatabase } from "@/shared/lib";
import { QueryKey } from "@/shared/model";

export const userAtom = atomWithQuery(() =>
  queryOptions({
    queryFn: async () => {
      const supabase = createClientComponentClient<IDatabase>();
      const res = await supabase.auth.getUser();

      return res.data;
    },
    queryKey: [QueryKey.User],
  })
);
