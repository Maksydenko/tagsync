import { FC, PropsWithChildren } from 'react';

import {
  SessionContextProvider,
  SessionContextProviderProps
} from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const SessionProvider: FC<
  Partial<PropsWithChildren<SessionContextProviderProps>>
> = ({ children }) => (
  <SessionContextProvider supabaseClient={supabase}>
    {children}
  </SessionContextProvider>
);
