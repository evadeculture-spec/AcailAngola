import { describe, expect, it } from 'vitest'
import { contactSchema, departmentForArea, isInterestArea, toFieldErrors } from '@/lib/contact/schema'

const valid = {
  name: 'Ana Silva',
  company: 'Construtora Exemplo',
  email: 'ana@example.com',
  phone: '+244 900 000 000',
  area: 'gases',
  subject: 'Pedido de informação',
  message: 'Gostaria de receber informação sobre fornecimento.',
  consent: true,
  website: '',
  startedAt: 1,
}

describe('contactSchema', () => {
  it('aceita um pedido válido e normaliza espaços', () => {
    const r = contactSchema.safeParse({ ...valid, name: '  Ana Silva  ' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.name).toBe('Ana Silva')
  })

  it('rejeita e-mail inválido com mensagem em português', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'invalido' })
    expect(r.success).toBe(false)
    if (!r.success) expect(toFieldErrors(r.error).email).toBe('Indique um endereço de e-mail válido.')
  })

  it('exige consentimento', () => {
    const r = contactSchema.safeParse({ ...valid, consent: false })
    expect(r.success).toBe(false)
    if (!r.success) expect(toFieldErrors(r.error).consent).toMatch(/política de privacidade/)
  })

  it('rejeita área desconhecida', () => {
    const r = contactSchema.safeParse({ ...valid, area: 'outra' })
    expect(r.success).toBe(false)
  })

  it('rejeita honeypot preenchido', () => {
    const r = contactSchema.safeParse({ ...valid, website: 'http://spam' })
    expect(r.success).toBe(false)
    if (!r.success) expect(toFieldErrors(r.error).website).toBeDefined()
  })

  it('remove quebras de linha de campos de linha única (injeção de cabeçalhos)', () => {
    const r = contactSchema.safeParse({ ...valid, subject: 'Olá\r\nBcc: x@y.com' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.subject).not.toMatch(/[\r\n]/)
  })

  it('rejeita telefone com caracteres inválidos', () => {
    expect(contactSchema.safeParse({ ...valid, phone: 'abc' }).success).toBe(false)
  })

  it('limita o tamanho da mensagem', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(5001) }).success).toBe(false)
  })
})

describe('encaminhamento por área', () => {
  it('mapeia áreas para departamentos', () => {
    expect(departmentForArea('gases')).toBe('gas')
    expect(departmentForArea('saude')).toBe('saude')
    expect(departmentForArea('prefabricados')).toBe('prefabricados')
    expect(departmentForArea('benguela')).toBe('lobito')
    expect(departmentForArea('geral')).toBe('geral')
  })

  it('valida valores vindos do URL', () => {
    expect(isInterestArea('gases')).toBe(true)
    expect(isInterestArea('<script>')).toBe(false)
    expect(isInterestArea(null)).toBe(false)
  })
})
