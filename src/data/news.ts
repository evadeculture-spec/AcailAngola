import type { NewsItem } from '@/types/content'

/**
 * Arquivo editorial.
 *
 * Apenas são publicados itens com data e fonte confirmadas. As notícias
 * históricas do website oficial (distinções em feiras, participação em eventos
 * industriais) serão acrescentadas após recuperação e revisão do texto e das
 * datas originais — ver `docs/content-audit.md`.
 */
export const news: NewsItem[] = [
  {
    slug: '2016-visita-ministerial-polo-industrial-viana',
    title: 'Visita ministerial ao Pólo Industrial de Viana destaca a ACAIL como exemplo de produção',
    date: '2016-08',
    datePrecision: 'month',
    category: 'Imprensa',
    excerpt:
      'Em agosto de 2016, a imprensa angolana noticiou a visita da Ministra da Indústria ao Pólo Industrial de Viana, onde a ACAIL foi destacada como exemplo de produção nacional.',
    body: [
      'Em agosto de 2016, a publicação Ver Angola noticiou a visita da Ministra da Indústria de Angola ao Pólo Industrial de Viana, no decurso da qual a ACAIL foi destacada como exemplo de produção.',
      'As instalações da ACAIL no Pólo Industrial de Viana situam-se na Estrada Nacional Luanda-Catete, KM 23.',
      'A notícia original pode ser consultada na fonte indicada abaixo.',
    ],
    source: {
      name: 'Ver Angola',
      url: 'https://www.verangola.net/va/pt/082016/ComercioIndustria/5370/Ministra-da-Ind%C3%BAstria-de-Angola-visita-P%C3%B3lo-Industrial-de-Viana-e-destaca-Acail-como-exemplo-de-produ%C3%A7%C3%A3o.htm',
    },
  },
]
