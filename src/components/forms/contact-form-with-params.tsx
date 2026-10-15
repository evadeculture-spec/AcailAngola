'use client'

import { useSearchParams } from 'next/navigation'
import { ContactForm } from './contact-form'

/** Pré-preenche área e assunto a partir do URL (?area=&assunto=). */
export function ContactFormWithParams() {
  const params = useSearchParams()
  return <ContactForm initialArea={params.get('area')} initialSubject={params.get('assunto')} />
}
