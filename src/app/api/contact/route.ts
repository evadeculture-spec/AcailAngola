import { NextResponse, type NextRequest } from 'next/server'
import { contactSchema, toFieldErrors, type ContactResponse } from '@/lib/contact/schema'
import { getMailerConfig, sendContactEmail } from '@/lib/contact/mailer'
import { createRateLimiter } from '@/lib/contact/rate-limit'

const MAX_BODY_BYTES = 20_000
const MIN_FILL_MS = 3_000
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })
}

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === req.headers.get('host')
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  // Apenas pedidos do próprio domínio.
  if (!isSameOrigin(req)) {
    return json({ ok: false, reason: 'rejected', message: 'Origem não autorizada.' }, 403)
  }
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, reason: 'rejected', message: 'Formato de pedido inválido.' }, 415)
  }

  const rate = limiter(clientIp(req))
  if (!rate.allowed) {
    return json(
      {
        ok: false,
        reason: 'rate_limited',
        message: 'Foram enviados demasiados pedidos. Aguarde alguns minutos e tente novamente.',
      },
      429,
      { 'Retry-After': String(rate.retryAfterSeconds) },
    )
  }

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, reason: 'rejected', message: 'A mensagem excede o tamanho permitido.' }, 413)
  }

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return json({ ok: false, reason: 'rejected', message: 'Formato de pedido inválido.' }, 400)
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    const errors = toFieldErrors(parsed.error)
    // Honeypot ou carimbo temporal inválido: rejeição genérica.
    if (errors.website || errors.startedAt) {
      return json({ ok: false, reason: 'rejected', message: 'Não foi possível processar o pedido.' }, 400)
    }
    return json({ ok: false, reason: 'validation', errors }, 422)
  }

  const data = parsed.data
  if (Date.now() - data.startedAt < MIN_FILL_MS) {
    return json({ ok: false, reason: 'rejected', message: 'Não foi possível processar o pedido.' }, 400)
  }

  const config = getMailerConfig()
  if (!config) {
    // Sem serviço de e-mail configurado: nunca simular sucesso.
    return json(
      {
        ok: false,
        reason: 'not_configured',
        message: 'O envio através do formulário ainda não está ativo. Utilize o endereço de e-mail do departamento.',
      },
      503,
    )
  }

  try {
    await sendContactEmail(config, data)
    return json({ ok: true }, 200)
  } catch (error) {
    console.error('[contact] envio falhou:', error instanceof Error ? error.message : error)
    return json(
      {
        ok: false,
        reason: 'server_error',
        message: 'Ocorreu um erro ao enviar a mensagem. Tente novamente ou utilize o e-mail do departamento.',
      },
      502,
    )
  }
}
