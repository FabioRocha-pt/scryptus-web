'use client'

/**
 * Configuração do Sanity Studio, montado em /studio (app/studio/[[...tool]]/page.tsx).
 *
 * Pensado para quem não é técnico: interface em português, cores do site,
 * menu arrumado pelas partes do site e sem ferramentas de programador.
 */

import {ptPTLocale} from '@sanity/locale-pt-pt'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {SINGLETONS, SUBMISSOES, structure} from './sanity/structure'
import {Layout} from './sanity/studio/Layout'
import {Marca} from './sanity/studio/Marca'
import {tema} from './sanity/studio/tema'

// Ações que não fazem sentido num documento único (há sempre exatamente um).
const ACOES_UNICO = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Scryptus 1',
  icon: Marca,
  theme: tema,
  schema: {
    ...schema,
    // «Criar novo» só oferece áreas e clientes.
    templates: (modelos) =>
      modelos.filter(({schemaType}) => !SINGLETONS.includes(schemaType) && !SUBMISSOES.includes(schemaType)),
  },
  document: {
    actions: (acoes, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? acoes.filter(({action}) => action && ACOES_UNICO.has(action))
        : acoes,
  },
  studio: {components: {layout: Layout}},
  plugins: [
    structureTool({structure, title: 'Conteúdo'}),
    ptPTLocale(),
    // Consultas GROQ: só em desenvolvimento, para não confundir quem edita.
    ...(process.env.NODE_ENV === 'development' ? [visionTool({defaultApiVersion: apiVersion})] : []),
  ],
})
