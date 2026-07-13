import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'mainImage',
      title: 'Imagem principal (pílula grande)',
      description: 'Sugestão: estufa em produção + folhagem tropical de Cabo Verde.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
      ],
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Imagem secundária (pílula pequena)',
      description: 'Sugestão: produto em cena.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Hero — imagens'}),
  },
})
