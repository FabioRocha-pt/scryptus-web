import type {LText} from '@/sanity/lib/queries'

/**
 * Conteúdo por defeito da página «Conhecer a empresa».
 * Editável no Sanity (documento «Conhecer a empresa»).
 */

const l = (pt: string, en?: string, fr?: string): LText => ({pt, en, fr})

export const EMPRESA_DEFAULTS = {
  eyebrow: l('Quem somos', 'Who we are', 'Qui sommes-nous'),
  // O que está entre *asteriscos* aparece em verde-lima.
  titulo: l(
    'Uma plataforma de comércio nascida da *experiência* em Cabo Verde.',
    'A trading platform born from *experience* in Cape Verde.',
    'Une plateforme de commerce née de l’*expérience* au Cap-Vert.',
  ),
  lead: l(
    'O seu parceiro de negócios, desde 2008. Comércio internacional, apoio técnico e consultoria, ao serviço de empresas, instituições e do setor público, em todas as ilhas do arquipélago.',
    'Your business partner since 2008. International trade, technical support and consulting for companies, institutions and the public sector, across every island of the archipelago.',
    'Votre partenaire d’affaires depuis 2008. Commerce international, assistance technique et conseil, au service des entreprises, des institutions et du secteur public, sur toutes les îles de l’archipel.',
  ),
  sobreEyebrow: l('A empresa', 'The company', 'L’entreprise'),
  sobreTitulo: l(
    'Do papel e da tinta a *oito áreas de negócio.*',
    'From paper and ink to *eight business areas.*',
    'Du papier et de l’encre à *huit domaines d’activité.*',
  ),
  pullquote: l(
    'O seu parceiro de negócios — desde 2008.',
    'Your business partner — since 2008.',
    'Votre partenaire d’affaires — depuis 2008.',
  ),
  sobreParagrafos: [
    l(
      'Fundada na cidade da Praia, ilha de Santiago, como resultado de três décadas de atividades comerciais bem-sucedidas do grupo português CAVEX em Cabo Verde, a empresa está hoje presente em todo o território nacional, realizando vendas para todas as ilhas do arquipélago.',
      'Founded in the city of Praia, Santiago island, as the result of three decades of successful commercial activity by the Portuguese group CAVEX in Cape Verde, the company is today present across the whole country, selling to every island of the archipelago.',
      'Fondée dans la ville de Praia, sur l’île de Santiago, fruit de trois décennies d’activités commerciales réussies du groupe portugais CAVEX au Cap-Vert, l’entreprise est aujourd’hui présente sur tout le territoire national et vend à toutes les îles de l’archipel.',
    ),
    l(
      'Hoje somos líderes em matéria-prima e equipamentos para imprensa offset e digital, e parceiro de referência para empresas, bancos, ministérios e câmaras municipais em oito áreas de negócio.',
      'Today we are leaders in raw materials and equipment for offset and digital printing, and a trusted partner for companies, banks, ministries and municipalities across eight business areas.',
      'Nous sommes aujourd’hui leaders en matières premières et équipements pour l’impression offset et numérique, et un partenaire de référence pour les entreprises, les banques, les ministères et les municipalités dans huit domaines d’activité.',
    ),
  ],
  estatisticas: [
    {valor: '2008', legenda: l('Fundação Scryptus 1', 'Scryptus 1 founded', 'Fondation Scryptus 1')},
    {valor: 'CAVEX', legenda: l('Grupo internacional', 'International group', 'Groupe international')},
    {
      valor: '+30',
      legenda: l(
        'Anos do grupo em Cabo Verde',
        'Years of the group in Cape Verde',
        'Années du groupe au Cap-Vert',
      ),
    },
  ],
  percursoEyebrow: l('Percurso', 'Our path', 'Parcours'),
  percursoTitulo: l(
    'Como chegámos *aqui.*',
    'How we got *here.*',
    'Comment nous sommes arrivés *ici.*',
  ),
  percursoIntro: l(
    'Cada nova área de negócio nasceu de um pedido de um cliente que já confiava na empresa para outra coisa.',
    'Every new business area started with a request from a client who already trusted us for something else.',
    'Chaque nouveau domaine d’activité est né de la demande d’un client qui nous faisait déjà confiance pour autre chose.',
  ),
  marcos: [
    {
      ano: '2008',
      titulo: l(
        'Fundação na cidade da Praia',
        'Founded in the city of Praia',
        'Fondation dans la ville de Praia',
      ),
      descricao: l(
        'A Scryptus 1 nasce como investimento direto do Grupo CAVEX em Cabo Verde, na sequência de mais de três décadas de atividade do grupo no país. A atividade inicial centra-se em matérias-primas, consumíveis e equipamentos para impressão offset e digital.',
        'Scryptus 1 is created as a direct investment by the CAVEX Group in Cape Verde, following more than three decades of the group’s activity in the country. The initial focus is raw materials, consumables and equipment for offset and digital printing.',
        'Scryptus 1 naît d’un investissement direct du Groupe CAVEX au Cap-Vert, après plus de trois décennies d’activité du groupe dans le pays. L’activité initiale se concentre sur les matières premières, les consommables et les équipements pour l’impression offset et numérique.',
      ),
    },
    {
      ano: '2014',
      titulo: l(
        'Diversificação para novos setores',
        'Diversification into new sectors',
        'Diversification vers de nouveaux secteurs',
      ),
      descricao: l(
        'A oferta alarga-se ao mobiliário, aos têxteis, à agricultura e pecuária e aos equipamentos de proteção individual, acompanhando as necessidades de clientes que já confiavam na empresa para o setor gráfico.',
        'The offer expands to furniture, textiles, agriculture and livestock, and personal protective equipment, following the needs of clients who already trusted the company for the printing sector.',
        'L’offre s’élargit au mobilier, aux textiles, à l’agriculture et à l’élevage ainsi qu’aux équipements de protection individuelle, en suivant les besoins de clients qui faisaient déjà confiance à l’entreprise pour le secteur graphique.',
      ),
    },
    {
      ano: '2022',
      titulo: l(
        'Integração de soluções informáticas',
        'Integration of IT solutions',
        'Intégration de solutions informatiques',
      ),
      descricao: l(
        'Entrada na área de equipamentos e soluções informáticas, com fornecimentos a centros de formação, museus, bancos, arquivos e ministérios.',
        'Entry into IT equipment and solutions, supplying training centres, museums, banks, archives and ministries.',
        'Entrée dans le domaine des équipements et solutions informatiques, avec des fournitures à des centres de formation, musées, banques, archives et ministères.',
      ),
    },
    {
      ano: '2024',
      titulo: l(
        'Museologia prestada diretamente',
        'Museology delivered in-house',
        'Muséologie assurée directement',
      ),
      descricao: l(
        'As competências museológicas e museográficas do grupo — antes prestadas através da FCo. e da CulTur — consolidam-se na Scryptus 1, que passa a executar diretamente estes projetos.',
        'The group’s museological and museographic expertise — previously delivered through FCo. and CulTur — is consolidated in Scryptus 1, which now runs these projects directly.',
        'Les compétences muséologiques et muséographiques du groupe — auparavant assurées via FCo. et CulTur — sont consolidées chez Scryptus 1, qui exécute désormais ces projets directement.',
      ),
    },
    {
      ano: '2026',
      titulo: l(
        'Departamento de plataformas digitais',
        'Digital platforms department',
        'Département des plateformes numériques',
      ),
      descricao: l(
        'Criação de um departamento dedicado a plataformas digitais, ambientes virtuais, experiências imersivas e soluções interativas.',
        'Creation of a department dedicated to digital platforms, virtual environments, immersive experiences and interactive solutions.',
        'Création d’un département dédié aux plateformes numériques, aux environnements virtuels, aux expériences immersives et aux solutions interactives.',
      ),
    },
  ],
  trabalhoEyebrow: l('Como trabalhamos', 'How we work', 'Comment nous travaillons'),
  trabalhoTitulo: l(
    'Mais do que *fornecer.*',
    'More than *supplying.*',
    'Plus que *fournir.*',
  ),
  pilares: [
    {
      num: '01',
      titulo: l('Projetos chave na mão', 'Turnkey projects', 'Projets clés en main'),
      descricao: l(
        'Identificação de necessidades, especificações técnicas, fornecimento, instalação, acompanhamento e assistência pós-venda.',
        'Needs assessment, technical specifications, supply, installation, follow-up and after-sales support.',
        'Identification des besoins, spécifications techniques, fourniture, installation, suivi et assistance après-vente.',
      ),
    },
    {
      num: '02',
      titulo: l('Apoio e assistência técnica', 'Technical support', 'Assistance technique'),
      descricao: l(
        'Acompanhamento técnico após a entrega, com formação de utilizadores sempre que o equipamento o justifique.',
        'Technical follow-up after delivery, including user training whenever the equipment calls for it.',
        'Suivi technique après la livraison, avec formation des utilisateurs lorsque l’équipement le justifie.',
      ),
    },
    {
      num: '03',
      titulo: l('Consultoria', 'Consulting', 'Conseil'),
      descricao: l(
        'Apoio na definição de especificações e na preparação de candidaturas a concursos públicos.',
        'Support in defining specifications and preparing public tender applications.',
        'Aide à la définition des spécifications et à la préparation des candidatures aux marchés publics.',
      ),
    },
    {
      num: '04',
      titulo: l('Comércio internacional', 'International trade', 'Commerce international'),
      descricao: l(
        'Importação a partir de uma rede de parceiros na Europa e na Ásia, com exportação direta da casa-mãe em Portugal para contentores completos.',
        'Imports from a network of partners in Europe and Asia, with direct export from the parent company in Portugal for full containers.',
        'Importation depuis un réseau de partenaires en Europe et en Asie, avec exportation directe de la maison mère au Portugal pour des conteneurs complets.',
      ),
    },
  ],
  grupoEyebrow: l('Grupo CAVEX', 'CAVEX Group', 'Groupe CAVEX'),
  grupoTitulo: l(
    'Não estamos *sozinhos.*',
    'We are not *alone.*',
    'Nous ne sommes pas *seuls.*',
  ),
  grupoIntro: l(
    'A Scryptus 1 integra o Grupo CAVEX, presente em Cabo Verde há mais de trinta anos. Nos projetos museológicos, trabalha em cooperação com as empresas especializadas do grupo.',
    'Scryptus 1 is part of the CAVEX Group, present in Cape Verde for more than thirty years. On museum projects it works together with the group’s specialist companies.',
    'Scryptus 1 fait partie du Groupe CAVEX, présent au Cap-Vert depuis plus de trente ans. Pour les projets muséologiques, elle travaille en coopération avec les entreprises spécialisées du groupe.',
  ),
  grupoEmpresas: [
    {etiqueta: 'Grupo', nome: 'CAVEX'},
    {etiqueta: 'Multimédia', nome: 'FCo.'},
    {etiqueta: 'Cultura', nome: 'CulTur'},
    {etiqueta: 'Cabo Verde', nome: 'Scryptus 1'},
  ],
  imagemLegenda: 'Foto do armazém\n(Rua da Cruz Vermelha)',
  seoDescription:
    'A Scryptus 1 é uma plataforma de comércio internacional, apoio técnico e consultoria sediada na Praia, Cabo Verde, do Grupo CAVEX.',
}
