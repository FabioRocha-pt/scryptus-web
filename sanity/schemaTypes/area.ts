import {defineField, defineType} from 'sanity'

export const area = defineType({
  name: 'area',
  title: 'Área de negócio',
  type: 'document',
  groups: [
    {name: 'principal', title: 'Identificação', default: true},
    {name: 'imagens', title: 'Imagens'},
    {name: 'produtos', title: 'Produtos'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'num',
      title: 'Número',
      type: 'string',
      group: 'principal',
      description: 'Define a ordem no site. Ex.: 01',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço (slug)',
      type: 'slug',
      group: 'principal',
      description: 'Tem de coincidir com o endereço da página, ex.: grafica → /areas/grafica',
      options: {source: 'titulo.pt', maxLength: 40},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'titulo', title: 'Título da página', type: 'localeString', group: 'principal'}),
    defineField({
      name: 'tituloCurto',
      title: 'Título curto',
      type: 'localeString',
      group: 'principal',
      description: 'Usado nos cartões, no menu e no rodapé. Ex.: Gráfica',
    }),
    defineField({
      name: 'descricaoCartao',
      title: 'Descrição do cartão',
      type: 'localeText',
      group: 'principal',
      description: 'Texto curto que aparece no cartão da página inicial.',
    }),
    defineField({
      name: 'lead',
      title: 'Introdução da página',
      type: 'localeText',
      group: 'principal',
    }),
    defineField({
      name: 'imagemCartao',
      title: 'Fotografia da área',
      type: 'figura',
      group: 'imagens',
      description:
        'Serve o cartão da página inicial e o fundo do banner da página da área. ' +
        'Carregar o original sem cortar (de preferência com 1600 px ou mais de largura) ' +
        'e marcar o ponto de interesse (hotspot): é ele que decide o enquadramento.',
    }),
    defineField({
      name: 'imagemDestaque',
      title: 'Fundo do banner (opcional)',
      type: 'figura',
      group: 'imagens',
      description:
        'Só se o banner precisar de uma fotografia diferente da do cartão. ' +
        'Vazio: o banner usa a «Fotografia da área».',
    }),
    defineField({
      name: 'subcategorias',
      title: 'Subcategorias de produtos',
      type: 'array',
      of: [{type: 'subcategoria'}],
      group: 'produtos',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrição para motores de busca',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  orderings: [
    {title: 'Número', name: 'numAsc', by: [{field: 'num', direction: 'asc'}]},
  ],
  preview: {
    select: {num: 'num', titulo: 'tituloCurto.pt', fallback: 'titulo.pt', media: 'imagemCartao'},
    prepare: (sel) => ({
      title: [sel.num, sel.titulo || sel.fallback].filter(Boolean).join(' · ') || 'Área de negócio',
      media: sel.media,
    }),
  },
})
