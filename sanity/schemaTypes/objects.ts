import {defineField, defineType} from 'sanity'

/**
 * Tipos reutilizáveis.
 *
 * O site é trilingue (PT · EN · FR) mas o português é a fonte da verdade:
 * se o EN ou o FR ficarem vazios, o site mostra o português.
 */

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto curto (multilingue)',
  type: 'object',
  fields: [
    defineField({name: 'pt', title: 'Português', type: 'string'}),
    defineField({name: 'en', title: 'English (opcional)', type: 'string'}),
    defineField({name: 'fr', title: 'Français (opcional)', type: 'string'}),
  ],
  options: {collapsible: true, collapsed: false},
  preview: {
    select: {pt: 'pt', en: 'en', fr: 'fr'},
    prepare: (sel) => ({title: sel.pt || sel.en || sel.fr || '— sem texto —'}),
  },
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Texto longo (multilingue)',
  type: 'object',
  fields: [
    defineField({name: 'pt', title: 'Português', type: 'text', rows: 4}),
    defineField({name: 'en', title: 'English (opcional)', type: 'text', rows: 4}),
    defineField({name: 'fr', title: 'Français (opcional)', type: 'text', rows: 4}),
  ],
  options: {collapsible: true, collapsed: false},
  preview: {
    select: {pt: 'pt', en: 'en', fr: 'fr'},
    prepare: (sel) => ({title: sel.pt || sel.en || sel.fr || '— sem texto —'}),
  },
})

export const figura = defineType({
  name: 'figura',
  title: 'Imagem',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Descreve a imagem para leitores de ecrã e motores de busca.',
    }),
  ],
})

export const subcategoria = defineType({
  name: 'subcategoria',
  title: 'Subcategoria',
  type: 'object',
  fields: [
    defineField({name: 'titulo', title: 'Título', type: 'localeString'}),
    defineField({
      name: 'itens',
      title: 'Produtos',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
  ],
  preview: {
    select: {titulo: 'titulo.pt', itens: 'itens'},
    prepare: (sel) => ({
      title: sel.titulo || 'Subcategoria',
      subtitle: Array.isArray(sel.itens) ? `${sel.itens.length} produtos` : 'Sem produtos',
    }),
  },
})

export const estatistica = defineType({
  name: 'estatistica',
  title: 'Número em destaque',
  type: 'object',
  fields: [
    defineField({name: 'valor', title: 'Valor', type: 'string', description: 'Ex.: 2008, CAVEX, +30'}),
    defineField({name: 'legenda', title: 'Legenda', type: 'localeString'}),
  ],
  preview: {
    select: {valor: 'valor', legenda: 'legenda.pt'},
    prepare: (sel) => ({title: sel.valor || '—', subtitle: sel.legenda}),
  },
})

export const pilar = defineType({
  name: 'pilar',
  title: 'Pilar',
  type: 'object',
  fields: [
    defineField({name: 'num', title: 'Número', type: 'string', description: 'Ex.: 01'}),
    defineField({name: 'titulo', title: 'Título', type: 'localeString'}),
    defineField({name: 'descricao', title: 'Descrição', type: 'localeText'}),
  ],
  preview: {
    select: {num: 'num', titulo: 'titulo.pt'},
    prepare: (sel) => ({title: [sel.num, sel.titulo].filter(Boolean).join(' · ') || 'Pilar'}),
  },
})

export const marcoTemporal = defineType({
  name: 'marcoTemporal',
  title: 'Marco',
  type: 'object',
  fields: [
    defineField({name: 'ano', title: 'Ano', type: 'string'}),
    defineField({name: 'titulo', title: 'Título', type: 'localeString'}),
    defineField({name: 'descricao', title: 'Descrição', type: 'localeText'}),
  ],
  preview: {
    select: {ano: 'ano', titulo: 'titulo.pt'},
    prepare: (sel) => ({title: sel.ano || '—', subtitle: sel.titulo}),
  },
})

export const secaoTexto = defineType({
  name: 'secaoTexto',
  title: 'Secção de texto',
  type: 'object',
  fields: [
    defineField({name: 'titulo', title: 'Título', type: 'localeString'}),
    defineField({
      name: 'paragrafos',
      title: 'Parágrafos',
      type: 'array',
      of: [{type: 'localeText'}],
      description: 'Emails e endereços web são transformados em links automaticamente.',
    }),
    defineField({
      name: 'lista',
      title: 'Lista (opcional)',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'paragrafosFinais',
      title: 'Parágrafos depois da lista (opcional)',
      type: 'array',
      of: [{type: 'localeText'}],
    }),
  ],
  preview: {
    select: {titulo: 'titulo.pt'},
    prepare: (sel) => ({title: sel.titulo || 'Secção'}),
  },
})

export const empresaGrupo = defineType({
  name: 'empresaGrupo',
  title: 'Empresa do grupo',
  type: 'object',
  fields: [
    defineField({name: 'etiqueta', title: 'Etiqueta', type: 'string', description: 'Ex.: Grupo, Multimédia, Cultura'}),
    defineField({name: 'nome', title: 'Nome', type: 'string'}),
    defineField({name: 'url', title: 'Site (opcional)', type: 'url'}),
  ],
  preview: {
    select: {nome: 'nome', etiqueta: 'etiqueta'},
    prepare: (sel) => ({title: sel.nome || '—', subtitle: sel.etiqueta}),
  },
})

export const passoProcesso = defineType({
  name: 'passoProcesso',
  title: 'Passo',
  type: 'object',
  fields: [
    defineField({name: 'num', title: 'Número', type: 'string', description: 'Ex.: 01'}),
    defineField({name: 'texto', title: 'Texto', type: 'localeText'}),
  ],
  preview: {
    select: {num: 'num', texto: 'texto.pt'},
    prepare: (sel) => ({title: sel.num || '—', subtitle: sel.texto}),
  },
})
