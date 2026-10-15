import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/forms/contact-form'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function fillValid() {
  fireEvent.change(screen.getByLabelText(/^Nome/), { target: { value: 'Ana Silva' } })
  fireEvent.change(screen.getByLabelText(/^E-mail/), { target: { value: 'ana@example.com' } })
  fireEvent.change(screen.getByLabelText(/^Área de interesse/), { target: { value: 'gases' } })
  fireEvent.change(screen.getByLabelText(/^Assunto/), { target: { value: 'Gases' } })
  fireEvent.change(screen.getByLabelText(/^Mensagem/), { target: { value: 'Pedido de informação sobre gases.' } })
  fireEvent.click(screen.getByLabelText(/Autorizo o tratamento/))
}

describe('ContactForm', () => {
  it('mostra erros de validação e não envia pedidos inválidos', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/ }))
    expect(await screen.findByText('Indique o seu nome.')).toBeInTheDocument()
    expect(screen.getByText(/campos a corrigir/)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Nome/)).toHaveAttribute('aria-invalid', 'true')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('pré-seleciona a área e o assunto vindos do URL', () => {
    render(<ContactForm initialArea="saude" initialSubject="Pedido — Oxigénio" />)
    expect(screen.getByLabelText(/^Área de interesse/)).toHaveValue('saude')
    expect(screen.getByLabelText(/^Assunto/)).toHaveValue('Pedido — Oxigénio')
    expect(screen.getByText(/medicinal@acailangola.com/)).toBeInTheDocument()
  })

  it('ignora área inválida no URL', () => {
    render(<ContactForm initialArea="invalida" />)
    expect(screen.getByLabelText(/^Área de interesse/)).toHaveValue('')
  })

  it('quando o envio não está configurado, apresenta o e-mail do departamento (sem simular sucesso)', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: false, reason: 'not_configured', message: 'O envio através do formulário ainda não está ativo.' }), {
        status: 503,
      }),
    )
    render(<ContactForm />)
    fillValid()
    fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/ }))
    expect(await screen.findByText(/ainda não está ativo/)).toBeInTheDocument()
    expect(screen.queryByText('Mensagem enviada')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gas@acailangola.com/ })).toHaveAttribute('href', expect.stringContaining('mailto:gas@acailangola.com'))
  })

  it('mostra confirmação apenas quando o servidor confirma o envio', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))
    render(<ContactForm />)
    fillValid()
    fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/ }))
    await waitFor(() => expect(screen.getByText('Mensagem enviada')).toBeInTheDocument())
  })
})
