import type {LText, SanityArea, SanityImageWithAlt} from '@/sanity/lib/queries'
import {hasText} from '../i18n/localize'
import {AREAS, type AreaContent} from './areas'

/** Área de negócio pronta a renderizar: Sanity sobrepõe-se ao conteúdo do código. */
export interface ResolvedArea {
  slug: string
  num: string
  titulo: LText
  tituloCurto: LText
  descricaoCartao: LText
  lead: LText
  legendaDestaque: string
  legendaCartao: string
  subcategorias: {titulo: LText; itens: LText[]}[]
  imagemCartao?: SanityImageWithAlt | null
  imagemDestaque?: SanityImageWithAlt | null
  seoDescription: string
}

const vazio: LText = {pt: ''}

function subcats(doc: SanityArea | null, base?: AreaContent) {
  const doSanity = (doc?.subcategorias ?? [])
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({
      titulo: s.titulo ?? vazio,
      itens: (s.itens ?? []).filter((i): i is LText => Boolean(i)),
    }))
    .filter((s) => hasText(s.titulo) || s.itens.length > 0)

  if (doSanity.length > 0) return doSanity
  return base?.subcategorias ?? []
}

function merge(base: AreaContent | undefined, doc: SanityArea | null): ResolvedArea | null {
  const slug = base?.slug ?? doc?.slug
  if (!slug) return null

  return {
    slug,
    num: doc?.num?.trim() || base?.num || '',
    titulo: hasText(doc?.titulo) ? doc!.titulo! : (base?.titulo ?? vazio),
    tituloCurto: hasText(doc?.tituloCurto)
      ? doc!.tituloCurto!
      : (base?.tituloCurto ?? (hasText(doc?.titulo) ? doc!.titulo! : vazio)),
    descricaoCartao: hasText(doc?.descricaoCartao)
      ? doc!.descricaoCartao!
      : (base?.descricaoCartao ?? vazio),
    lead: hasText(doc?.lead) ? doc!.lead! : (base?.lead ?? vazio),
    legendaDestaque: base?.legendaDestaque ?? '',
    legendaCartao: base?.legendaCartao ?? '',
    subcategorias: subcats(doc, base),
    imagemCartao: doc?.imagemCartao ?? null,
    imagemDestaque: doc?.imagemDestaque ?? null,
    seoDescription: doc?.seoDescription?.trim() || base?.seoDescription || '',
  }
}

/**
 * Lista completa das áreas: as oito do código (na ordem definida) mais
 * qualquer área nova criada no Studio.
 */
export function resolveAreas(docs: (SanityArea | null)[] | null | undefined): ResolvedArea[] {
  const validos = (docs ?? []).filter((d): d is SanityArea => Boolean(d?.slug))
  const doCodigo = AREAS.map((base) =>
    merge(base, validos.find((d) => d.slug === base.slug) ?? null),
  )
  const extras = validos
    .filter((d) => !AREAS.some((base) => base.slug === d.slug))
    .map((d) => merge(undefined, d))

  return [...doCodigo, ...extras].filter((a): a is ResolvedArea => Boolean(a))
}

/** Uma área pelo slug, já com o conteúdo do Sanity aplicado. */
export function resolveArea(slug: string, doc: SanityArea | null): ResolvedArea | null {
  const base = AREAS.find((a) => a.slug === slug)
  if (!base && !doc) return null
  return merge(base, doc)
}
