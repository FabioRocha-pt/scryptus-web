import type { NextConfig } from "next";

/** Endereços antigos do site estático → novos endereços da app. */
const LEGADO: Record<string, string> = {
  "/index.html": "/",
  "/empresa.html": "/empresa",
  "/portefolio.html": "/portefolio",
  "/contactos.html": "/contactos",
  "/obrigado.html": "/contactos/obrigado",
  "/privacidade.html": "/privacidade",
  "/grafica.html": "/areas/grafica",
  "/agricultura.html": "/areas/agricultura",
  "/texteis.html": "/areas/texteis",
  "/epi.html": "/areas/epi",
  "/mobiliario.html": "/areas/mobiliario",
  "/informatica.html": "/areas/informatica",
  "/museus.html": "/areas/museus",
  "/outras-areas.html": "/areas/outras-areas",
};

// Duplicado de IS_PUBLIC_DOMAIN: o next.config é avaliado fora do bundle da app
// e não pode importar de app/content/site.ts. Manter as duas condições iguais.
const isPublicDomain = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.scryptus1-caboverde.com"
).includes("scryptus1-caboverde.com");

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
  async redirects() {
    return Object.entries(LEGADO).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  // Mesma condição que o app/robots.ts (ver IS_PUBLIC_DOMAIN em app/content/site.ts).
  // O robots.txt é um pedido que qualquer um ignora; é o cabeçalho que de facto
  // impede a indexação do site de revisão, mesmo que alguém partilhe o link.
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
