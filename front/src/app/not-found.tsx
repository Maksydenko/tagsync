"use client";

import Error from "next/error";
import { StatusCodes } from "http-status-codes";

import { Locale } from "@/shared/model";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

const GlobalNotFound = () => (
    <html lang={Locale.Default}>
      <body>
        <Error statusCode={StatusCodes.NOT_FOUND} />;
      </body>
    </html>
  );

export default GlobalNotFound;
