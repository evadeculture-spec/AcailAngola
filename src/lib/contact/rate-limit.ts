/**
 * Limitador de pedidos em memória (janela deslizante).
 *
 * Em ambiente serverless cada instância tem a sua memória, pelo que este
 * controlo é um primeiro nível de proteção. Para tráfego elevado recomenda-se
 * um armazenamento partilhado (ex.: Upstash Redis) ou regras da Vercel
 * Firewall — ver `docs/deployment.md`.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>()

  return function check(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
    if (recent.length >= limit) {
      hits.set(key, recent)
      const oldest = recent[0] ?? now
      return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)) }
    }
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) {
      // Evita crescimento ilimitado da memória.
      for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k)
    }
    return { allowed: true, retryAfterSeconds: 0 }
  }
}
