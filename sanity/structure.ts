import type {StructureResolver} from 'sanity/structure'

// Documentos únicos (singletons) — um por página/secção do site
const singletons = [
  {type: 'siteSettings', title: 'Definições do site'},
  {type: 'hero', title: 'Início · Herói'},
  {type: 'oferta', title: 'Início · A nossa oferta'},
  {type: 'sobre', title: 'Início · Sobre'},
  {type: 'empresaPage', title: 'Conhecer a empresa'},
  {type: 'portefolioPage', title: 'Portefólio completo'},
  {type: 'contactosPage', title: 'Contactos'},
  {type: 'privacidadePage', title: 'Política de privacidade'},
]

const colecoes = ['area', 'cliente']
const submissoes = ['pedidoOrcamento', 'newsletterSubscricao']

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      ...singletons.map(({type, title}) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.listItem()
        .title('Áreas de negócio')
        .id('areas')
        .child(
          S.documentTypeList('area')
            .title('Áreas de negócio')
            .defaultOrdering([{field: 'num', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Clientes')
        .id('clientes')
        .child(
          S.documentTypeList('cliente')
            .title('Clientes')
            .defaultOrdering([{field: 'ordem', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Pedidos de orçamento')
        .id('pedidos')
        .child(
          S.documentTypeList('pedidoOrcamento')
            .title('Pedidos de orçamento')
            .defaultOrdering([{field: 'recebidoEm', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Newsletter')
        .id('newsletter')
        .child(
          S.documentTypeList('newsletterSubscricao')
            .title('Subscrições da newsletter')
            .defaultOrdering([{field: 'recebidoEm', direction: 'desc'}]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return (
          !!id &&
          !singletons.some((s) => s.type === id) &&
          !colecoes.includes(id) &&
          !submissoes.includes(id)
        )
      }),
    ])
