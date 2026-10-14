'use client'

import Link from 'next/link'
import { CircleCheck, LoaderCircle, Mail, TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { departmentById } from '@/data/company'
import {
  contactSchema,
  departmentForArea,
  interestAreas,
  isInterestArea,
  toFieldErrors,
  type ContactField,
  type ContactResponse,
  type FieldErrors,
  type InterestArea,
} from '@/lib/contact/schema'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/button'

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; reason: 'not_configured' | 'rate_limited' | 'rejected' | 'server_error' | 'network'; message: string }

interface Values {
  name: string
  company: string
  email: string
  phone: string
  area: InterestArea | ''
  subject: string
  message: string
  consent: boolean
  website: string
}

const FIELD_ORDER: ContactField[] = ['name', 'company', 'email', 'phone', 'area', 'subject', 'message', 'consent']

interface ContactFormProps {
  initialArea?: string | null
  initialSubject?: string | null
}

export function ContactForm({ initialArea, initialSubject }: ContactFormProps) {
  const [values, setValues] = useState<Values>({
    name: '',
    company: '',
    email: '',
    phone: '',
    area: isInterestArea(initialArea) ? initialArea : '',
    subject: initialSubject?.slice(0, 160) ?? '',
    message: '',
    consent: false,
    website: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const startedAt = useRef<number>(0)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status.kind === 'success' || status.kind === 'error') statusRef.current?.focus()
  }, [status])

  const payload = (v: Values) => ({ ...v, startedAt: startedAt.current })

  const validateField = (field: ContactField, next: Values) => {
    const result = contactSchema.safeParse(payload(next))
    const fieldErrors = result.success ? {} : toFieldErrors(result.error)
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
  }

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (errors[field as ContactField]) validateField(field as ContactField, next)
  }

  const onBlur = (field: ContactField) => {
    // Valida apenas campos já preenchidos para não acusar erros prematuros.
    const v = values[field as keyof Values]
    if (v !== '' && v !== false) validateField(field, values)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.kind === 'submitting') return

    const result = contactSchema.safeParse(payload(values))
    if (!result.success) {
      const fieldErrors = toFieldErrors(result.error)
      setErrors(fieldErrors)
      const first = FIELD_ORDER.find((f) => fieldErrors[f])
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setErrors({})
    setStatus({ kind: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload(values)),
      })
      const data = (await res.json().catch(() => null)) as ContactResponse | null
      if (data?.ok) {
        setStatus({ kind: 'success' })
        return
      }
      if (data && data.reason === 'validation') {
        setErrors(data.errors)
        setStatus({ kind: 'idle' })
        return
      }
      setStatus({
        kind: 'error',
        reason: data?.reason ?? 'server_error',
        message: data?.message ?? 'Ocorreu um erro inesperado. Tente novamente.',
      })
    } catch {
      setStatus({
        kind: 'error',
        reason: 'network',
        message: 'Não foi possível contactar o servidor. Verifique a ligação à Internet e tente novamente.',
      })
    }
  }

  const department = departmentById(values.area ? departmentForArea(values.area) : 'geral')
  const mailto = `mailto:${department.email}?subject=${encodeURIComponent(values.subject || 'Pedido de informação')}&body=${encodeURIComponent(
    [values.message, '', values.name, values.company, values.phone].filter((l, i) => l || i === 1).join('\n'),
  )}`

  if (status.kind === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-ink-200 bg-white p-8 outline-none sm:p-12">
        <CircleCheck aria-hidden className="size-10 text-brand-600" strokeWidth={1.5} />
        <h3 className="mt-6 font-display text-2xl font-bold text-ink-950">Mensagem enviada</h3>
        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-ink-600">
          Obrigado pelo seu contacto. A mensagem foi encaminhada para o departamento {department.name} e será respondida
          para o endereço {values.email}.
        </p>
      </div>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const submitting = status.kind === 'submitting'

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="border border-ink-200 bg-white p-6 sm:p-10" aria-describedby="form-hint">
      <p id="form-hint" className="text-sm text-ink-500">
        Os campos assinalados com <span className="text-brand-700">*</span> são obrigatórios.
      </p>

      {errorCount > 0 && (
        <div role="alert" className="mt-6 flex gap-3 border-l-2 border-red-700 bg-red-50 p-4 text-sm text-red-900">
          <TriangleAlert aria-hidden className="size-5 shrink-0" />
          <p>
            {errorCount === 1 ? 'Existe 1 campo a corrigir.' : `Existem ${errorCount} campos a corrigir.`} Reveja as
            indicações junto de cada campo.
          </p>
        </div>
      )}

      {status.kind === 'error' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 border-l-2 border-amber-600 bg-amber-50 p-5 text-[0.9375rem] text-ink-900 outline-none"
        >
          <p className="flex gap-3 font-semibold">
            <TriangleAlert aria-hidden className="size-5 shrink-0 text-amber-700" />
            {status.message}
          </p>
          <p className="mt-3 pl-8 text-sm text-ink-700">
            Pode enviar a mensagem diretamente para o departamento {department.name}:
          </p>
          <a href={mailto} className="mt-2 ml-8 inline-flex items-center gap-2 text-sm font-semibold break-all text-brand-700 hover:text-brand-900">
            <Mail aria-hidden className="size-4 shrink-0" />
            {department.email}
          </a>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id="cf-name" label="Nome" required error={errors.name}>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => onBlur('name')}
            {...invalid('cf-name', errors.name)}
            className={inputClass(errors.name)}
          />
        </Field>
        <Field id="cf-company" label="Empresa" error={errors.company}>
          <input
            id="cf-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update('company', e.target.value)}
            onBlur={() => onBlur('company')}
            {...invalid('cf-company', errors.company)}
            className={inputClass(errors.company)}
          />
        </Field>
        <Field id="cf-email" label="E-mail" required error={errors.email}>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => onBlur('email')}
            {...invalid('cf-email', errors.email)}
            className={inputClass(errors.email)}
          />
        </Field>
        <Field id="cf-phone" label="Telefone" error={errors.phone}>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => onBlur('phone')}
            {...invalid('cf-phone', errors.phone)}
            className={inputClass(errors.phone)}
          />
        </Field>
        <Field id="cf-area" label="Área de interesse" required error={errors.area} className="sm:col-span-2">
          <select
            id="cf-area"
            name="area"
            value={values.area}
            onChange={(e) => update('area', e.target.value as InterestArea | '')}
            onBlur={() => onBlur('area')}
            {...invalid('cf-area', errors.area)}
            className={cn(inputClass(errors.area), 'appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235a636e' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">Selecione…</option>
            {interestAreas.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
          {values.area && (
            <p className="mt-2 text-sm text-ink-500">
              Destino: Departamento {department.name} ({department.email})
            </p>
          )}
        </Field>
        <Field id="cf-subject" label="Assunto" required error={errors.subject} className="sm:col-span-2">
          <input
            id="cf-subject"
            name="subject"
            value={values.subject}
            maxLength={160}
            onChange={(e) => update('subject', e.target.value)}
            onBlur={() => onBlur('subject')}
            {...invalid('cf-subject', errors.subject)}
            className={inputClass(errors.subject)}
          />
        </Field>
        <Field id="cf-message" label="Mensagem" required error={errors.message} className="sm:col-span-2">
          <textarea
            id="cf-message"
            name="message"
            rows={6}
            maxLength={5000}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            onBlur={() => onBlur('message')}
            {...invalid('cf-message', errors.message)}
            className={cn(inputClass(errors.message), 'h-auto min-h-36 py-3 leading-relaxed')}
            placeholder="Descreva o produto ou serviço pretendido, quantidades, especificações e local de entrega."
          />
        </Field>

        {/* Honeypot: invisível para pessoas, preenchido por robôs. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="cf-website">Website</label>
          <input
            id="cf-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="cf-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update('consent', e.target.checked)}
              {...invalid('cf-consent', errors.consent)}
              className="mt-0.5 size-5 shrink-0 accent-brand-600"
            />
            <label htmlFor="cf-consent" className="text-sm leading-relaxed text-ink-700">
              Autorizo o tratamento dos dados indicados para resposta ao meu pedido, nos termos da{' '}
              <Link href="/politica-de-privacidade" className="font-medium text-brand-700 underline underline-offset-2">
                Política de Privacidade
              </Link>
              . <span className="text-brand-700">*</span>
            </label>
          </div>
          {errors.consent && (
            <p id="cf-consent-error" className="mt-2 pl-8 text-sm text-red-700">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} arrow={!submitting} aria-disabled={submitting}>
          {submitting && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
          {submitting ? 'A enviar…' : 'Enviar mensagem'}
        </Button>
        <p className="text-sm text-ink-500" aria-live="polite">
          {submitting ? 'A enviar a sua mensagem…' : ''}
        </p>
      </div>
    </form>
  )
}

function invalid(id: string, error?: string) {
  return {
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  }
}

function inputClass(error?: string) {
  return cn(
    'block h-12 w-full border bg-white px-4 text-[0.9375rem] text-ink-950 transition-colors placeholder:text-ink-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0',
    error
      ? 'border-red-700 focus-visible:outline-red-700'
      : 'border-ink-300 hover:border-ink-400 focus:border-brand-600 focus-visible:outline-brand-600',
  )
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-900">
        {label}
        {required && (
          <span className="text-brand-700" aria-hidden>
            {' '}
            *
          </span>
        )}
        {required && <span className="sr-only"> (obrigatório)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
