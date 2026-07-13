import { type SchemaTypeDefinition } from 'sanity'

import { hero } from './hero'
import { areasNegocio } from './areasNegocio'
import { sobre } from './sobre'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, areasNegocio, sobre],
}
