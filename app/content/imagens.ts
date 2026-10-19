/**
 * Fotografias da entrega de 18 de outubro de 2026, servidas a partir de /public/img.
 *
 * São o valor por defeito: uma imagem carregada no Sanity para o mesmo espaço
 * sobrepõe-se a esta. Os ficheiros de Têxteis e do Armazém já vêm recortados
 * (os originais tinham preços, marca alheia e um erro de português) — não
 * voltar a recortar a partir dos originais.
 */

export interface FotoLocal {
  src: string
  alt: string
  largura: number
  altura: number
  /** object-position no banner, quando o centro da imagem não é o que interessa. */
  posicao?: string
  /**
   * false enquanto a imagem não puder ir para o ar. O espaço fica vazio
   * (gradiente e legenda), mesmo que o ficheiro já esteja no repositório.
   */
  publicar?: boolean
}

export const FOTO_HERO: FotoLocal = {
  src: '/img/hero-principal.jpg',
  alt: 'Interior de estufa instalada pela Scryptus 1 em Cabo Verde, com fileiras de plântulas e dois técnicos ao fundo',
  largura: 1920,
  altura: 1080,
}

export const FOTO_ARMAZEM: FotoLocal = {
  src: '/img/armazem.jpg',
  alt: 'Armazém da Scryptus 1 com lonas, vinis e materiais de comunicação visual em prateleiras',
  largura: 674,
  altura: 1086,
}

/** Uma fotografia por área: serve o cartão da página inicial e o banner da página. */
export const FOTOS_AREAS: Record<string, FotoLocal> = {
  grafica: {
    src: '/img/areas/grafica.jpg',
    alt: 'Conta-fios sobre prova de cor, com escala de controlo CMYK',
    largura: 503,
    altura: 577,
  },
  agricultura: {
    src: '/img/areas/agricultura.jpg',
    alt: 'Estufa túnel fornecida e instalada pela Scryptus 1',
    largura: 1668,
    altura: 1913,
  },
  texteis: {
    src: '/img/areas/texteis.jpg',
    alt: 'Arara com t-shirts, polos e vestuário de trabalho, incluindo colete refletor',
    largura: 1174,
    altura: 1558,
    posicao: '76% 50%',
  },
  epi: {
    src: '/img/areas/epi.jpg',
    alt: 'Capacete, protetores auriculares, óculos e luvas de proteção',
    largura: 924,
    altura: 1060,
  },
  mobiliario: {
    src: '/img/areas/mobiliario.jpg',
    alt: 'Copa de escritório equipada com mobiliário fornecido pela Scryptus 1',
    largura: 466,
    altura: 534,
  },
  informatica: {
    src: '/img/areas/informatica.jpg',
    alt: 'Computador, portátil, impressora, periféricos e consumíveis informáticos',
    largura: 893,
    altura: 1024,
  },
  // Render do Centro Interpretativo de São Lourenço dos Órgãos — publicação
  // autorizada (19/10/2026).
  museus: {
    src: '/img/areas/museus.jpg',
    alt: 'Sala do Centro Interpretativo de São Lourenço dos Órgãos, museografia da Scryptus 1',
    largura: 628,
    altura: 720,
  },
  'outras-areas': {
    src: '/img/areas/outras-areas.jpg',
    alt: 'Gerador, UPS, artigos escolares e brindes institucionais',
    largura: 893,
    altura: 1024,
  },
}

/** A fotografia local de uma área, se existir e puder ser publicada. */
export function fotoArea(slug: string): FotoLocal | null {
  const foto = FOTOS_AREAS[slug]
  return foto && foto.publicar !== false ? foto : null
}
