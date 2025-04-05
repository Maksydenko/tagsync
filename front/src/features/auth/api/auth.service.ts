import { SupabaseClient } from "@supabase/supabase-js";

import { IDatabase } from "@/shared/lib";

export const AuthService = {
  checkEmailExists: async (
    supabase: SupabaseClient<
      IDatabase,
      "public",
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      any
    >,
    email: string
  ) => {
    return supabase.from("users").select("*").eq("email", email).maybeSingle();
  },
};
