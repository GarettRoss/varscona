import type { Show } from '../lib/api'
import { mediaUrl } from '../lib/api'

type Props = { show: Show; variant?: 'grid' | 'featured'; staticImage?: string; onClick?: () => void }

export default function ShowCard({ show, variant = 'grid', staticImage, onClick }: Props) {
  const img = mediaUrl(show.image, 'medium') || staticImage || ''

  if (variant === 'featured') {
    return (
      <div className="show-card-featured relative overflow-hidden rounded group cursor-pointer" onClick={onClick}>
        <div className="aspect-[16/9] bg-white/5">
          {img ? (
            <img src={img} alt={show.title} className="show-card-img w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">🎭</div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-2">{show.company}</p>
          <h3 className="font-display text-2xl md:text-3xl text-white font-semibold mb-1">{show.title}</h3>
          <p className="text-white/60 text-sm mb-4">{show.dateRange}</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/30 group-hover:border-[#c9a84c] group-hover:text-[#c9a84c] px-4 py-2 rounded transition-colors">
            Learn more
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="show-card-grid group block cursor-pointer" onClick={onClick}>
      <div className="aspect-[3/4] overflow-hidden rounded bg-white/5 mb-3">
        {img ? (
          <img src={img} alt={show.title} className="show-card-img w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-5xl">🎭</div>
        )}
      </div>
      <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-1">{show.company}</p>
      <h3 className="font-display text-lg text-white font-medium group-hover:text-[#c9a84c] transition-colors leading-tight">{show.title}</h3>
      <p className="text-white/50 text-sm mt-0.5">{show.dateRange}</p>
    </div>
  )
}
