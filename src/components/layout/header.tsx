'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { mainNav } from '@/data/navigation'
import { sectors } from '@/data/sectors'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { SectorIcon } from '@/components/visuals/sector-icon'
import { cn } from '@/lib/cn'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  const megaId = useId()
  const mobileId = useId()
  const megaButtonRef = useRef<HTMLButtonElement>(null)
  const megaWrapRef = useRef<HTMLDivElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openedByHoverAt = useRef(0)

  // Fecha os menus ao mudar de página (ajuste de estado durante a renderização).
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMegaOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Submenu: fecha com Escape ou clique fora.
  useEffect(() => {
    if (!megaOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        megaButtonRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (!megaWrapRef.current?.contains(e.target as Node)) setMegaOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [megaOpen])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    mobileButtonRef.current?.focus()
  }, [])

  // Menu mobile: bloqueia scroll, Escape fecha, foco mantido dentro do painel.
  useEffect(() => {
    if (!mobileOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = mobilePanelRef.current
    panel?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
      if (e.key === 'Tab' && panel) {
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>('a, button')).concat(
          mobileButtonRef.current ? [mobileButtonRef.current] : [],
        )
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setMobileOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [mobileOpen, closeMobile])

  const openOnHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => {
      openedByHoverAt.current = Date.now()
      setMegaOpen(true)
    }, 80)
  }
  // Um clique logo após a abertura por hover não deve voltar a fechar o painel.
  const toggleMega = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    const justOpenedByHover = megaOpen && Date.now() - openedByHoverAt.current < 600
    openedByHoverAt.current = 0
    if (justOpenedByHover) return
    setMegaOpen((v) => !v)
  }
  const closeOnLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setMegaOpen(false), 180)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/88',
        scrolled ? 'border-ink-200 shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(18,22,26,0.12)]' : 'border-ink-100',
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label="ACAIL Angola — página inicial" className="shrink-0">
          <Logo />
        </Link>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href)
              if (item.children) {
                return (
                  <li key={item.href} onMouseEnter={openOnHover} onMouseLeave={closeOnLeave}>
                    <div ref={megaWrapRef}>
                      <button
                        ref={megaButtonRef}
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls={megaId}
                        onClick={toggleMega}
                        className={cn(
                          'relative flex h-20 items-center gap-1.5 px-3 text-[0.9063rem] font-medium transition-colors',
                          active || megaOpen ? 'text-ink-950' : 'text-ink-600 hover:text-ink-950',
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          className={cn('size-4 transition-transform duration-300', megaOpen && 'rotate-180')}
                        />
                        {active && <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 bg-brand-600" />}
                      </button>
                      <div
                        id={megaId}
                        hidden={!megaOpen}
                        className="absolute inset-x-0 top-full border-t border-ink-100 bg-white shadow-[0_24px_48px_-24px_rgba(18,22,26,0.25)]"
                      >
                        <div className="container-site grid grid-cols-12 gap-10 py-10">
                          <div className="col-span-4 border-r border-ink-100 pr-10">
                            <p className="eyebrow mb-4">Áreas de Negócio</p>
                            <p className="font-display text-2xl font-bold text-ink-950">
                              Seis áreas de atividade, uma organização industrial.
                            </p>
                            <Link
                              href="/areas-de-negocio"
                              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                            >
                              <span className="link-underline">Ver todas as áreas</span>
                              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                          <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-2">
                            {sectors.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/areas-de-negocio/${s.slug}`}
                                  aria-current={pathname === `/areas-de-negocio/${s.slug}` ? 'page' : undefined}
                                  className="group flex gap-4 rounded-[2px] p-3 transition-colors hover:bg-ink-50"
                                >
                                  <span className="grid size-10 shrink-0 place-items-center border border-ink-200 text-brand-600 transition-colors group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                                    <SectorIcon slug={s.slug} className="size-5" />
                                  </span>
                                  <span>
                                    <span className="block text-[0.9375rem] font-semibold text-ink-950">{s.name}</span>
                                    <span className="mt-0.5 block text-sm text-ink-500">{s.tagline}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(
                      'relative flex h-20 items-center px-3 text-[0.9063rem] font-medium transition-colors',
                      active ? 'text-ink-950' : 'text-ink-600 hover:text-ink-950',
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 bg-brand-600" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <ButtonLink href="/contactos#formulario" size="md">
              Solicitar Informações
            </ButtonLink>
          </div>
          <button
            ref={mobileButtonRef}
            type="button"
            className="-mr-2 grid size-11 place-items-center text-ink-950 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      <div
        id={mobileId}
        ref={mobilePanelRef}
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-ink-100 bg-white lg:hidden"
      >
        <nav aria-label="Navegação principal (móvel)" className="container-site pt-4 pb-10">
          <ul className="divide-y divide-ink-100">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href)
              if (item.children) {
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      aria-expanded={mobileSectorsOpen}
                      onClick={() => setMobileSectorsOpen((v) => !v)}
                      className={cn(
                        'flex w-full items-center justify-between py-4 text-left font-display text-xl font-semibold',
                        active ? 'text-brand-600' : 'text-ink-950',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={cn('size-5 transition-transform', mobileSectorsOpen && 'rotate-180')}
                      />
                    </button>
                    {mobileSectorsOpen && (
                      <ul className="mb-4 space-y-1 border-l-2 border-brand-600 pl-4">
                        <li>
                          <Link href={item.href} className="block py-2 text-[0.9375rem] font-semibold text-brand-600">
                            Visão geral
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? 'page' : undefined}
                              className="block py-2 text-[0.9375rem] text-ink-700 aria-[current=page]:font-semibold aria-[current=page]:text-ink-950"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(
                      'block py-4 font-display text-xl font-semibold',
                      active ? 'text-brand-600' : 'text-ink-950',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ButtonLink href="/contactos#formulario" size="lg" arrow className="mt-8 w-full">
            Solicitar Informações
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
