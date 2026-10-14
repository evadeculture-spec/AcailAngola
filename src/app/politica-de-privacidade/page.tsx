import Link from 'next/link'
import { departments } from '@/data/company'
import { pageMetadata } from '@/lib/seo'
import { LegalPage } from '@/components/sections/legal-page'

export const metadata = {
  ...pageMetadata({
    title: 'Política de Privacidade',
    description: 'Informação sobre o tratamento de dados pessoais no website da ACAIL Angola.',
    path: '/politica-de-privacidade',
  }),
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  const general = departments.find((d) => d.id === 'geral')
  return (
    <LegalPage title="Política de Privacidade" path="/politica-de-privacidade">
      <h2>1. Responsável pelo tratamento</h2>
      <p>
        O responsável pelo tratamento dos dados pessoais recolhidos através deste website é a ACAIL Angola, com instalações
        no Pólo Industrial de Viana, Estrada Nacional Luanda-Catete, KM 23, Luanda. A identificação jurídica completa será
        acrescentada após validação.
      </p>

      <h2>2. Dados recolhidos</h2>
      <p>O website recolhe dados pessoais apenas quando o visitante os fornece voluntariamente através do formulário de contacto:</p>
      <ul>
        <li>nome, empresa, endereço de e-mail e telefone;</li>
        <li>área de interesse, assunto e conteúdo da mensagem.</li>
      </ul>
      <p>
        Por razões de segurança, o servidor pode registar temporariamente o endereço IP do pedido para prevenir envios
        abusivos.
      </p>

      <h2>3. Finalidade</h2>
      <p>
        Os dados são utilizados exclusivamente para responder ao pedido apresentado e encaminhá-lo para o departamento
        comercial competente. Não são utilizados para fins de marketing sem consentimento específico.
      </p>

      <h2>4. Conservação e partilha</h2>
      <p>
        O prazo de conservação e a identificação dos prestadores de serviços envolvidos (alojamento do website e serviço de
        envio de e-mail) serão especificados após validação jurídica.
      </p>

      <h2>5. Direitos dos titulares</h2>
      <p>
        O titular dos dados pode solicitar o acesso, a retificação ou a eliminação dos seus dados, nos termos da legislação
        angolana aplicável à proteção de dados pessoais
        {general && (
          <>
            , através do endereço <a href={`mailto:${general.email}`}>{general.email}</a>
          </>
        )}
        .
      </p>

      <h2>6. Cookies</h2>
      <p>
        A utilização de cookies está descrita na <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>
    </LegalPage>
  )
}
