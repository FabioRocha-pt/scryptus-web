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
      title: 'Fotografia de fundo',
      description:
        'Ocupa a faixa do topo de ponta a ponta, sob um degradé verde; o texto fica à ' +
        'esquerda. Horizontal, com pelo menos 1920 px de largura. Imagens com menos de ' +
        '1600 px são ignoradas e o site mostra a fotografia por defeito. Carregar o ' +
        'original sem cortar: o Sanity reduz imagens, mas nunca as amplia.',
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
