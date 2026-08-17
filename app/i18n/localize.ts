import type {LText} from '@/sanity/lib/queries'
import type {Locale} from './translations'

export type MaybeLText = LText | null | undefined

function value(locale: Locale, text: MaybeLText): string | null {
  if (!text) return null
  const ordem: Locale[] = locale === 'pt' ? ['pt'] : [locale, 'pt']
  for (const l of ordem) {
    const v = text[l]
    if (typeof v === 'string' && v.trim() !== '') return v
  }
  // Último recurso: qualquer idioma preenchido
  for (const v of [text.pt, text.en, text.fr]) {
    if (typeof v === 'string' && v.trim() !== '') return v
  }
  return null
}

/**
 * Devolve o texto no idioma pedido, com recurso ao português e, depois, ao
 * conteúdo por defeito do código.
 */
export function pick(locale: Locale, text: MaybeLText, fallback?: MaybeLText): string {
  return value(locale, text) ?? value(locale, fallback) ?? ''
}

/** Há texto preenchido em algum idioma? */
export function hasText(text: MaybeLText): boolean {
  return value('pt', text) !== null
}

export interface Segmento {
  texto: string
  destaque: boolean
}

/**
 * `Peça o seu *orçamento.*` → [{texto: 'Peça o seu '}, {texto: 'orçamento.', destaque: true}]
 *
 * Os asteriscos marcam a parte do título que aparece em verde-lima.
 */
export function segmentos(texto: string): Segmento[] {
  if (!texto) return []
  return texto
    .split('*')
    .map((parte, i) => ({texto: parte, destaque: i % 2 === 1}))
    .filter((s) => s.texto !== '')
}

/** Torna emails e endereços web clicáveis dentro de texto simples. */
export interface Fragmento {
  texto: string
  href?: string
}

export function autoLink(texto: string): Fragmento[] {
  // O domínio não pode terminar em ponto, senão a pontuação da frase entra no
  // endereço (…escrever para info@exemplo.com. → mailto:info@exemplo.com.)
  const padrao = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(https?:\/\/[^\s<)]*[^\s<).,;:!?])/g
  const fragmentos: Fragmento[] = []
  let ultimo = 0
  for (const m of texto.matchAll(padrao)) {
    const inicio = m.index ?? 0
    if (inicio > ultimo) fragmentos.push({texto: texto.slice(ultimo, inicio)})
    const achado = m[0]
    fragmentos.push({
      texto: achado,
      href: achado.includes('@') ? `mailto:${achado}` : achado,
    })
    ultimo = inicio + achado.length
  }
  if (ultimo < texto.length) fragmentos.push({texto: texto.slice(ultimo)})
  return fragmentos
}
