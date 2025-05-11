import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { Protocol } from "@/shared/model";

const withNextIntl = createNextIntlPlugin();

const backURI = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: backURI.hostname,
        pathname: "/storage/**",
        protocol: backURI.protocol.split(":")[0] as Protocol,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
