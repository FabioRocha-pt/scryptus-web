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
      title: 'Imagem do cartão (4:5)',
      type: 'figura',
      group: 'imagens',
      description: 'Aparece na grelha de áreas de negócio da página inicial.',
    }),
    defineField({
      name: 'imagemDestaque',
      title: 'Imagem de destaque (16:7)',
      type: 'figura',
      group: 'imagens',
      description: 'Banner largo no topo da página da área.',
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
