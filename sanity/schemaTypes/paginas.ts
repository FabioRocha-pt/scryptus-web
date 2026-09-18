import {defineField, defineType} from 'sanity'

/** Campos comuns ao topo verde de todas as páginas interiores. */
const cabecalho = [
  defineField({
    name: 'eyebrow',
    title: 'Sobretítulo',
    type: 'localeString',
    group: 'cabecalho',
  }),
  defineField({
    name: 'titulo',
    title: 'Título',
    type: 'localeString',
    group: 'cabecalho',
    description: 'Envolva em *asteriscos* a parte que deve aparecer em verde-lima. Ex.: Peça o seu *orçamento.*',
  }),
  defineField({
    name: 'lead',
    title: 'Introdução',
    type: 'localeText',
    group: 'cabecalho',
  }),
]

const grupoCabecalho = {name: 'cabecalho', title: 'Topo da página', default: true}

export const empresaPage = defineType({
  name: 'empresaPage',
  title: 'Página · Conhecer a empresa',
  type: 'document',
  groups: [grupoCabecalho, {name: 'sobre', title: 'A empresa'}, {name: 'percurso', title: 'Percurso'}, {name: 'trabalho', title: 'Como trabalhamos'}, {name: 'grupo', title: 'Grupo CAVEX'}],
  fields: [
    ...cabecalho,
    defineField({name: 'imagem', title: 'Fotografia (pílula vertical)', type: 'figura', group: 'sobre'}),
    defineField({name: 'sobreTitulo', title: 'Título da secção', type: 'localeString', group: 'sobre'}),
    defineField({name: 'pullquote', title: 'Citação em destaque', type: 'localeString', group: 'sobre'}),
    defineField({
      name: 'sobreParagrafos',
      title: 'Parágrafos',
      type: 'array',
      of: [{type: 'localeText'}],
      group: 'sobre',
    }),
    defineField({
      name: 'estatisticas',
      title: 'Números em destaque',
      type: 'array',
      of: [{type: 'estatistica'}],
      group: 'sobre',
      validation: (rule) => rule.max(4),
    }),
    defineField({name: 'percursoIntro', title: 'Introdução do percurso', type: 'localeText', group: 'percurso'}),
    defineField({
      name: 'marcos',
      title: 'Marcos',
      type: 'array',
      of: [{type: 'marcoTemporal'}],
      group: 'percurso',
    }),
    defineField({
      name: 'pilares',
      title: 'Como trabalhamos',
      type: 'array',
      of: [{type: 'pilar'}],
      group: 'trabalho',
    }),
    defineField({name: 'grupoIntro', title: 'Introdução do grupo', type: 'localeText', group: 'grupo'}),
    defineField({
      name: 'grupoEmpresas',
      title: 'Empresas do grupo',
      type: 'array',
      of: [{type: 'empresaGrupo'}],
      group: 'grupo',
    }),
  ],
  preview: {prepare: () => ({title: 'Página · Conhecer a empresa'})},
})

export const portefolioPage = defineType({
  name: 'portefolioPage',
  title: 'Página · Portefólio completo',
  type: 'document',
  groups: [grupoCabecalho],
  fields: [
    ...cabecalho,
    defineField({
      name: 'aviso',
      title: 'Aviso final',
      type: 'localeText',
      description: 'Caixa destacada no fim da listagem.',
    }),
  ],
  preview: {prepare: () => ({title: 'Página · Portefólio completo'})},
})

export const contactosPage = defineType({
  name: 'contactosPage',
  title: 'Página · Contactos',
  type: 'document',
  groups: [grupoCabecalho, {name: 'formulario', title: 'Formulário'}],
  fields: [
    ...cabecalho,
    defineField({name: 'formTitulo', title: 'Título do formulário', type: 'localeString', group: 'formulario'}),
    defineField({
      name: 'passos',
      title: 'Como funciona',
      type: 'array',
      of: [{type: 'passoProcesso'}],
      group: 'formulario',
    }),
    defineField({
      name: 'obrigadoTitulo',
      title: 'Página de agradecimento · título',
      type: 'localeString',
      group: 'formulario',
    }),
    defineField({
      name: 'obrigadoTexto',
      title: 'Página de agradecimento · texto',
      type: 'localeText',
      group: 'formulario',
    }),
  ],
  preview: {prepare: () => ({title: 'Página · Contactos'})},
})

export const privacidadePage = defineType({
  name: 'privacidadePage',
  title: 'Página · Política de privacidade',
  type: 'document',
  groups: [grupoCabecalho, {name: 'conteudo', title: 'Conteúdo'}],
  fields: [
    ...cabecalho,
    defineField({
      name: 'secoes',
      title: 'Secções',
      type: 'array',
      of: [{type: 'secaoTexto'}],
      group: 'conteudo',
    }),
  ],
  preview: {prepare: () => ({title: 'Página · Política de privacidade'})},
})
