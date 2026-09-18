import type { MetadataRoute } from 'next'
import { IS_PUBLIC_DOMAIN, SITE_URL } from './site-config'

// Só o domínio definitivo é indexável. Enquanto NEXT_PUBLIC_SITE_URL apontar para o
// domínio de revisão (duckdns), o robots fecha tudo — assim o site de revisão não
// chega ao Google e não compete nos resultados com o domínio final quando este entrar.
export default function robots(): MetadataRoute.Robots {
  if (!IS_PUBLIC_DOMAIN) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    // Ao repor as páginas do build de produção, voltar a acrescentar
    // '/contactos/obrigado' — a página de sucesso do formulário não deve ser indexada.
    rules: { userAgent: '*', allow: '/', disallow: '/studio' },
    // Servido a partir do mesmo domínio que o robots.txt — motores ignoram sitemaps
    // declarados noutro domínio, que era o problema do robots em produção.
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
