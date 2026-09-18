// Fonte única do domínio servido. Alimenta o metadataBase (og:image, og:url,
// canonical), o robots.txt e o sitemap — mudar de domínio passa a ser mudar a
// variável de ambiente, e não uma caça a strings espalhadas pelo código.
//
// Enquanto o domínio definitivo (scryptus1-caboverde.com) não estiver ativo, aponta
// para o de revisão: assim as partilhas funcionam já, em vez de estarem partidas
// à espera. É também isto que mantém o site de revisão fora do Google.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://scryptus.duckdns.org'

export const IS_PUBLIC_DOMAIN = SITE_URL.includes('scryptus1-caboverde.com')
