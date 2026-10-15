import Image from 'next/image'
import type { ImageAsset, VisualKey } from '@/types/content'
import { cn } from '@/lib/cn'
import { TechnicalVisual } from './technical-visual'

interface MediaFrameProps {
  image?: ImageAsset
  visual: VisualKey
  label?: string
  index?: string
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Enquadramento de imagem: mostra a fotografia autorizada quando existe;
 * caso contrário, a ilustração técnica correspondente.
 */
export function MediaFrame({ image, visual, label, index, className, sizes = '100vw', priority }: MediaFrameProps) {
  return (
    <div className={cn('relative overflow-hidden bg-ink-950', className)}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <TechnicalVisual visual={visual} label={label} className="absolute inset-0" />
          {(label || index) && (
            <span
              aria-hidden
              className="absolute bottom-[6%] left-[5%] max-w-[90%] truncate font-mono text-[0.6875rem] tracking-[0.2em] text-white/55 uppercase"
            >
              {index ? `${index}  /  ` : ''}
              {label}
            </span>
          )}
        </>
      )}
    </div>
  )
}
