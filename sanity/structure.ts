import {
  BookIcon,
  CaseIcon,
  CogIcon,
  DocumentsIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  LockIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from '@sanity/icons'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

import {Guia} from './studio/Guia'

/**
 * Menu do Studio, arrumado pelas partes do site e com nomes que dispensam
 * explicação. Os documentos únicos abrem diretamente, sem lista pelo meio.
 */

/** Documentos únicos — um por página ou secção do site. */
export const SINGLETONS = [
  'siteSettings',
  'hero',
  'oferta',
  'sobre',
  'empresaPage',
  'portefolioPage',
  'contactosPage',
  'privacidadePage',
]

/** Tipos que só o site cria (formulários): não aparecem em «Criar novo». */
export const SUBMISSOES = ['pedidoOrcamento', 'newsletterSubscricao']

const unico = (S: StructureBuilder, type: string, title: string, icon: ComponentType) =>
  S.listItem()
    .title(title)
    .id(type)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Site Scryptus 1')
    .items([
      S.listItem()
        .title('Começar aqui')
        .id('guia')
        .icon(HelpCircleIcon)
        .child(S.component(Guia).id('guia').title('Começar aqui')),
      S.divider(),

      S.listItem()
        .title('Página inicial')
        .id('inicio')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Página inicial')
            .items([
              unico(S, 'hero', 'Topo com fotografia', ImageIcon),
              unico(S, 'oferta', 'A nossa oferta', StarIcon),
              unico(S, 'sobre', 'Sobre (armazém)', BookIcon),
            ]),
        ),
      S.listItem()
        .title('Áreas de negócio')
        .id('areas')
        .icon(TagIcon)
        .child(
          S.documentTypeList('area')
            .title('Áreas de negócio')
            .defaultOrdering([{field: 'num', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Clientes')
        .id('clientes')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('cliente')
            .title('Clientes')
            .defaultOrdering([{field: 'ordem', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Páginas')
        .id('paginas')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Páginas')
            .items([
              unico(S, 'empresaPage', 'Conhecer a empresa', CaseIcon),
              unico(S, 'portefolioPage', 'Portefólio completo', DocumentTextIcon),
              unico(S, 'contactosPage', 'Contactos', EnvelopeIcon),
              unico(S, 'privacidadePage', 'Política de privacidade', LockIcon),
            ]),
        ),
      S.divider(),

      S.listItem()
        .title('Caixa de entrada')
        .id('caixa')
        .icon(InboxIcon)
        .child(
          S.list()
            .title('Caixa de entrada')
            .items([
              S.listItem()
                .title('Pedidos de orçamento')
                .id('pedidos')
                .icon(InboxIcon)
                .child(
                  S.documentTypeList('pedidoOrcamento')
                    .title('Pedidos de orçamento')
                    .defaultOrdering([{field: 'recebidoEm', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Newsletter')
                .id('newsletter')
                .icon(EnvelopeIcon)
                .child(
                  S.documentTypeList('newsletterSubscricao')
                    .title('Subscrições da newsletter')
                    .defaultOrdering([{field: 'recebidoEm', direction: 'desc'}]),
                ),
            ]),
        ),
      S.divider(),
      unico(S, 'siteSettings', 'Definições do site', CogIcon),
    ])
