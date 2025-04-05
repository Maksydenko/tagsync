import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { Protocol } from "@/shared/model";

const withNextIntl = createNextIntlPlugin();

const backendURI = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: backendURI.hostname,
        pathname: "/storage/**",
        protocol: backendURI.protocol.split(":")[0] as Protocol,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
