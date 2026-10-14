/**
 * Redirecionamentos permanentes (301/308) das páginas do website antigo
 * (.php) para as novas rotas. Consumido por `next.config.ts`.
 *
 * Os caminhos das páginas internas de categorias do website antigo devem ser
 * confirmados com um rastreio completo antes da migração do domínio
 * (ver `docs/deployment.md`). Os URLs abaixo são os confirmados no briefing.
 */
export const legacyRedirects: { source: string; destination: string }[] = [
  { source: '/index.php', destination: '/' },
  { source: '/quem-somos.php', destination: '/empresa' },
  { source: '/servicos.php', destination: '/areas-de-negocio/servicos' },
  { source: '/portfolio.php', destination: '/projetos' },
  { source: '/noticias.php', destination: '/noticias' },
  { source: '/contactos.php', destination: '/contactos' },
]
