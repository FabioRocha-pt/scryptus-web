import {defineField, defineType} from 'sanity'

export const sobre = defineType({
  name: 'sobre',
  title: 'Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Fotografia (pílula vertical)',
      description: 'Sugestão: foto da equipa ou do armazém (Rua da Cruz Vermelha), com pessoa real.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Sobre — imagens'}),
  },
})
