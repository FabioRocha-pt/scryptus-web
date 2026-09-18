import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

/**
 * Cliente com permissão de escrita, usado apenas nos server actions dos
 * formulários (pedido de orçamento e newsletter).
 *
 * Precisa da variável de ambiente SANITY_API_WRITE_TOKEN — um token com
 * permissão "Editor" criado em sanity.io/manage. Nunca é exposto ao browser.
 */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN

export const hasWriteAccess = Boolean(writeToken)

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
  perspective: 'published',
})
