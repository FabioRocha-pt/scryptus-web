import {defineQuery} from 'next-sanity'

/* ── Tipos partilhados ─────────────────────────────────────────────── */

export interface SanityImageWithAlt {
  asset?: {_ref: string; _type: 'reference'}
  hotspot?: {x: number; y: number; height: number; width: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  alt?: string | null
}

/** Texto multilingue vindo do Sanity — o PT é o valor de recurso. */
export interface LText {
  pt?: string | null
  en?: string | null
  fr?: string | null
}

export interface SanityEstatistica {
  valor?: string | null
  legenda?: LText | null
}

export interface SanityPilar {
  num?: string | null
  titulo?: LText | null
  descricao?: LText | null
}

export interface SanitySubcategoria {
  titulo?: LText | null
  itens?: (LText | null)[] | null
}

export interface SanityArea {
  num?: string | null
  slug?: string | null
  titulo?: LText | null
  tituloCurto?: LText | null
  descricaoCartao?: LText | null
  lead?: LText | null
  imagemCartao?: SanityImageWithAlt | null
  imagemDestaque?: SanityImageWithAlt | null
  subcategorias?: (SanitySubcategoria | null)[] | null
  seoDescription?: string | null
}

export interface SanityCliente {
  nome?: string | null
  nomeCurto?: string | null
  logo?: SanityImageWithAlt | null
}

export interface SanitySiteSettings {
  razaoSocial?: string | null
  tagline?: LText | null
  morada?: string | null
  telefone?: string | null
  whatsapp?: string | null
  whatsappUrl?: string | null
  email?: string | null
  horarioDias?: LText | null
  horarioHoras?: string | null
  mapaUrl?: string | null
  facebook?: string | null
  instagram?: string | null
  linkedin?: string | null
  newsletterTexto?: LText | null
  copyright?: LText | null
  ogImage?: SanityImageWithAlt | null
}

export interface SanityPageHeader {
  eyebrow?: LText | null
  titulo?: LText | null
  lead?: LText | null
}

export interface SanityHome {
  hero: {
    mainImage?: SanityImageWithAlt | null
    secondaryImage?: SanityImageWithAlt | null
    eyebrow?: LText | null
    tagline?: LText | null
    lead?: LText | null
  } | null
  oferta: {
    pilares?: (SanityPilar | null)[] | null
    numeros?: (SanityEstatistica | null)[] | null
  } | null
  sobre: {
    image?: SanityImageWithAlt | null
    pullquote?: LText | null
    body?: LText | null
    estatisticas?: (SanityEstatistica | null)[] | null
  } | null
  areas: (SanityArea | null)[] | null
  clientes: (SanityCliente | null)[] | null
}

export interface SanityEmpresa extends SanityPageHeader {
  imagem?: SanityImageWithAlt | null
  sobreTitulo?: LText | null
  pullquote?: LText | null
  sobreParagrafos?: (LText | null)[] | null
  estatisticas?: (SanityEstatistica | null)[] | null
  percursoIntro?: LText | null
  marcos?: ({ano?: string | null; titulo?: LText | null; descricao?: LText | null} | null)[] | null
  pilares?: (SanityPilar | null)[] | null
  grupoIntro?: LText | null
  grupoEmpresas?: ({etiqueta?: string | null; nome?: string | null; url?: string | null} | null)[] | null
}

export interface SanityPortefolio extends SanityPageHeader {
  aviso?: LText | null
}

export interface SanityContactos extends SanityPageHeader {
  formTitulo?: LText | null
  passos?: ({num?: string | null; texto?: LText | null} | null)[] | null
  obrigadoTitulo?: LText | null
  obrigadoTexto?: LText | null
}

export interface SanityPrivacidade extends SanityPageHeader {
  secoes?:
    | ({
        titulo?: LText | null
        paragrafos?: (LText | null)[] | null
        lista?: (LText | null)[] | null
      } | null)[]
    | null
}

/* ── Projeções ─────────────────────────────────────────────────────── */

const AREA_FIELDS = `
  num,
  "slug": slug.current,
  titulo,
  tituloCurto,
  descricaoCartao,
  lead,
  imagemCartao,
  imagemDestaque,
  subcategorias[]{titulo, itens},
  seoDescription
`

const CABECALHO = `eyebrow, titulo, lead`

/* ── Consultas ─────────────────────────────────────────────────────── */

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  razaoSocial, tagline, morada, telefone, whatsapp, whatsappUrl, email,
  horarioDias, horarioHoras, mapaUrl, facebook, instagram, linkedin,
  newsletterTexto, copyright, ogImage
}`)

export const HOME_QUERY = defineQuery(`{
  "hero": *[_type == "hero"][0]{mainImage, secondaryImage, eyebrow, tagline, lead},
  "oferta": *[_type == "oferta"][0]{
    pilares[]{num, titulo, descricao},
    numeros[]{valor, legenda}
  },
  "sobre": *[_type == "sobre"][0]{image, pullquote, body, estatisticas[]{valor, legenda}},
  "areas": *[_type == "area"] | order(num asc){${AREA_FIELDS}},
  "clientes": *[_type == "cliente"] | order(ordem asc){nome, nomeCurto, logo}
}`)

export const AREAS_QUERY = defineQuery(`*[_type == "area"] | order(num asc){${AREA_FIELDS}}`)

export const AREA_QUERY = defineQuery(
  `*[_type == "area" && slug.current == $slug][0]{${AREA_FIELDS}}`,
)

export const EMPRESA_QUERY = defineQuery(`*[_type == "empresaPage"][0]{
  ${CABECALHO},
  imagem, sobreTitulo, pullquote,
  sobreParagrafos,
  estatisticas[]{valor, legenda},
  percursoIntro,
  marcos[]{ano, titulo, descricao},
  pilares[]{num, titulo, descricao},
  grupoIntro,
  grupoEmpresas[]{etiqueta, nome, url}
}`)

export const PORTEFOLIO_QUERY = defineQuery(`*[_type == "portefolioPage"][0]{${CABECALHO}, aviso}`)

export const CONTACTOS_QUERY = defineQuery(`*[_type == "contactosPage"][0]{
  ${CABECALHO},
  formTitulo,
  passos[]{num, texto},
  obrigadoTitulo,
  obrigadoTexto
}`)

export const PRIVACIDADE_QUERY = defineQuery(`*[_type == "privacidadePage"][0]{
  ${CABECALHO},
  secoes[]{titulo, paragrafos, lista}
}`)
