import {sanityFetch} from './live'

/**
 * Lê conteúdo do Sanity sem nunca quebrar a página.
 *
 * O site tem todos os textos por defeito no código (pasta `app/content`),
 * por isso continua a funcionar com o dataset vazio, sem ligação, ou antes de
 * o cliente preencher o Studio. Nesse caso devolve `null` e quem chama usa o
 * conteúdo por defeito.
 */
export async function fetchContent<T>(
  query: string,
  params?: Record<string, string>,
): Promise<T | null> {
  try {
    const {data} = await sanityFetch({query, params})
    return (data ?? null) as T | null
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`[sanity] consulta falhou (a usar conteúdo por defeito): ${message}`)
    return null
  }
}
