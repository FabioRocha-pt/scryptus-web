import {defineField, defineType} from 'sanity'

export const sobre = defineType({
  name: 'sobre',
  title: 'Página inicial · Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Fotografia (pílula vertical)',
      description: 'Vertical, 2:3. Sugestão: foto da equipa ou do armazém (Rua da Cruz Vermelha).',
      type: 'figura',
    }),
    defineField({
      name: 'pullquote',
      title: 'Citação em destaque',
      type: 'localeString',
      description: 'Por defeito: «O seu parceiro de negócios — desde 2008.»',
    }),
    defineField({
      name: 'body',
      title: 'Texto',
      type: 'localeText',
      description: 'Se ficar vazio, usa-se o texto por defeito.',
    }),
    defineField({
      name: 'estatisticas',
      title: 'Números em destaque',
      type: 'array',
      of: [{type: 'estatistica'}],
      description: 'Se ficar vazio, usam-se 2008 · CAVEX · +30.',
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {prepare: () => ({title: 'Página inicial · Sobre'})},
})
