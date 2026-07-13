import type {StructureResolver} from 'sanity/structure'

// Documentos únicos (singletons) — um por secção da página
const singletons = [
  {type: 'hero', title: 'Hero'},
  {type: 'areasNegocio', title: 'Áreas de Negócio'},
  {type: 'sobre', title: 'Sobre'},
]

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
      ...S.documentTypeListItems().filter(
        (item) => !singletons.some((s) => s.type === item.getId()),
      ),
    ])
