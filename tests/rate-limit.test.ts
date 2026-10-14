import { describe, expect, it } from 'vitest'
import { createRateLimiter } from '@/lib/contact/rate-limit'

describe('createRateLimiter', () => {
  it('bloqueia acima do limite e liberta após a janela', () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 })
    expect(check('ip', 0).allowed).toBe(true)
    expect(check('ip', 100).allowed).toBe(true)
    const blocked = check('ip', 200)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
    expect(check('outro-ip', 200).allowed).toBe(true)
    expect(check('ip', 1101).allowed).toBe(true)
  })
})
