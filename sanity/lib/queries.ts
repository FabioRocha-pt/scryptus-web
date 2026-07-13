import {defineQuery} from 'next-sanity'

// Todas as imagens da página inicial numa única consulta
export const HOME_IMAGES_QUERY = defineQuery(`{
  "hero": *[_type == "hero"][0]{ mainImage, secondaryImage },
  "areasNegocio": *[_type == "areasNegocio"][0]{
    grafica, agricultura, texteis, epi, mobiliario, informatica, museus, outras
  },
  "sobre": *[_type == "sobre"][0]{ image }
}`)

export interface SanityImageWithAlt {
  asset?: {_ref: string; _type: 'reference'}
  hotspot?: {x: number; y: number; height: number; width: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  alt?: string
}

export interface HomeImages {
  hero: {
    mainImage?: SanityImageWithAlt
    secondaryImage?: SanityImageWithAlt
  } | null
  areasNegocio: {
    grafica?: SanityImageWithAlt
    agricultura?: SanityImageWithAlt
    texteis?: SanityImageWithAlt
    epi?: SanityImageWithAlt
    mobiliario?: SanityImageWithAlt
    informatica?: SanityImageWithAlt
    museus?: SanityImageWithAlt
    outras?: SanityImageWithAlt
  } | null
  sobre: {
    image?: SanityImageWithAlt
  } | null
}
