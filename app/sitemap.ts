import type { MetadataRoute } from 'next'
import { SITE_URL } from './site-config'

// O site é, neste repositório, uma página única — as secções são âncoras, que não
// entram no sitemap. Quando as páginas do build de produção (empresa, portefólio,
// contactos, privacidade e as oito áreas) voltarem ao repositório, acrescentá-las aqui.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
