import {defineField, defineType} from 'sanity'

export const cliente = defineType({
  name: 'cliente',
  title: 'Cliente',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome completo',
      type: 'string',
      description: 'Ex.: Banco de Cabo Verde. Usado no texto alternativo do logótipo.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nomeCurto',
      title: 'Nome curto',
      type: 'string',
      description: 'Mostrado enquanto não houver logótipo. Ex.: BCV',
    }),
    defineField({
      name: 'logo',
      title: 'Logótipo',
      type: 'image',
      description: 'SVG ou PNG com fundo transparente (≈366×220).',
      fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})],
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
      description: 'Menor número aparece primeiro.',
    }),
  ],
  orderings: [{title: 'Ordem', name: 'ordemAsc', by: [{field: 'ordem', direction: 'asc'}]}],
  preview: {
    select: {title: 'nome', subtitle: 'nomeCurto', media: 'logo'},
  },
})
