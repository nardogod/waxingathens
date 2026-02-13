import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Waxing Athens",
    short_name: "Waxing Athens",
    description: "Professional Brazilian waxing at your home in Athens",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F7",
    theme_color: "#FF6B9D",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
  };
}
