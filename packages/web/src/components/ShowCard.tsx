import type { Show } from '../lib/api'
import { mediaUrl } from '../lib/api'
import { companyColor } from '../lib/companyColor'

type Props = { show: Show; variant?: 'grid' | 'featured'; staticImage?: string; onClick?: () => void; slotColor?: string; dateLabel?: string }

export default function ShowCard({ show, variant = 'grid', staticImage, onClick, slotColor, dateLabel }: Props) {
  const color = slotColor ?? companyColor(show.company)
  const posterImg = mediaUrl(show.image, 'medium')
  const useLineDrawing = !!posterImg
  const img = useLineDrawing ? posterImg : (staticImage || posterImg || '')

  if (variant === 'featured') {
    return (
      <div className="group cursor-pointer" onClick={onClick}>
        <div className="show-card-featured relative overflow-hidden rounded-2xl">
          <div className="aspect-[4/3] relative" style={{ background: color || '#0a0101' }}>
            {img ? (
              <img
                src={img}
                alt={show.title}
                className="show-card-img w-full h-full absolute inset-0"
                style={useLineDrawing
                  ? { objectFit: 'cover', objectPosition: show.imagePosition ?? 'center', filter: 'grayscale(1) contrast(8) brightness(1.8)', mixBlendMode: 'multiply' }
                  : { objectFit: 'contain' }
                }
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">🎭</div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="flex absolute bottom-2 sm:bottom-5 left-0 right-0 px-3 items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#F2EDDF] border border-[#F2EDDF]/30 group-hover:border-[#F2EDDF] px-4 py-2 rounded transition-colors whitespace-nowrap">
              Learn more
            </span>
            <p className="text-[#F2EDDF]/60 text-sm whitespace-nowrap">{dateLabel ?? show.dateRange}</p>
          </div>
        </div>
        <div className="flex items-baseline justify-between mt-3 px-1">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color }}>{show.company}</p>
          <h3 className="font-display text-lg font-bold text-[#1D1D1B] leading-tight text-right">{show.title}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="show-card-grid group block cursor-pointer" onClick={onClick}>
      <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-3 relative" style={{ background: color }}>
        {img ? (
          <img
            src={img}
            alt={show.title}
            className="show-card-img w-full h-full absolute inset-0"
            style={useLineDrawing
              ? { objectFit: 'cover', objectPosition: show.imagePosition ?? 'center', filter: 'grayscale(1) contrast(8) brightness(1.8)', mixBlendMode: 'multiply' }
              : { objectFit: 'contain' }
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#1D1D1B]/20 text-5xl">🎭</div>
        )}
      </div>
      <p className="text-xs font-bold tracking-widest uppercase mb-1 text-[#1D1D1B]">{show.company}</p>
      <h3 className="font-display text-xl font-bold leading-tight mb-1" style={{ color }}>{show.title}</h3>
      <p className="text-[#1D1D1B]/55 text-base">{show.dateRange}</p>
    </div>
  )
}
