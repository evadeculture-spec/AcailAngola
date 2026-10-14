import { departmentById } from '@/data/company'
import { departmentForArea, interestAreas, type ContactData } from './schema'

export interface MailerConfig {
  apiKey: string
  from: string
  overrideTo?: string
}

/** Lê a configuração do servidor. `null` => envio não configurado. */
export function getMailerConfig(env: NodeJS.ProcessEnv = process.env): MailerConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim()
  const from = env.CONTACT_FROM_EMAIL?.trim()
  if (!apiKey || !from) return null
  return { apiKey, from, overrideTo: env.CONTACT_OVERRIDE_TO?.trim() || undefined }
}

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c)

export function buildMessage(data: ContactData) {
  const department = departmentById(departmentForArea(data.area))
  const areaLabel = interestAreas.find((a) => a.value === data.area)?.label ?? data.area
  const rows: [string, string][] = [
    ['Nome', data.name],
    ['Empresa', data.company || '—'],
    ['E-mail', data.email],
    ['Telefone', data.phone || '—'],
    ['Área de interesse', areaLabel],
    ['Assunto', data.subject],
  ]
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMensagem:\n${data.message}\n`
  const html =
    `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">` +
    rows.map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('') +
    `</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>`

  return {
    to: department.email,
    subject: `[Website] ${areaLabel} — ${data.subject}`,
    text,
    html,
  }
}

export async function sendContactEmail(config: MailerConfig, data: ContactData): Promise<void> {
  const message = buildMessage(data)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: config.from,
      to: [config.overrideTo ?? message.to],
      reply_to: data.email,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Falha no fornecedor de e-mail (HTTP ${res.status})`)
}
