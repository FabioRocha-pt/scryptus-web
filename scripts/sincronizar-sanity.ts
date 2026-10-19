/**
 * Espelha no Sanity o conteúdo que o site mostra por defeito: textos (PT · EN · FR),
 * as fotografias da entrega de 18/10 e os logótipos de clientes.
 *
 * Depois disto, o Studio mostra exatamente o que está no site, e editar lá passa
 * a mudar o site.
 *
 * Uso (token Editor, nunca no git):
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/sincronizar-sanity.ts
 *
 * Substitui os documentos únicos, as áreas e os clientes pelos valores do código.
 * Não toca nos pedidos de orçamento nem nas subscrições da newsletter.
 */
import {readFileSync} from 'node:fs'
import path from 'node:path'
import {createClient, type SanityDocumentStub} from '@sanity/client'

import {AREAS} from '../app/content/areas'
import {CLIENTES} from '../app/content/clientes'
import {EMPRESA_DEFAULTS} from '../app/content/empresa'
import {FOTO_ARMAZEM, FOTO_HERO, fotoArea, type FotoLocal} from '../app/content/imagens'
import {CONTACTOS_DEFAULTS, PORTEFOLIO_DEFAULTS, PRIVACIDADE_DEFAULTS} from '../app/content/paginas'
import {SITE_DEFAULTS} from '../app/content/site'
import {translations, type TKey} from '../app/i18n/translations'
import type {LText} from '../sanity/lib/queries'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('Falta SANITY_API_WRITE_TOKEN')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c1gufx1v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-06-19',
  token,
  useCdn: false,
})

const PUBLIC = path.join(process.cwd(), 'public')

/* ── Ajudantes ─────────────────────────────────────────────────────── */

const semVazios = (t: LText) =>
  Object.fromEntries(Object.entries(t).filter(([, v]) => typeof v === 'string' && v !== ''))

const ls = (t: LText) => ({_type: 'localeString', ...semVazios(t)})
const lt = (t: LText) => ({_type: 'localeText', ...semVazios(t)})
/** Texto de interface (translations.ts) nas três línguas. */
const tr = (k: TKey): LText => ({
  pt: translations.pt[k],
  en: translations.en[k],
  fr: translations.fr[k],
})

let n = 0
const key = () => `k${(n++).toString(36).padStart(4, '0')}`

const assets = new Map<string, string>()
async function asset(src: string): Promise<string> {
  const ja = assets.get(src)
  if (ja) return ja
  const ficheiro = path.join(PUBLIC, src)
  const doc = await client.assets.upload('image', readFileSync(ficheiro), {
    filename: path.basename(ficheiro),
  })
  console.log(`  imagem ${src} → ${doc._id}`)
  assets.set(src, doc._id)
  return doc._id
}

/** «76% 50%» → hotspot do Sanity, para o enquadramento do cartão e do banner. */
function hotspot(posicao?: string) {
  const m = posicao?.match(/^(\d+)%\s+(\d+)%$/)
  if (!m) return {}
  return {hotspot: {_type: 'sanity.imageHotspot', x: +m[1] / 100, y: +m[2] / 100, width: 1, height: 1}}
}

async function figura(foto: FotoLocal) {
  return {
    _type: 'figura',
    asset: {_type: 'reference', _ref: await asset(foto.src)},
    alt: foto.alt,
    ...hotspot(foto.posicao),
  }
}

/* ── Documentos ────────────────────────────────────────────────────── */

async function documentos(): Promise<SanityDocumentStub[]> {
  const d = SITE_DEFAULTS
  const docs: SanityDocumentStub[] = []

  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    razaoSocial: d.razaoSocial,
    tagline: ls(d.tagline),
    morada: d.morada,
    telefone: d.telefone,
    whatsapp: d.whatsapp,
    whatsappUrl: d.whatsappUrl,
    email: d.email,
    horarioDias: ls(d.horarioDias),
    horarioHoras: d.horarioHoras,
    mapaUrl: d.mapaUrl,
    newsletterTexto: ls(d.newsletterTexto),
    copyright: ls(d.copyright),
  })

  docs.push({
    _id: 'hero',
    _type: 'hero',
    mainImage: await figura(FOTO_HERO),
    eyebrow: ls(tr('hero.eyebrow')),
    tagline: ls(tr('hero.tagline')),
    lead: lt(tr('hero.lead')),
  })

  docs.push({
    _id: 'oferta',
    _type: 'oferta',
    pilares: ([1, 2, 3, 4] as const).map((i) => ({
      _key: key(),
      _type: 'pilar',
      num: `0${i}`,
      titulo: ls(tr(`oferta.p${i}.title`)),
      descricao: lt(tr(`oferta.p${i}.desc`)),
    })),
  })

  docs.push({
    _id: 'sobre',
    _type: 'sobre',
    image: await figura(FOTO_ARMAZEM),
    pullquote: ls(tr('sobre.pullquote')),
    body: lt(tr('sobre.body')),
    estatisticas: (
      [
        ['2008', 'sobre.m1'],
        ['CAVEX', 'sobre.m2'],
        ['+30', 'sobre.m3'],
      ] as const
    ).map(([valor, k]) => ({_key: key(), _type: 'estatistica', valor, legenda: ls(tr(k))})),
  })

  const E = EMPRESA_DEFAULTS
  docs.push({
    _id: 'empresaPage',
    _type: 'empresaPage',
    eyebrow: ls(E.eyebrow),
    titulo: ls(E.titulo),
    lead: lt(E.lead),
    imagem: await figura(FOTO_ARMAZEM),
    sobreTitulo: ls(E.sobreTitulo),
    pullquote: ls(E.pullquote),
    sobreParagrafos: E.sobreParagrafos.map((p) => ({_key: key(), ...lt(p)})),
    estatisticas: E.estatisticas.map((e) => ({
      _key: key(),
      _type: 'estatistica',
      valor: e.valor,
      legenda: ls(e.legenda),
    })),
    percursoIntro: lt(E.percursoIntro),
    marcos: E.marcos.map((m) => ({
      _key: key(),
      _type: 'marcoTemporal',
      ano: m.ano,
      titulo: ls(m.titulo),
      descricao: lt(m.descricao),
    })),
    pilares: E.pilares.map((p) => ({
      _key: key(),
      _type: 'pilar',
      num: p.num,
      titulo: ls(p.titulo),
      descricao: lt(p.descricao),
    })),
    grupoIntro: lt(E.grupoIntro),
    grupoEmpresas: E.grupoEmpresas.map((g) => ({_key: key(), _type: 'empresaGrupo', ...g})),
  })

  const P = PORTEFOLIO_DEFAULTS
  docs.push({
    _id: 'portefolioPage',
    _type: 'portefolioPage',
    eyebrow: ls(P.eyebrow),
    titulo: ls(P.titulo),
    lead: lt(P.lead),
    aviso: lt(P.aviso),
  })

  const C = CONTACTOS_DEFAULTS
  docs.push({
    _id: 'contactosPage',
    _type: 'contactosPage',
    eyebrow: ls(C.eyebrow),
    titulo: ls(C.titulo),
    lead: lt(C.lead),
    formTitulo: ls(C.formTitulo),
    passos: C.passos.map((p) => ({
      _key: key(),
      _type: 'passoProcesso',
      num: p.num,
      texto: lt(p.texto),
    })),
    obrigadoTitulo: ls(C.obrigadoTitulo),
    obrigadoTexto: lt(C.obrigadoTexto),
  })

  const R = PRIVACIDADE_DEFAULTS
  docs.push({
    _id: 'privacidadePage',
    _type: 'privacidadePage',
    eyebrow: ls(R.eyebrow),
    titulo: ls(R.titulo),
    lead: lt(R.lead),
    secoes: R.secoes.map((s) => ({
      _key: key(),
      _type: 'secaoTexto',
      titulo: ls(s.titulo),
      paragrafos: s.paragrafos.map((p) => ({_key: key(), ...lt(p)})),
      lista: s.lista.map((i) => ({_key: key(), ...ls(i)})),
      ...('paragrafosFinais' in s && s.paragrafosFinais
        ? {paragrafosFinais: s.paragrafosFinais.map((p) => ({_key: key(), ...lt(p)}))}
        : {}),
    })),
  })

  for (const a of AREAS) {
    const foto = fotoArea(a.slug)
    docs.push({
      _id: `area-${a.slug}`,
      _type: 'area',
      num: a.num,
      slug: {_type: 'slug', current: a.slug},
      titulo: ls(a.titulo),
      tituloCurto: ls(a.tituloCurto),
      descricaoCartao: lt(a.descricaoCartao),
      lead: lt(a.lead),
      // Uma fotografia serve o cartão e o banner.
      ...(foto ? {imagemCartao: await figura(foto)} : {}),
      subcategorias: a.subcategorias.map((s) => ({
        _key: key(),
        _type: 'subcategoria',
        titulo: ls(s.titulo),
        itens: s.itens.map((i) => ({_key: key(), ...ls(i)})),
      })),
      seoDescription: a.seoDescription,
    })
  }

  for (const [i, c] of CLIENTES.entries()) {
    docs.push({
      _id: `cliente-${c.chave}`,
      _type: 'cliente',
      nome: c.nome,
      nomeCurto: c.nomeCurto,
      ordem: (i + 1) * 10,
      logo: {
        _type: 'image',
        asset: {_type: 'reference', _ref: await asset(`/img/clientes/${c.chave}.png`)},
        alt: c.nome,
      },
    })
  }

  return docs
}

async function main() {
  console.log('A carregar imagens…')
  const docs = await documentos()

  // Rascunhos antigos destes documentos esconderiam a versão nova no Studio.
  const ids = docs.map((doc) => doc._id!)
  const rascunhos = await client.fetch<string[]>('*[_id in $ids]._id', {
    ids: ids.map((id) => `drafts.${id}`),
  })

  const tx = client.transaction()
  for (const doc of docs) tx.createOrReplace(doc as SanityDocumentStub & {_id: string})
  for (const id of rascunhos) tx.delete(id)
  await tx.commit({visibility: 'sync'})
  console.log(`${docs.length} documentos gravados, ${rascunhos.length} rascunhos apagados.`)
}

main().catch((erro) => {
  console.error(erro)
  process.exit(1)
})
