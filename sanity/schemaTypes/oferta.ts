import {defineField, defineType} from 'sanity'

export const oferta = defineType({
  name: 'oferta',
  title: 'Página inicial · A nossa oferta',
  type: 'document',
  fields: [
    defineField({
      name: 'pilares',
      title: 'Razões para nos escolher',
      type: 'array',
      of: [{type: 'pilar'}],
      description: 'Se ficar vazio, usam-se os quatro pilares por defeito.',
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {prepare: () => ({title: 'Página inicial · A nossa oferta'})},
})
