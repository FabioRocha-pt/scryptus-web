import {defineField, defineType} from 'sanity'

/**
 * Documentos criados pelos formulários do site (server actions).
 * Não são para editar à mão — servem de caixa de entrada dentro do Studio.
 */

export const pedidoOrcamento = defineType({
  name: 'pedidoOrcamento',
  title: 'Pedido de orçamento',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'nome', title: 'Nome', type: 'string'}),
    defineField({name: 'empresa', title: 'Empresa ou instituição', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'telefone', title: 'Telefone', type: 'string'}),
    defineField({name: 'area', title: 'Área de negócio', type: 'string'}),
    defineField({name: 'mensagem', title: 'Mensagem', type: 'text', rows: 6}),
    defineField({name: 'idioma', title: 'Idioma do visitante', type: 'string'}),
    defineField({name: 'recebidoEm', title: 'Recebido em', type: 'datetime'}),
  ],
  orderings: [
    {title: 'Mais recentes', name: 'recenteDesc', by: [{field: 'recebidoEm', direction: 'desc'}]},
  ],
  preview: {
    select: {nome: 'nome', empresa: 'empresa', area: 'area', data: 'recebidoEm'},
    prepare: (sel) => ({
      title: [sel.nome, sel.empresa].filter(Boolean).join(' · ') || 'Pedido',
      subtitle: [sel.area, sel.data ? new Date(sel.data).toLocaleString('pt-PT') : null]
        .filter(Boolean)
        .join(' — '),
    }),
  },
})

export const newsletterSubscricao = defineType({
  name: 'newsletterSubscricao',
  title: 'Subscrição da newsletter',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'idioma', title: 'Idioma do visitante', type: 'string'}),
    defineField({name: 'recebidoEm', title: 'Recebido em', type: 'datetime'}),
  ],
  orderings: [
    {title: 'Mais recentes', name: 'recenteDesc', by: [{field: 'recebidoEm', direction: 'desc'}]},
  ],
  preview: {
    select: {email: 'email', data: 'recebidoEm'},
    prepare: (sel) => ({
      title: sel.email || '—',
      subtitle: sel.data ? new Date(sel.data).toLocaleString('pt-PT') : undefined,
    }),
  },
})
