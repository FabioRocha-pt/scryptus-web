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
    defineField({
      name: 'numeros',
      title: 'Barra de números',
      type: 'array',
      of: [{type: 'estatistica'}],
      description: 'Barra logo abaixo do herói. Se ficar vazio, usa-se 18+ · 8 · CAVEX · CV.',
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {prepare: () => ({title: 'Página inicial · A nossa oferta'})},
})
