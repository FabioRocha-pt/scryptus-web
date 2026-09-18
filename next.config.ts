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
};

export default nextConfig;
