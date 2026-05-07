import type { Show } from '../lib/api'
import { mediaUrl } from '../lib/api'
import { companyColor } from '../lib/companyColor'

type Props = { show: Show; variant?: 'grid' | 'featured'; staticImage?: string; onClick?: () => void; slotColor?: string }

export default function ShowCard({ show, variant = 'grid', staticImage, onClick, slotColor }: Props) {
  const img = mediaUrl(show.image, 'medium') || staticImage || ''
  const color = slotColor ?? companyColor(show.company)

  if (variant === 'featured') {
    return (
      <div className="show-card-featured relative overflow-hidden rounded group cursor-pointer" onClick={onClick}>
        <div className="aspect-[16/9]" style={{ background: color || '#0a0101' }}>
          {img ? (
            <img src={img} alt={show.title} className="show-card-img w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">🎭</div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[#F2EDDF]/60 text-sm mb-4">{show.dateRange}</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[#F2EDDF] border border-[#F2EDDF]/30 group-hover:border-[#F2EDDF] px-4 py-2 rounded transition-colors">
            Learn more
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="show-card-grid group block cursor-pointer" onClick={onClick}>
      <div className="aspect-[3/4] overflow-hidden rounded mb-3" style={{ background: color }}>
        {img ? (
          <img src={img} alt={show.title} className="show-card-img w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#1D1D1B]/20 text-5xl">🎭</div>
        )}
      </div>
      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>{show.company}</p>
      <h3 className="font-display text-xl font-bold leading-tight mb-1" style={{ color }}>{show.title}</h3>
      <p className="text-[#1D1D1B]/55 text-base">{show.dateRange}</p>
    </div>
  )
}
