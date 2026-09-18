import type {LText} from '@/sanity/lib/queries'

/**
 * As oito áreas de negócio, com o conteúdo original em português e as
 * traduções já existentes de EN/FR para os títulos e descrições dos cartões.
 *
 * Serve de conteúdo por defeito: cada campo pode ser substituído no Sanity
 * (documentos «Áreas de negócio»). As listagens de produtos existem aqui em PT
 * e podem ser traduzidas no Studio.
 */

export interface AreaSubcat {
  titulo: LText
  itens: LText[]
}

export interface AreaContent {
  slug: string
  num: string
  /** Título da página da área. */
  titulo: LText
  /** Título curto, para cartões, menus e rodapé. */
  tituloCurto: LText
  /** Descrição breve usada no cartão da página inicial. */
  descricaoCartao: LText
  /** Parágrafo de abertura da página da área. */
  lead: LText
  /** Legenda mostrada enquanto não houver imagem de destaque. */
  legendaDestaque: string
  /** Legenda mostrada enquanto não houver imagem de cartão. */
  legendaCartao: string
  subcategorias: AreaSubcat[]
  seoDescription: string
}

const l = (pt: string, en?: string, fr?: string): LText => ({pt, en, fr})
const lista = (...itens: string[]): LText[] => itens.map((item) => ({pt: item}))

export const AREAS: AreaContent[] = [
  {
    slug: 'grafica',
    num: '01',
    titulo: l('Gráfica', 'Printing', 'Imprimerie'),
    tituloCurto: l('Gráfica', 'Printing', 'Imprimerie'),
    descricaoCartao: l(
      'Offset, digital, pré-impressão, acabamento, comunicação visual, papéis, embalagem.',
      'Offset, digital, prepress, finishing, visual communication, papers, packaging.',
      'Offset, numérique, prépresse, finition, communication visuelle, papiers, emballage.',
    ),
    lead: l(
      'A Scryptus 1 disponibiliza uma vasta e diversificada gama de produtos para os setores da impressão offset, impressão digital, comunicação visual e acabamento gráfico, respondendo às exigências de qualidade, inovação e produtividade do mercado profissional.',
      'Scryptus 1 offers a wide and diverse range of products for the offset printing, digital printing, visual communication and print finishing sectors, meeting the professional market’s demands for quality, innovation and productivity.',
      'Scryptus 1 propose une gamme vaste et diversifiée de produits pour les secteurs de l’impression offset, de l’impression numérique, de la communication visuelle et de la finition graphique, répondant aux exigences de qualité, d’innovation et de productivité du marché professionnel.',
    ),
    legendaDestaque: 'Foto — prensa offset em funcionamento',
    legendaCartao: 'Foto\nprensa offset',
    seoDescription:
      'Chapas, tintas, papéis, consumíveis digitais, comunicação visual e acabamento gráfico na Praia, Cabo Verde.',
    subcategorias: [
      {
        titulo: l('Impressão offset'),
        itens: lista(
          'Chapas offset (CTP e convencionais)',
          'Tintas offset',
          'Soluções de molha',
          'Vernizes e coatings',
          'Químicos de revelação e limpeza',
          'Blanquetas',
          'Consumíveis de acabamento',
          'Produtos para manutenção de máquinas',
        ),
      },
      {
        titulo: l('Impressão digital'),
        itens: lista(
          'Tintas e toners digitais',
          'Vinil e suportes autocolantes',
          'Lonas e materiais para grande formato',
          'Filmes e suportes especiais',
          'Consumíveis para plotters',
          'Sublimação, UV e transfer',
        ),
      },
      {
        titulo: l('Pré-impressão'),
        itens: lista(
          'Software RIP e workflow',
          'Equipamentos CTP',
          'Filmes gráficos',
          'Provas de cor',
          'Instrumentos de medição de cor',
        ),
      },
      {
        titulo: l('Acabamento e pós-impressão'),
        itens: lista(
          'Laminados',
          'Vernizes UV',
          'Encadernação',
          'Corte e vinco',
          'Plastificação',
          'Colas industriais',
          'Espirais e acessórios',
        ),
      },
      {
        titulo: l('Publicidade e comunicação visual'),
        itens: lista(
          'PVC expandido',
          'Acrílico vazado',
          'Lonas frontlit e blockout',
          'Roll-up e pop-up',
          'Vinil autocolante e decorativo',
          'Papel para plotter',
          'Balcões promocionais',
          'Brindes',
          'Iluminação',
          'Material e consumíveis para serigrafia',
          'Material e consumíveis para DTF',
        ),
      },
      {
        titulo: l('Papéis e suportes'),
        itens: lista(
          'Papel fotocópia',
          'Papel couché',
          'Papel offset',
          'Cartolina',
          'Papel fotográfico',
          'Papel autocolante',
          'Etiquetas e media especializados',
          'Envelopes e sacos de papel',
          'Envelopes almofadados',
          'Papéis para impressão digital',
        ),
      },
      {
        titulo: l('Embalagem e etiquetagem'),
        itens: lista(
          'Cartão para packaging',
          'Etiquetas autoadesivas',
          'Filmes flexíveis',
          'Tintas para embalagem',
          'Tintas e vernizes alimentares',
        ),
      },
    ],
  },
  {
    slug: 'agricultura',
    num: '02',
    titulo: l('Agricultura e pecuária', 'Agriculture and livestock', 'Agriculture et élevage'),
    tituloCurto: l('Agricultura', 'Agriculture', 'Agriculture'),
    descricaoCartao: l(
      'Estufas, rega gota a gota, hidroponia, equipamentos motorizados, identificação pecuária.',
      'Greenhouses, drip irrigation, hydroponics, motorized equipment, livestock identification.',
      'Serres, irrigation goutte à goutte, hydroponie, équipements motorisés, identification du bétail.',
    ),
    lead: l(
      'A Scryptus 1 disponibiliza uma gama de produtos e soluções para o setor agrícola, apoiando produtores e profissionais do agronegócio com produtos de elevada qualidade, eficiência e desempenho.',
      'Scryptus 1 offers a range of products and solutions for the agricultural sector, supporting producers and agribusiness professionals with products of high quality, efficiency and performance.',
      'Scryptus 1 propose une gamme de produits et de solutions pour le secteur agricole, en accompagnant les producteurs et les professionnels de l’agro-industrie avec des produits de haute qualité, efficaces et performants.',
    ),
    legendaDestaque: 'Foto — estufa em produção',
    legendaCartao: 'Foto\nestufa em produção',
    seoDescription:
      'Estufas, sistemas de rega gota a gota, hidroponia, máquinas agrícolas e identificação pecuária em Cabo Verde.',
    subcategorias: [
      {
        titulo: l('Estufas'),
        itens: lista('Estufas agrícolas', 'Estruturas e coberturas', 'Acessórios de montagem'),
      },
      {
        titulo: l('Rega e hidroponia'),
        itens: lista(
          'Sistemas de rega gota a gota',
          'Sistemas de hidroponia',
          'Tubagem, gotejadores e acessórios',
        ),
      },
      {
        titulo: l('Máquinas e equipamentos'),
        itens: lista(
          'Pequenas máquinas agrícolas',
          'Ferramentas agrícolas',
          'Equipamentos motorizados',
        ),
      },
      {
        titulo: l('Identificação pecuária'),
        itens: lista('Brincos de identificação para gado', 'Aplicadores e acessórios'),
      },
    ],
  },
  {
    slug: 'texteis',
    num: '03',
    titulo: l('Têxteis', 'Textiles', 'Textiles'),
    tituloCurto: l('Têxteis', 'Textiles', 'Textiles'),
    descricaoCartao: l(
      'Vestuário de trabalho, coletes, têxteis promocionais, sacos, bandeiras.',
      'Workwear, vests, promotional textiles, bags, flags.',
      'Vêtements de travail, gilets, textiles promotionnels, sacs, drapeaux.',
    ),
    lead: l(
      'A Scryptus 1 disponibiliza uma vasta gama de produtos têxteis cuidadosamente selecionados, adequados a diferentes necessidades profissionais e promocionais.',
      'Scryptus 1 offers a wide range of carefully selected textile products, suited to different professional and promotional needs.',
      'Scryptus 1 propose une vaste gamme de produits textiles soigneusement sélectionnés, adaptés à différents besoins professionnels et promotionnels.',
    ),
    legendaDestaque: 'Foto — vestuário de trabalho',
    legendaCartao: 'Foto\nvestuário trabalho',
    seoDescription:
      'Fardamento profissional, coletes de alta visibilidade, têxteis promocionais, sacos e bandeiras.',
    subcategorias: [
      {
        titulo: l('Vestuário de trabalho'),
        itens: lista(
          'Fardamento profissional',
          'Fatos de macaco e calças de trabalho',
          'Casacos e blusões',
        ),
      },
      {
        titulo: l('Coletes'),
        itens: lista('Coletes de trabalho', 'Coletes de alta visibilidade'),
      },
      {
        titulo: l('Têxteis promocionais'),
        itens: lista('T-shirts', 'Polos', 'Bonés', 'Bandeiras'),
      },
      {
        titulo: l('Sacos'),
        itens: lista('Sacos promocionais', 'Sacos técnicos e de transporte'),
      },
    ],
  },
  {
    slug: 'epi',
    num: '04',
    titulo: l(
      'Equipamentos de proteção individual',
      'Personal protective equipment',
      'Équipements de protection individuelle',
    ),
    tituloCurto: l('EPI', 'PPE', 'EPI'),
    descricaoCartao: l(
      'Proteção individual, calçado de segurança, antiqueda, ferramentas.',
      'Personal protection, safety footwear, fall protection, tools.',
      'Protection individuelle, chaussures de sécurité, antichute, outils.',
    ),
    lead: l(
      'A Scryptus 1 disponibiliza uma gama completa de artigos e equipamentos de proteção individual (EPI) de alta qualidade, concebidos para mitigar riscos, garantir o cumprimento das normas de segurança e assegurar o bem-estar dos trabalhadores em qualquer setor de atividade.',
      'Scryptus 1 offers a complete range of high-quality personal protective equipment (PPE), designed to mitigate risks, ensure compliance with safety standards and safeguard workers’ well-being in any sector of activity.',
      'Scryptus 1 propose une gamme complète d’articles et d’équipements de protection individuelle (EPI) de haute qualité, conçus pour réduire les risques, garantir le respect des normes de sécurité et assurer le bien-être des travailleurs dans tous les secteurs d’activité.',
    ),
    legendaDestaque: 'Foto — EPI em utilização',
    legendaCartao: 'Foto\nEPI em uso',
    seoDescription:
      'Vestuário de proteção, calçado de segurança, proteção antiqueda e ferramentas para qualquer setor.',
    subcategorias: [
      {
        titulo: l('Vestuário de proteção'),
        itens: lista('Vestuário de proteção para diferentes setores'),
      },
      {
        titulo: l('Calçado de segurança'),
        itens: lista('Calçado de segurança profissional'),
      },
      {
        titulo: l('Equipamentos de proteção individual'),
        itens: lista('Proteção da cabeça, olhos, mãos e vias respiratórias'),
      },
      {
        titulo: l('Proteção antiqueda'),
        itens: lista('Sistemas e equipamentos de proteção antiqueda'),
      },
      {
        titulo: l('Ferramentas e equipamentos'),
        itens: lista('Ferramentas e equipamentos de apoio'),
      },
    ],
  },
  {
    slug: 'mobiliario',
    num: '05',
    titulo: l('Mobiliário', 'Furniture', 'Mobilier'),
    tituloCurto: l('Mobiliário', 'Furniture', 'Mobilier'),
    descricaoCartao: l(
      'Escritório, hotelaria, comercial, escolar, urbano.',
      'Office, hospitality, retail, school, urban.',
      'Bureau, hôtellerie, commerce, scolaire, urbain.',
    ),
    lead: l(
      'A Scryptus 1 disponibiliza uma ampla gama de soluções em mobiliário para espaços corporativos, comerciais e institucionais, combinando funcionalidade, conforto, design e qualidade. Trabalhamos com produtos modernos e versáteis, adaptados às necessidades dos nossos clientes e às tendências atuais do mercado, oferecendo soluções para diferentes ambientes e projetos.',
      'Scryptus 1 offers a broad range of furniture solutions for corporate, retail and institutional spaces, combining functionality, comfort, design and quality. We work with modern, versatile products adapted to our clients’ needs and to current market trends, providing solutions for different environments and projects.',
      'Scryptus 1 propose une large gamme de solutions de mobilier pour les espaces d’entreprise, commerciaux et institutionnels, associant fonctionnalité, confort, design et qualité. Nous travaillons avec des produits modernes et polyvalents, adaptés aux besoins de nos clients et aux tendances actuelles du marché, avec des solutions pour différents environnements et projets.',
    ),
    legendaDestaque: 'Foto — sala de reuniões equipada',
    legendaCartao: 'Foto\nauditório',
    seoDescription:
      'Mobiliário de escritório, hotelaria, comercial, escolar e urbano para empresas e instituições.',
    subcategorias: [
      {
        titulo: l('Mobiliário de escritório'),
        itens: lista(
          'Secretárias e postos de trabalho',
          'Cadeiras e assentos',
          'Arrumação e arquivo',
        ),
      },
      {
        titulo: l('Hotelaria e restauração'),
        itens: lista('Mobiliário para quartos e áreas comuns', 'Mobiliário de restauração'),
      },
      {
        titulo: l('Mobiliário comercial'),
        itens: lista('Expositores e balcões', 'Equipamento de loja'),
      },
      {
        titulo: l('Mobiliário escolar'),
        itens: lista('Mesas e cadeiras escolares', 'Equipamento de sala de aula'),
      },
      {
        titulo: l('Mobiliário urbano'),
        itens: lista('Bancos e papeleiras', 'Equipamento de espaço público'),
      },
      {
        titulo: l('Decoração e setor público'),
        itens: lista(
          'Soluções de decoração para instituições',
          'Projetos para museus e hotéis',
        ),
      },
    ],
  },
  {
    slug: 'informatica',
    num: '06',
    titulo: l('Equipamento informático', 'IT equipment', 'Matériel informatique'),
    tituloCurto: l('Informática', 'IT', 'Informatique'),
    descricaoCartao: l(
      'Computadores, impressoras, monitores, rede, periféricos.',
      'Computers, printers, monitors, networking, peripherals.',
      'Ordinateurs, imprimantes, écrans, réseau, périphériques.',
    ),
    lead: l(
      'A Scryptus 1 disponibiliza uma ampla gama de soluções na área da informática, destinadas a empresas, instituições e profissionais, aliando tecnologia, desempenho, fiabilidade e inovação. Trabalhamos com equipamentos e soluções tecnológicas adaptadas às necessidades dos nossos clientes, acompanhando as exigências e tendências do mercado atual, de forma a garantir eficiência, conectividade e produtividade em diferentes ambientes de trabalho.',
      'Scryptus 1 offers a broad range of IT solutions for companies, institutions and professionals, combining technology, performance, reliability and innovation. We work with equipment and technological solutions adapted to our clients’ needs, following the demands and trends of today’s market to ensure efficiency, connectivity and productivity across different working environments.',
      'Scryptus 1 propose une large gamme de solutions informatiques destinées aux entreprises, aux institutions et aux professionnels, alliant technologie, performance, fiabilité et innovation. Nous travaillons avec des équipements et des solutions technologiques adaptés aux besoins de nos clients, en suivant les exigences et les tendances du marché actuel afin de garantir efficacité, connectivité et productivité dans différents environnements de travail.',
    ),
    legendaDestaque: 'Foto — bastidor de rede',
    legendaCartao: 'Foto\nsala servidores',
    seoDescription:
      'Computadores, impressoras, monitores, equipamento de rede e periféricos para empresas e instituições.',
    subcategorias: [
      {
        titulo: l('Computadores e portáteis'),
        itens: lista('Computadores de secretária', 'Portáteis', 'Tablets'),
      },
      {
        titulo: l('Impressoras e consumíveis'),
        itens: lista('Impressoras e multifunções', 'Consumíveis originais e compatíveis'),
      },
      {
        titulo: l('Monitores e periféricos'),
        itens: lista('Monitores', 'Scanners', 'Leitores RFID', 'Teclados, ratos e acessórios'),
      },
      {
        titulo: l('Equipamentos de rede e comunicação'),
        itens: lista('Equipamento de rede', 'Soluções de comunicação'),
      },
      {
        titulo: l('Acessórios e componentes'),
        itens: lista('Componentes informáticos', 'Acessórios diversos'),
      },
    ],
  },
  {
    slug: 'museus',
    num: '07',
    titulo: l('Museus e exposições', 'Museums & exhibitions', 'Musées & expositions'),
    tituloCurto: l('Museus e exposições', 'Museums & exhibitions', 'Musées & expositions'),
    descricaoCartao: l(
      'Vitrinas, mobiliário expositivo, soluções multimédia, áudio, cenografia.',
      'Display cases, exhibition furniture, multimedia solutions, audio, scenography.',
      'Vitrines, mobilier d’exposition, solutions multimédias, audio, scénographie.',
    ),
    lead: l(
      'Em cooperação com os especialistas do Grupo CAVEX, ao qual pertence, a Scryptus 1 oferece soluções e produtos personalizados para museus, exposições e centros de interpretação, tendo em conta tanto a longa experiência neste segmento como as últimas tendências e inovações.',
      'Together with the specialists of the CAVEX Group, to which it belongs, Scryptus 1 offers tailored solutions and products for museums, exhibitions and interpretation centres, drawing both on long experience in this field and on the latest trends and innovations.',
      'En coopération avec les spécialistes du Groupe CAVEX, auquel elle appartient, Scryptus 1 propose des solutions et des produits personnalisés pour les musées, les expositions et les centres d’interprétation, en s’appuyant autant sur une longue expérience dans ce domaine que sur les dernières tendances et innovations.',
    ),
    legendaDestaque: 'Foto — vitrina de museu',
    legendaCartao: 'Foto\nvitrina museu',
    seoDescription:
      'Vitrinas de alta segurança, mobiliário expositivo, audioguias, quiosques multimédia e cenografia.',
    subcategorias: [
      {
        titulo: l('Visitas áudio e multimédia'),
        itens: lista(
          'Sistemas de audioguias',
          'Produção e inserção de conteúdos',
          'Assistência técnica e manutenção',
        ),
      },
      {
        titulo: l('Vitrinas'),
        itens: lista('Vitrinas de alta segurança', 'Vitrinas expositivas'),
      },
      {
        titulo: l('Mobiliário expositivo'),
        itens: lista('Mobiliário para exposições', 'Mobiliário para lojas de museu'),
      },
      {
        titulo: l('Soluções multimédia'),
        itens: lista(
          'Quiosques interativos',
          'Plataformas de avaliação da experiência do visitante',
          'Conteúdos digitais e aplicações',
        ),
      },
      {
        titulo: l('Equipamentos para auditórios'),
        itens: lista('Áudio e projeção', 'Equipamento de sala'),
      },
      {
        titulo: l('Controlo ambiental'),
        itens: lista(
          'Equipamentos de controlo de humidade relativa',
          'Controlo de temperatura',
        ),
      },
      {
        titulo: l('Cenografia'),
        itens: lista('Conceção e produção cenográfica', 'Montagem de exposições'),
      },
    ],
  },
  {
    slug: 'outras-areas',
    num: '08',
    titulo: l('Outras áreas de negócio', 'Other business areas', 'Autres domaines d’activité'),
    tituloCurto: l('Outras áreas', 'Other areas', 'Autres domaines'),
    descricaoCartao: l(
      'Geradores e UPS, artigos escolares, brindes promocionais, projetos especiais.',
      'Generators and UPS, school supplies, promotional gifts, special projects.',
      'Groupes électrogènes et onduleurs, fournitures scolaires, cadeaux promotionnels, projets spéciaux.',
    ),
    lead: l(
      'Através da apresentação de propostas a consultas, no âmbito da participação em concursos públicos ou para dar resposta a solicitações especiais e personalizadas, a Scryptus 1 forneceu ao longo dos anos outros produtos específicos e diversificados, garantindo sempre a satisfação dos seus clientes.',
      'Through proposals submitted to enquiries, participation in public tenders or in response to special and customised requests, Scryptus 1 has over the years supplied other specific and diverse products, always ensuring its clients’ satisfaction.',
      'À travers des propositions remises dans le cadre de consultations, de la participation à des marchés publics ou en réponse à des demandes spéciales et personnalisées, Scryptus 1 a fourni au fil des années d’autres produits spécifiques et variés, en garantissant toujours la satisfaction de ses clients.',
    ),
    legendaDestaque: 'Foto — gerador industrial',
    legendaCartao: 'Foto\ngerador + escolar',
    seoDescription:
      'Geradores e UPS, artigos escolares, brindes promocionais e projetos especiais sob consulta.',
    subcategorias: [
      {
        titulo: l('Geradores e UPS'),
        itens: lista('Geradores', 'Unidades de alimentação ininterrupta (UPS)'),
      },
      {
        titulo: l('Artigos escolares'),
        itens: lista('Mochilas', 'Cadernos', 'Material escolar diverso'),
      },
      {
        titulo: l('Brindes publicitários e promocionais'),
        itens: lista('Brindes personalizados', 'Material promocional'),
      },
      {
        titulo: l('Projetos especiais'),
        itens: lista('Resposta a concursos públicos', 'Soluções personalizadas sob consulta'),
      },
    ],
  },
]

export const AREA_SLUGS = AREAS.map((a) => a.slug)

export function areaBySlug(slug: string): AreaContent | undefined {
  return AREAS.find((a) => a.slug === slug)
}
