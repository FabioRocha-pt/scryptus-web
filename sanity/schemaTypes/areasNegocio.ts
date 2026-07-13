import {defineField, defineType} from 'sanity'

const areaImage = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
    ],
  })

export const areasNegocio = defineType({
  name: 'areasNegocio',
  title: 'Áreas de Negócio',
  type: 'document',
  fields: [
    areaImage('grafica', '01 · Gráfica', 'Sugestão: prensa offset.'),
    areaImage('agricultura', '02 · Agricultura', 'Sugestão: estufa em produção.'),
    areaImage('texteis', '03 · Têxteis', 'Sugestão: vestuário de trabalho.'),
    areaImage('epi', '04 · EPI', 'Sugestão: EPI em uso.'),
    areaImage('mobiliario', '05 · Mobiliário', 'Sugestão: auditório.'),
    areaImage('informatica', '06 · Informática', 'Sugestão: sala de servidores.'),
    areaImage('museus', '07 · Museus & exposições', 'Sugestão: vitrina de museu.'),
    areaImage('outras', '08 · Outras áreas', 'Sugestão: gerador + material escolar.'),
  ],
  preview: {
    prepare: () => ({title: 'Áreas de Negócio — imagens'}),
  },
})
