import { z } from 'zod'
import type { DepartmentId, SectorSlug } from '@/types/content'

/** Áreas de interesse do formulário e departamento de destino. */
export const interestAreas = [
  { value: 'siderurgia', label: 'Produtos Siderúrgicos', department: 'geral' },
  { value: 'soldadura', label: 'Soldadura e consumíveis', department: 'soldadura' },
  { value: 'gases', label: 'Gases industriais e alimentares', department: 'gas' },
  { value: 'saude', label: 'Saúde e gases medicinais', department: 'saude' },
  { value: 'prefabricados', label: 'Pré-Fabricação em Betão', department: 'prefabricados' },
  { value: 'inertes', label: 'Inertes', department: 'geral' },
  { value: 'servicos', label: 'Serviços Industriais', department: 'geral' },
  { value: 'benguela', label: 'Atendimento em Benguela / Lobito', department: 'lobito' },
  { value: 'geral', label: 'Assunto geral / institucional', department: 'geral' },
] as const satisfies ReadonlyArray<{ value: string; label: string; department: DepartmentId }>

export type InterestArea = (typeof interestAreas)[number]['value']

const areaValues = interestAreas.map((a) => a.value) as [InterestArea, ...InterestArea[]]

export function isInterestArea(value: string | null | undefined): value is InterestArea {
  return !!value && (areaValues as string[]).includes(value)
}

/** Remove caracteres de controlo (mantém quebras de linha nos campos de texto longo). */
const clean = (v: string) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
const singleLine = (v: string) => clean(v).replace(/[\r\n]+/g, ' ')

export const contactSchema = z.object({
  name: z
    .string()
    .transform(singleLine)
    .pipe(z.string().min(2, 'Indique o seu nome.').max(120, 'O nome é demasiado longo.')),
  company: z
    .string()
    .transform(singleLine)
    .pipe(z.string().max(160, 'O nome da empresa é demasiado longo.')),
  email: z
    .string()
    .transform(singleLine)
    .pipe(z.email('Indique um endereço de e-mail válido.').max(200, 'O e-mail é demasiado longo.')),
  phone: z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .string()
        .max(30, 'O telefone é demasiado longo.')
        .regex(/^[+()\d\s.-]*$/, 'Utilize apenas números, espaços e os símbolos + ( ) -.'),
    ),
  area: z.enum(areaValues, { error: 'Selecione a área de interesse.' }),
  subject: z
    .string()
    .transform(singleLine)
    .pipe(z.string().min(3, 'Indique o assunto.').max(160, 'O assunto é demasiado longo.')),
  message: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .min(10, 'A mensagem deve ter pelo menos 10 caracteres.')
        .max(5000, 'A mensagem é demasiado longa.'),
    ),
  consent: z.literal(true, { error: 'É necessário aceitar a política de privacidade.' }),
  /** Honeypot: tem de chegar vazio. */
  website: z.string().max(0).optional().default(''),
  /** Momento (ms) em que o formulário foi apresentado — deteção de envios automáticos. */
  startedAt: z.number().int().nonnegative(),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactData = z.output<typeof contactSchema>
export type ContactField = keyof ContactData
export type FieldErrors = Partial<Record<ContactField, string>>

export function departmentForArea(area: InterestArea): DepartmentId {
  return interestAreas.find((a) => a.value === area)?.department ?? 'geral'
}

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}

/** Resposta da API de contacto (partilhada entre servidor e cliente). */
export type ContactResponse =
  | { ok: true }
  | { ok: false; reason: 'validation'; errors: FieldErrors }
  | { ok: false; reason: 'not_configured' | 'rate_limited' | 'rejected' | 'server_error'; message: string }

/** Área do formulário correspondente a cada setor (pré-seleção a partir das páginas). */
export const sectorToArea: Record<SectorSlug, InterestArea> = {
  'produtos-siderurgicos': 'siderurgia',
  gases: 'gases',
  saude: 'saude',
  'pre-fabricacao-betao': 'prefabricados',
  inertes: 'inertes',
  servicos: 'servicos',
}
