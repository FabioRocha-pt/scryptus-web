import type {LText} from '@/sanity/lib/queries'

/**
 * Cabeçalhos e textos por defeito das restantes páginas interiores.
 * Tudo editável no Sanity. O que está entre *asteriscos* aparece em verde-lima.
 */

const l = (pt: string, en?: string, fr?: string): LText => ({pt, en, fr})

export const PORTEFOLIO_DEFAULTS = {
  eyebrow: l('Portefólio', 'Portfolio', 'Portfolio'),
  titulo: l(
    'Tudo o que fornecemos, *numa página.*',
    'Everything we supply, *on one page.*',
    'Tout ce que nous fournissons, *sur une page.*',
  ),
  lead: l(
    'As oito áreas de negócio e as respetivas gamas de produtos. Todas as vendas são feitas mediante orçamento, que pode pedir pelo site ou presencialmente no nosso armazém.',
    'The eight business areas and their product ranges. All sales are made against a quote, which you can request through the site or in person at our warehouse.',
    'Les huit domaines d’activité et leurs gammes de produits. Toutes les ventes se font sur devis, que vous pouvez demander sur le site ou directement à notre entrepôt.',
  ),
  aviso: l(
    'Esta listagem é uma seleção. Não hesite em contactar-nos para quaisquer outros produtos que possam ser do seu interesse ou para responder às suas necessidades específicas.',
    'This listing is a selection. Do not hesitate to contact us for any other products you may be interested in, or for your specific needs.',
    'Cette liste est une sélection. N’hésitez pas à nous contacter pour tout autre produit susceptible de vous intéresser ou pour répondre à vos besoins spécifiques.',
  ),
  seoDescription:
    'Listagem completa de produtos da Scryptus 1 nas oito áreas de negócio: gráfica, agricultura, têxteis, EPI, mobiliário, informática, museus e outras áreas.',
}

export const CONTACTOS_DEFAULTS = {
  eyebrow: l('Falar connosco', 'Talk to us', 'Contactez-nous'),
  titulo: l(
    'Peça o seu *orçamento.*',
    'Request your *quote.*',
    'Demandez votre *devis.*',
  ),
  lead: l(
    'Descreva o que precisa e responderemos com uma proposta. Se o produto não constar do site, diga-nos na mesma — a nossa rede de parceiros na Europa e na Ásia permite responder a pedidos específicos.',
    'Tell us what you need and we will come back with a proposal. If the product is not listed on the site, ask anyway — our partner network in Europe and Asia lets us answer specific requests.',
    'Décrivez ce dont vous avez besoin et nous répondrons par une proposition. Si le produit ne figure pas sur le site, demandez quand même — notre réseau de partenaires en Europe et en Asie nous permet de répondre à des demandes spécifiques.',
  ),
  formTitulo: l(
    'Diga-nos o que *precisa.*',
    'Tell us what you *need.*',
    'Dites-nous ce dont vous *avez besoin.*',
  ),
  passos: [
    {
      num: '01',
      texto: l(
        'Recebemos o seu pedido e analisamos a disponibilidade em armazém.',
        'We receive your request and check availability in our warehouse.',
        'Nous recevons votre demande et vérifions la disponibilité en entrepôt.',
      ),
    },
    {
      num: '02',
      texto: l(
        'Se o produto não estiver em stock, consultamos a nossa rede de parceiros.',
        'If the product is not in stock, we consult our partner network.',
        'Si le produit n’est pas en stock, nous consultons notre réseau de partenaires.',
      ),
    },
    {
      num: '03',
      texto: l(
        'Enviamos o orçamento com preço, prazo e condições.',
        'We send the quote with price, lead time and conditions.',
        'Nous envoyons le devis avec le prix, le délai et les conditions.',
      ),
    },
  ],
  obrigadoTitulo: l(
    'Obrigado pelo *seu contacto.*',
    'Thank you for *getting in touch.*',
    'Merci de *nous avoir contactés.*',
  ),
  obrigadoTexto: l(
    'Recebemos o seu pedido de orçamento e entraremos em contacto com a nossa proposta. Se for urgente, pode falar connosco diretamente por WhatsApp ou telefone.',
    'We have received your quote request and will get back to you with our proposal. If it is urgent, you can reach us directly by WhatsApp or phone.',
    'Nous avons reçu votre demande de devis et reviendrons vers vous avec notre proposition. Si c’est urgent, vous pouvez nous joindre directement par WhatsApp ou par téléphone.',
  ),
  seoDescription:
    'Peça um orçamento à Scryptus 1. Rua da Cruz Vermelha, Praia, Cabo Verde. Telefone (+238) 264 76 07.',
}

/**
 * Política de privacidade — apenas em português.
 * É um texto legal: a tradução para EN/FR deve ser validada pelo cliente e
 * inserida no Sanity.
 */
export const PRIVACIDADE_DEFAULTS = {
  eyebrow: l('Informação legal', 'Legal information', 'Informations légales'),
  titulo: l(
    'Política de *privacidade.*',
    'Privacy *policy.*',
    'Politique de *confidentialité.*',
  ),
  lead: l(
    'Como recolhemos, utilizamos e protegemos os dados pessoais de quem visita este site e nos contacta.',
    'How we collect, use and protect the personal data of those who visit this site and contact us.',
    'Comment nous recueillons, utilisons et protégeons les données personnelles des personnes qui visitent ce site et nous contactent.',
  ),
  secoes: [
    {
      titulo: l('Quem é responsável pelos seus dados'),
      paragrafos: [
        l(
          'Os dados recolhidos através deste site são tratados pela Scryptus 1 — Comercialização de Papéis e Produtos Gráficos, Sociedade Unipessoal, Lda., com sede na Rua da Cruz Vermelha, R/C, Praia, Santiago, Cabo Verde. Para qualquer questão relacionada com privacidade, pode contactar-nos através de info@scryptus1-caboverde.com ou do telefone (+238) 264 76 07.',
        ),
      ],
      lista: [],
    },
    {
      titulo: l('Que dados recolhemos'),
      paragrafos: [
        l('Recolhemos apenas os dados que nos fornece voluntariamente ao preencher os formulários deste site:'),
      ],
      lista: [
        l('No formulário de pedido de orçamento: nome, empresa ou instituição, email, telefone, área de negócio e a descrição do pedido.'),
        l('No formulário de subscrição da newsletter: o endereço de email.'),
      ],
      paragrafosFinais: [
        l('Não recolhemos dados de navegação para fins publicitários nem utilizamos cookies de rastreamento de terceiros.'),
      ],
    },
    {
      titulo: l('Para que utilizamos os seus dados'),
      paragrafos: [
        l('Os dados do formulário de orçamento são utilizados exclusivamente para responder ao pedido, elaborar a proposta e dar seguimento comercial ao contacto. O endereço de email da newsletter é utilizado apenas para enviar comunicações sobre novidades, eventos e ofertas da empresa.'),
        l('Não vendemos, alugamos nem cedemos os seus dados a terceiros para fins de marketing.'),
      ],
      lista: [],
    },
    {
      titulo: l('Durante quanto tempo os guardamos'),
      paragrafos: [
        l('Os pedidos de orçamento são conservados pelo período necessário ao acompanhamento comercial e ao cumprimento das obrigações legais de conservação de documentos. Os dados de subscrição da newsletter são conservados até que solicite o cancelamento da subscrição.'),
      ],
      lista: [],
    },
    {
      titulo: l('Os seus direitos'),
      paragrafos: [
        l('Pode, a qualquer momento, solicitar o acesso aos dados pessoais que temos a seu respeito, bem como a sua retificação, o seu apagamento, a limitação do tratamento ou a oposição ao mesmo. Para exercer qualquer destes direitos, basta escrever para info@scryptus1-caboverde.com.'),
      ],
      lista: [],
    },
    {
      titulo: l('Segurança'),
      paragrafos: [
        l('Adotamos medidas técnicas e organizativas adequadas para proteger os dados pessoais contra o acesso não autorizado, a perda ou a divulgação indevida. Os formulários deste site são transmitidos através de ligação encriptada.'),
      ],
      lista: [],
    },
    {
      titulo: l('Alterações a esta política'),
      paragrafos: [
        l('Esta política pode ser atualizada sempre que se justifique. A versão em vigor é sempre a que se encontra publicada nesta página.'),
      ],
      lista: [],
    },
  ],
  seoDescription:
    'Como a Scryptus 1 recolhe, utiliza e protege os dados pessoais dos visitantes do site.',
}
