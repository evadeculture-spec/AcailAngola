import type { Department, Location } from '@/types/content'

/**
 * Dados institucionais. Fonte: briefing do cliente e website oficial
 * (www.acailangola.com). Ver `docs/content-audit.md` para o estado de validação.
 */
export const company = {
  name: 'ACAIL Angola',
  legalName: 'ACAIL Angola',
  foundingYear: 2005,
  country: 'Angola',
  sectorsCount: 6,
  locationsCount: 3,
  description:
    'Empresa industrial angolana, constituída em 2005, com atividade nos produtos siderúrgicos, gases industriais, medicinais e alimentares, saúde, pré-fabricação em betão, inertes e serviços industriais.',
  headquarters: {
    street: 'Pólo Industrial de Viana, Estrada Nacional Luanda-Catete, KM 23',
    locality: 'Viana',
    region: 'Luanda',
    country: 'AO',
  },
  commitment: 'Qualidade, Segurança e Ambiente',
} as const

export const departments: Department[] = [
  {
    id: 'geral',
    name: 'Geral',
    email: 'geral@acailangola.com',
    description: 'Informação institucional, parcerias e pedidos de carácter geral.',
  },
  {
    id: 'gas',
    name: 'Gases',
    email: 'gas@acailangola.com',
    description: 'Gases industriais e alimentares, redes de distribuição e fornecimento.',
  },
  {
    id: 'soldadura',
    name: 'Soldadura',
    email: 'soldadura@acailangola.com',
    description: 'Equipamentos de soldadura, corte e consumíveis.',
  },
  {
    id: 'saude',
    name: 'Saúde',
    email: 'medicinal@acailangola.com',
    description: 'Gases medicinais, equipamento e material médico, medicamentos e redes hospitalares.',
  },
  {
    id: 'prefabricados',
    name: 'Pré-Fabricados',
    email: 'prefabricados@acailangola.com',
    description: 'Postes, blocos, tubos, lancis e outros elementos pré-fabricados de betão.',
  },
  {
    id: 'lobito',
    name: 'Lobito / Benguela',
    email: 'acail.lobito@acailangola.com',
    description: 'Atendimento comercial na região de Benguela.',
  },
]

export const locations: Location[] = [
  {
    id: 'viana',
    name: 'Luanda — Viana',
    region: 'Luanda',
    role: 'Pólo industrial e sede operacional',
    address: 'Pólo Industrial de Viana, Estrada Nacional Luanda-Catete, KM 23, Viana, Luanda',
    mapQuery: 'Pólo Industrial de Viana, Estrada Luanda-Catete km 23, Angola',
  },
  {
    id: 'mazozo',
    name: 'Icolo e Bengo — Mazozo',
    region: 'Icolo e Bengo',
    role: 'Unidade de pré-fabricados de betão',
    address: 'Mazozo, Icolo e Bengo',
    mapQuery: 'Mazozo, Icolo e Bengo, Angola',
  },
  {
    id: 'catumbela',
    name: 'Benguela — Catumbela',
    region: 'Benguela',
    role: 'Unidade industrial',
    address: 'Pólo de Desenvolvimento Industrial da Catumbela, Fase I, Catumbela, Benguela',
    mapQuery: 'Pólo de Desenvolvimento Industrial da Catumbela, Benguela, Angola',
  },
]

export const values: { title: string; description: string }[] = [
  {
    title: 'Satisfação do cliente',
    description: 'Compreender as exigências de cada projeto e responder com rigor, prazo e acompanhamento.',
  },
  {
    title: 'Qualidade',
    description: 'Qualidade dos processos produtivos e dos produtos como critério permanente de decisão.',
  },
  {
    title: 'Pessoas',
    description: 'Formação e valorização dos recursos humanos como base da capacidade de execução.',
  },
  {
    title: 'Melhoria contínua',
    description: 'Revisão sistemática de métodos e resultados para ganhar eficiência operacional.',
  },
  {
    title: 'Flexibilidade',
    description: 'Adaptação às exigências do mercado e às necessidades específicas de cada cliente.',
  },
  {
    title: 'Compromisso',
    description: 'Dedicação e responsabilidade na execução, do pedido à entrega.',
  },
]

export function departmentById(id: Department['id']): Department {
  const dept = departments.find((d) => d.id === id)
  if (!dept) throw new Error(`Departamento desconhecido: ${id}`)
  return dept
}

export function directionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`
}

export function mapEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}
