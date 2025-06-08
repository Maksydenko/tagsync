import { MetadataRoute } from "next";

import { Pathname } from "@/shared/config";

const manifest = async (): Promise<MetadataRoute.Manifest> => ({
  background_color: "#fff",
  display: "standalone",
  icons: [
    {
      purpose: "maskable",
      sizes: "192x192",
      src: "/manifest/web-app-manifest-192x192.png",
      type: "image/png",
    },
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "/manifest/web-app-manifest-512x512.png",
      type: "image/png",
    },
  ],
  name: "TagSync",
  short_name: "TagSync",
  start_url: Pathname.Home,
  theme_color: "#fff",
});

export default manifest;
