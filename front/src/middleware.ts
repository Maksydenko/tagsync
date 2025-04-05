import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { IDatabase } from "./shared/model/interfaces";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const middleware = async (req: NextRequest) => {
  // const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  // const supabase = createMiddlewareClient<IDatabase>({ req, res });

  // Refresh session if expired - required for Server Components
  // await supabase.auth.getSession();

  return handleI18nRouting(req);
};

export default middleware;

export const config = {
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
