import type { MetadataRoute } from 'next';
import { IS_PUBLIC_DOMAIN, SITE_URL } from './content/site';

export default function robots(): MetadataRoute.Robots {
  // Domínio de revisão: fechado à indexação. O cabeçalho X-Robots-Tag no
  // next.config é o que de facto a impede — isto é só a parte que os motores pedem.
  if (!IS_PUBLIC_DOMAIN) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/contactos/obrigado'],
    },
    // Servido a partir do mesmo domínio que o robots.txt — motores ignoram
    // sitemaps declarados noutro domínio.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
