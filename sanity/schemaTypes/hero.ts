import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'mainImage',
      title: 'Imagem principal (pílula grande)',
      description:
        'Sugestão: estufa em produção + folhagem tropical de Cabo Verde. ' +
        'Carregar o original em alta resolução (mínimo 680×1080 px): a imagem é ' +
        'servida a 2× em ecrãs retina e um ficheiro pequeno fica visivelmente suave.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          description: 'Descrever o que se vê na imagem — serve leitores de ecrã e pesquisa.',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
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
