import type { NextConfig } from "next";

// Mesma condição que o app/robots.ts. O robots.txt é um pedido que qualquer um
// ignora; o cabeçalho é o que de facto impede a indexação do site de revisão,
// mesmo que alguém partilhe o link directamente.
const isPublicDomain = (process.env.NEXT_PUBLIC_SITE_URL ?? "").includes(
  "scryptus1-caboverde.com",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    if (isPublicDomain) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
