import { describe, expect, it } from 'vitest'
import { buildMessage, getMailerConfig } from '@/lib/contact/mailer'
import type { ContactData } from '@/lib/contact/schema'

const data: ContactData = {
  name: 'Ana <b>Silva</b>',
  company: '',
  email: 'ana@example.com',
  phone: '',
  area: 'prefabricados',
  subject: 'Blocos',
  message: 'Quantidade <script>alert(1)</script>',
  consent: true,
  website: '',
  startedAt: 1,
}

describe('mailer', () => {
  it('não está configurado sem credenciais', () => {
    expect(getMailerConfig({} as NodeJS.ProcessEnv)).toBeNull()
    expect(getMailerConfig({ RESEND_API_KEY: 'k' } as unknown as NodeJS.ProcessEnv)).toBeNull()
  })

  it('lê a configuração completa', () => {
    const cfg = getMailerConfig({ RESEND_API_KEY: 'k', CONTACT_FROM_EMAIL: 'a@b.c' } as unknown as NodeJS.ProcessEnv)
    expect(cfg).toEqual({ apiKey: 'k', from: 'a@b.c', overrideTo: undefined })
  })

  it('encaminha para o departamento e escapa HTML', () => {
    const m = buildMessage(data)
    expect(m.to).toBe('prefabricados@acailangola.com')
    expect(m.html).not.toContain('<script>')
    expect(m.html).toContain('&lt;script&gt;')
    expect(m.subject).toContain('Pré-Fabricação em Betão')
  })
})
