import type { Sector } from '@/types/content'

export const sectors: Sector[] = [
  {
    slug: 'produtos-siderurgicos',
    order: 1,
    name: 'Produtos Siderúrgicos',
    shortName: 'Siderurgia',
    tagline: 'Aço para construção, metalomecânica e indústria.',
    summary:
      'Varão de construção, malha eletrossoldada, perfis, chapas, tubos, inox, equipamentos industriais e consumíveis de soldadura.',
    intro: [
      'A área de Produtos Siderúrgicos reúne as famílias de aço utilizadas na construção civil, em obras de infraestrutura e na metalomecânica, desde as armaduras para betão armado até aos perfis estruturais, chapas e tubos.',
      'Complementa a oferta com produtos em inox, equipamentos industriais e uma gama de soldadura e consumíveis, permitindo que empreiteiros e indústrias concentrem num único fornecedor uma parte significativa das suas necessidades de material.',
    ],
    families: [
      { name: 'Varão de construção', description: 'Armaduras para estruturas de betão armado.' },
      { name: 'Malha eletrossoldada', description: 'Painéis de armadura para lajes, pavimentos e paredes.' },
      { name: 'Arame e pregos', description: 'Arame para atar armaduras e pregaria para construção.' },
      { name: 'Barramentos', description: 'Barras de aço para aplicações estruturais e de serralharia.' },
      { name: 'Perfis e vigas', description: 'Perfis laminados para estruturas metálicas.' },
      { name: 'Chapas', description: 'Chapa de aço para metalomecânica, construção e indústria.' },
      { name: 'Tubos', description: 'Tubos de aço para aplicações estruturais e industriais.' },
      { name: 'Produtos em inox', description: 'Soluções em aço inoxidável para ambientes exigentes.' },
      { name: 'Equipamentos industriais', description: 'Equipamentos de apoio à produção e à obra.' },
      { name: 'Soldadura e consumíveis', description: 'Equipamentos de soldadura, corte e respetivos consumíveis.' },
    ],
    audiences: ['Empresas de construção e empreiteiros', 'Gabinetes de engenharia', 'Metalomecânica e serralharia', 'Indústria'],
    department: 'geral',
    extraDepartments: ['soldadura'],
    visual: 'steel',
    seo: {
      title: 'Produtos Siderúrgicos',
      description:
        'Varão de construção, malha eletrossoldada, perfis, vigas, chapas, tubos, inox e soldadura. Soluções em aço da ACAIL Angola para construção e indústria.',
    },
  },
  {
    slug: 'gases',
    order: 2,
    name: 'Gases Industriais, Medicinais e Alimentares',
    shortName: 'Gases',
    tagline: 'Produção, fornecimento e redes de distribuição de gases.',
    summary:
      'Produção e fornecimento de gases para soldadura e corte, indústria alimentar e saúde, com instalação, inspeção e manutenção de redes.',
    intro: [
      'A ACAIL Angola produz e fornece gases destinados à indústria, ao setor alimentar e às unidades de saúde. A oferta acompanha o cliente desde a escolha do gás adequado à aplicação até à infraestrutura que o distribui.',
      'Para além do fornecimento, a área de Gases projeta e executa redes de distribuição, assegurando também a sua inspeção e manutenção, para que a operação do cliente decorra com segurança e continuidade.',
    ],
    families: [
      { name: 'Produção e fornecimento de gases', description: 'Gases industriais, alimentares e medicinais.' },
      { name: 'Gases para soldadura e corte', description: 'Gases de proteção e de corte para metalomecânica.' },
      { name: 'Gases para a indústria alimentar', description: 'Gases utilizados em processos do setor alimentar.' },
      { name: 'Gases medicinais', description: 'Fornecimento a unidades de saúde.' },
      { name: 'Redes de distribuição', description: 'Conceção e instalação de redes de gases.' },
      { name: 'Inspeção e manutenção', description: 'Acompanhamento técnico das redes instaladas.' },
    ],
    audiences: ['Indústria e metalomecânica', 'Indústria alimentar e de bebidas', 'Hospitais e clínicas', 'Empreiteiros de instalações técnicas'],
    department: 'gas',
    extraDepartments: ['saude'],
    visual: 'gas',
    seo: {
      title: 'Gases Industriais, Medicinais e Alimentares',
      description:
        'Produção e fornecimento de gases industriais, medicinais e alimentares em Angola, com instalação, inspeção e manutenção de redes de distribuição.',
    },
  },
  {
    slug: 'saude',
    order: 3,
    name: 'Saúde',
    shortName: 'Saúde',
    tagline: 'Soluções técnicas para unidades de saúde.',
    summary:
      'Equipamentos médicos e hospitalares, material médico, medicamentos, gases medicinais e redes hospitalares de distribuição de gases.',
    intro: [
      'A área de Saúde apoia hospitais, clínicas e outras unidades de saúde com equipamentos médicos e hospitalares, material médico e medicamentos.',
      'A ligação à área de Gases permite oferecer uma solução integrada para os gases medicinais: o fornecimento do gás e a rede hospitalar que o distribui até ao ponto de utilização.',
    ],
    families: [
      { name: 'Equipamentos médicos e hospitalares', description: 'Equipamento para unidades de saúde.' },
      { name: 'Material médico', description: 'Material de utilização clínica e hospitalar.' },
      { name: 'Medicamentos', description: 'Armazenamento e distribuição por grosso.' },
      { name: 'Gases medicinais', description: 'Fornecimento contínuo a unidades de saúde.' },
      { name: 'Redes hospitalares de gases', description: 'Instalação de redes de gases medicinais.' },
      { name: 'Soluções técnicas', description: 'Apoio técnico a unidades de saúde.' },
    ],
    audiences: ['Hospitais e clínicas', 'Entidades públicas de saúde', 'Empreiteiros de unidades hospitalares', 'Distribuidores'],
    department: 'saude',
    visual: 'health',
    seo: {
      title: 'Saúde — Equipamentos, Medicamentos e Gases Medicinais',
      description:
        'Equipamentos médicos e hospitalares, material médico, medicamentos, gases medicinais e redes hospitalares de gases para unidades de saúde em Angola.',
    },
  },
  {
    slug: 'pre-fabricacao-betao',
    order: 4,
    name: 'Pré-Fabricação em Betão',
    shortName: 'Pré-Fabricação',
    tagline: 'Elementos de betão para construção e infraestruturas.',
    summary: 'Postes, blocos, tubos, lancis e outros elementos pré-fabricados de betão produzidos na unidade de Mazozo.',
    intro: [
      'A unidade de pré-fabricados de betão, localizada em Mazozo, Icolo e Bengo, produz elementos destinados à construção e às infraestruturas, como postes, blocos, tubos e lancis.',
      'A pré-fabricação permite ao cliente receber elementos produzidos em ambiente controlado, prontos a aplicar, com ganhos de prazo e regularidade em obra.',
    ],
    families: [
      { name: 'Postes', description: 'Postes de betão para redes e infraestruturas.' },
      { name: 'Blocos', description: 'Blocos de betão para alvenaria.' },
      { name: 'Tubos', description: 'Tubos de betão para drenagem e saneamento.' },
      { name: 'Lancis', description: 'Lancis para arruamentos e espaços públicos.' },
      { name: 'Outros elementos pré-fabricados', description: 'Elementos para construção e infraestruturas.' },
    ],
    audiences: ['Empresas de construção', 'Entidades responsáveis por infraestruturas', 'Organismos públicos', 'Promotores imobiliários'],
    department: 'prefabricados',
    visual: 'precast',
    seo: {
      title: 'Pré-Fabricação em Betão — Postes, Blocos e Lancis',
      description:
        'Postes, blocos, tubos, lancis e elementos pré-fabricados de betão produzidos pela ACAIL Angola em Mazozo, Icolo e Bengo, para construção e infraestruturas.',
    },
  },
  {
    slug: 'inertes',
    order: 5,
    name: 'Inertes',
    shortName: 'Inertes',
    tagline: 'Agregados para betão, pavimentação e construção.',
    summary: 'Areias, brita e burgau para betão, argamassas, pavimentação e obras de construção.',
    intro: [
      'A área de Inertes fornece os agregados de base da construção: areias, brita e burgau, utilizados no fabrico de betões e argamassas, em pavimentação e em trabalhos de terraplenagem.',
      'O fornecimento de inertes complementa as áreas de siderurgia e de pré-fabricação, permitindo responder a diferentes fases da obra.',
    ],
    families: [
      { name: 'Areias', description: 'Para betões, argamassas e enchimentos.' },
      { name: 'Brita', description: 'Agregado britado para betão e pavimentação.' },
      { name: 'Burgau', description: 'Agregado rolado para betão e drenagem.' },
    ],
    audiences: ['Empresas de construção', 'Centrais de betão', 'Obras de infraestrutura', 'Organismos públicos'],
    department: 'geral',
    visual: 'aggregates',
    seo: {
      title: 'Inertes — Areias, Brita e Burgau',
      description: 'Fornecimento de areias, brita e burgau para betão, argamassas e pavimentação em Angola.',
    },
  },
  {
    slug: 'servicos',
    order: 6,
    name: 'Serviços Industriais',
    shortName: 'Serviços',
    tagline: 'Execução técnica e apoio à obra e à indústria.',
    summary:
      'Furos artesianos, aluguer de auto-gruas, varão moldado, estacas, oxicorte, redes de gases e distribuição por grosso de medicamentos.',
    intro: [
      'A área de Serviços Industriais coloca os meios técnicos e humanos da ACAIL Angola ao serviço de obras e unidades industriais, desde a captação de água por furos artesianos até à elevação de cargas com auto-gruas.',
      'Inclui ainda serviços diretamente ligados às restantes áreas: varão moldado à medida do projeto, oxicorte, instalação de redes de gases industriais e medicinais e armazenamento e distribuição por grosso de medicamentos.',
    ],
    families: [
      { name: 'Furos artesianos', description: 'Execução de furos para captação de água.' },
      { name: 'Aluguer de auto-gruas', description: 'Meios de elevação para obra e indústria.' },
      { name: 'Varão moldado', description: 'Corte e dobragem de armaduras segundo projeto.' },
      { name: 'Estacas', description: 'Execução de estacas para fundações.' },
      { name: 'Oxicorte', description: 'Corte térmico de chapa e perfis.' },
      { name: 'Redes de gases industriais', description: 'Instalação de redes em unidades industriais.' },
      { name: 'Redes de gases medicinais', description: 'Instalação de redes em unidades de saúde.' },
      { name: 'Distribuição de medicamentos', description: 'Armazenamento e distribuição por grosso.' },
    ],
    audiences: ['Empresas de construção', 'Indústria', 'Unidades de saúde', 'Organismos públicos'],
    department: 'geral',
    extraDepartments: ['gas', 'saude'],
    visual: 'services',
    seo: {
      title: 'Serviços Industriais',
      description:
        'Furos artesianos, aluguer de auto-gruas, varão moldado, estacas, oxicorte e instalação de redes de gases industriais e medicinais em Angola.',
    },
  },
]
