import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { Locale } from "@/shared/model";

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: Locale.Default,

  // A list of all locales that are supported
  locales: [Locale.EN, Locale.UK],
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { getPathname, Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
