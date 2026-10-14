/** Injeta dados estruturados Schema.org. O conteúdo é gerado internamente. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Escapa "<" para impedir o fecho prematuro da tag <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
