import type { Project } from '@/types/content'

/**
 * Referências históricas constantes do portefólio do website oficial.
 *
 * O campo `scope` (âmbito do fornecimento) só deve ser preenchido com
 * informação documentalmente confirmada pela ACAIL Angola. As localizações
 * indicadas correspondem à localização pública de cada obra.
 */
export const projects: Project[] = [
  {
    slug: 'ponte-da-catumbela',
    name: 'Ponte da Catumbela',
    location: 'Catumbela, Benguela',
    category: 'Infraestruturas',
    summary: 'Travessia rodoviária sobre o rio Catumbela, entre os municípios de Benguela e do Lobito.',
  },
  {
    slug: 'empreendimento-comandante-gika',
    name: 'Empreendimento Comandante Gika',
    location: 'Luanda',
    category: 'Edifícios e empreendimentos',
    summary: 'Empreendimento de uso misto em Luanda.',
  },
  {
    slug: 'nova-assembleia-nacional',
    name: 'Nova Assembleia Nacional',
    location: 'Luanda',
    category: 'Edifícios institucionais',
    summary: 'Edifício-sede da Assembleia Nacional de Angola, em Luanda.',
  },
  {
    slug: 'hospital-prenda',
    name: 'Hospital Prenda',
    location: 'Luanda',
    category: 'Saúde',
    summary: 'Unidade hospitalar situada no bairro Prenda, em Luanda.',
  },
]
