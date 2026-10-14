import { afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'

const body = {
  name: 'Ana Silva',
  company: '',
  email: 'ana@example.com',
  phone: '',
  area: 'geral',
  subject: 'Assunto',
  message: 'Mensagem de teste suficientemente longa.',
  consent: true,
  website: '',
  startedAt: Date.now() - 10_000,
}

let ip = 0
function req(payload: unknown, headers: Record<string, string> = {}) {
  ip += 1
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', host: 'localhost', 'x-forwarded-for': `10.0.0.${ip}`, ...headers },
    body: typeof payload === 'string' ? payload : JSON.stringify(payload),
  })
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('POST /api/contact', () => {
  it('responde 503 (não configurado) em vez de simular sucesso', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const res = await POST(req(body))
    expect(res.status).toBe(503)
    expect((await res.json()).reason).toBe('not_configured')
  })

  it('valida no servidor e devolve erros por campo', async () => {
    const res = await POST(req({ ...body, email: 'x' }))
    expect(res.status).toBe(422)
    const json = await res.json()
    expect(json.errors.email).toBeDefined()
  })

  it('rejeita honeypot e envios demasiado rápidos', async () => {
    expect((await POST(req({ ...body, website: 'spam' }))).status).toBe(400)
    expect((await POST(req({ ...body, startedAt: Date.now() }))).status).toBe(400)
  })

  it('rejeita origem externa e JSON inválido', async () => {
    expect((await POST(req(body, { origin: 'https://malicioso.example' }))).status).toBe(403)
    expect((await POST(req('{nao-json'))).status).toBe(400)
  })

  it('limita pedidos repetidos do mesmo IP', async () => {
    const headers = { 'x-forwarded-for': '192.168.1.1' }
    const statuses: number[] = []
    for (let i = 0; i < 6; i++) statuses.push((await POST(req({ ...body, email: 'x' }, headers))).status)
    expect(statuses.slice(0, 5).every((s) => s === 422)).toBe(true)
    expect(statuses[5]).toBe(429)
  })

  it('envia através do fornecedor quando configurado', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.stubEnv('CONTACT_FROM_EMAIL', 'website@acailangola.com')
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
    const res = await POST(req(body))
    expect(res.status).toBe(200)
    const [, init] = fetchSpy.mock.calls[0]!
    expect(JSON.parse(String((init as RequestInit).body)).to).toEqual(['geral@acailangola.com'])
  })

  it('devolve 502 quando o fornecedor falha', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.stubEnv('CONTACT_FROM_EMAIL', 'website@acailangola.com')
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 500 }))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect((await POST(req(body))).status).toBe(502)
  })
})
