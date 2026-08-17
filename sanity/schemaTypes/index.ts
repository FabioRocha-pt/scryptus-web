import { type SchemaTypeDefinition } from 'sanity'

import {
  empresaGrupo,
  estatistica,
  figura,
  localeString,
  localeText,
  marcoTemporal,
  passoProcesso,
  pilar,
  secaoTexto,
  subcategoria,
} from './objects'
import { siteSettings } from './siteSettings'
import { hero } from './hero'
import { oferta } from './oferta'
import { sobre } from './sobre'
import { area } from './area'
import { cliente } from './cliente'
import { contactosPage, empresaPage, portefolioPage, privacidadePage } from './paginas'
import { newsletterSubscricao, pedidoOrcamento } from './submissoes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objetos reutilizáveis
    localeString,
    localeText,
    figura,
    subcategoria,
    estatistica,
    pilar,
    marcoTemporal,
    secaoTexto,
    empresaGrupo,
    passoProcesso,
    // Documentos únicos
    siteSettings,
    hero,
    oferta,
    sobre,
    empresaPage,
    portefolioPage,
    contactosPage,
    privacidadePage,
    // Coleções
    area,
    cliente,
    // Caixa de entrada dos formulários
    pedidoOrcamento,
    newsletterSubscricao,
  ],
}
