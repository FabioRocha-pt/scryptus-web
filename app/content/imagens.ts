/**
 * Fotografias da entrega de 29 de outubro de 2026, servidas a partir de /public/img.
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
  alt: 'Mapa-múndi digital sobre um ecrã de vidro, manuseado em reunião — comércio internacional',
  largura: 2200,
  altura: 1749,
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
    alt: 'Estufa instalada pela Scryptus 1 em Cabo Verde, com as portas abertas e fileiras de cultivo lá dentro',
    largura: 1195,
    altura: 896,
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
    alt: 'Secretárias, cadeiras operativas e blocos de gavetas de mobiliário de escritório',
    largura: 1024,
    altura: 563,
  },
  informatica: {
    src: '/img/areas/informatica.jpg',
    alt: 'Portátil, tablet, telemóvel e teclado sobre uma secretária',
    largura: 2000,
    altura: 1324,
  },
  // Fotografia nova (29/10/2026), de autoria por confirmar: se for de um projeto
  // executado pela Scryptus, precisa de autorização escrita da entidade; se for
  // licenciada, pode ir para o ar. Até o Ivandro dizer qual, o espaço fica vazio.
  museus: {
    src: '/img/areas/museus.jpg',
    alt: 'Sala de exposição com vitrinas iluminadas, mesas interativas e painel de cronologia',
    largura: 1368,
    altura: 912,
    publicar: false,
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

/**
 * Fachada da loja, para o topo de /contactos. O ficheiro ainda não existe: a
 * página só usa a fotografia se public/img/fachada.jpg estiver lá no build.
 * Horizontal, pelo menos 1600 px de largura.
 */
export const FOTO_FACHADA: FotoLocal = {
  src: '/img/fachada.jpg',
  alt: 'Fachada da loja da Scryptus 1 na Rua da Cruz Vermelha, na Praia',
  largura: 1600,
  altura: 1067,
}
