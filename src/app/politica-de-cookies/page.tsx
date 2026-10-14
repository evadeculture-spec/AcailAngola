import { pageMetadata } from '@/lib/seo'
import { LegalPage } from '@/components/sections/legal-page'

export const metadata = {
  ...pageMetadata({
    title: 'Política de Cookies',
    description: 'Informação sobre a utilização de cookies e tecnologias semelhantes no website da ACAIL Angola.',
    path: '/politica-de-cookies',
  }),
  robots: { index: false, follow: true },
}

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" path="/politica-de-cookies">
      <h2>1. Cookies utilizados por este website</h2>
      <p>
        Na sua configuração atual, este website não utiliza cookies de análise, publicidade ou rastreamento, e não define
        cookies próprios para o seu funcionamento.
      </p>

      <h2>2. Conteúdos de terceiros</h2>
      <p>
        Os mapas das localizações são fornecidos pela Google e só são carregados quando o visitante clica em
        &quot;Carregar mapa&quot;. A partir desse momento, a Google pode definir cookies e recolher dados de acordo com as
        suas próprias políticas.
      </p>

      <h2>3. Alterações</h2>
      <p>
        Se vierem a ser integrados serviços que utilizem cookies não essenciais (por exemplo, ferramentas de análise de
        audiências), será solicitado o consentimento prévio do visitante e esta política será atualizada.
      </p>
    </LegalPage>
  )
}
