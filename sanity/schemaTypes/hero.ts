import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Página inicial · Herói',
  type: 'document',
  groups: [
    {name: 'imagens', title: 'Imagens', default: true},
    {name: 'texto', title: 'Texto'},
  ],
  fields: [
    defineField({
      name: 'mainImage',
      title: 'Imagem principal (pílula grande)',
      description: 'Vertical, 2:3. Sugestão: estufa em produção + folhagem tropical de Cabo Verde.',
      type: 'figura',
      group: 'imagens',
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Imagem secundária (pílula pequena)',
      description: 'Vertical, 7:10. Sugestão: produto em cena.',
      type: 'figura',
      group: 'imagens',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Sobretítulo',
      type: 'localeString',
      group: 'texto',
      description: 'Se ficar vazio, usa-se o texto por defeito: «Praia, Cabo Verde · desde 2008».',
    }),
    defineField({
      name: 'tagline',
      title: 'Assinatura',
      type: 'localeString',
      group: 'texto',
      description: 'Por defeito: «O seu parceiro de negócios.»',
    }),
    defineField({
      name: 'lead',
      title: 'Parágrafo de abertura',
      type: 'localeText',
      group: 'texto',
      description: 'Se ficar vazio, usa-se o texto por defeito.',
    }),
  ],
  preview: {prepare: () => ({title: 'Página inicial · Herói'})},
})
