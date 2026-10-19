import type {Metadata} from 'next'

/**
 * Campos de Open Graph comuns a todas as páginas.
 *
 * O Next junta os metadados por segmento de forma rasa: uma página que define
 * `openGraph` substitui o do layout por inteiro e perdia a imagem de partilha.
 * Cada página espalha este objeto e acrescenta o título, a descrição e o url.
 */
export const OG_BASE = {
  type: 'website',
  siteName: 'Scryptus 1',
  locale: 'pt_PT',
  images: [
    {
      url: '/og-imagem.jpg',
      width: 1200,
      height: 630,
      alt: 'Scryptus 1 — Cultivamos parcerias. Construímos negócios.',
    },
  ],
} satisfies Metadata['openGraph']
