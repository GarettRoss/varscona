import { Link } from 'react-router-dom'
import type { Show } from '../lib/api'
import { mediaUrl } from '../lib/api'

type Props = { show: Show; variant?: 'grid' | 'featured' }

export default function ShowCard({ show, variant = 'grid' }: Props) {
  const img = mediaUrl(show.image, 'medium')

  if (variant === 'featured') {
    return (
      <div className="relative overflow-hidden rounded group">
        <div className="aspect-[16/9] bg-white/5">
          {img ? (
            <img src={img} alt={show.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">🎭</div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-2">{show.company}</p>
          <h3 className="font-display text-2xl md:text-3xl text-white font-semibold mb-1">{show.title}</h3>
          <p className="text-white/60 text-sm mb-4">{show.dateRange}</p>
          <Link
            to={show.externalLink ? show.externalLink : `/shows/${show.slug}`}
            {...(show.externalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/30 hover:border-[#c9a84c] hover:text-[#c9a84c] px-4 py-2 rounded transition-colors"
          >
            Learn more
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={show.externalLink ? show.externalLink : `/shows/${show.slug}`}
      {...(show.externalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group block"
    >
      <div className="aspect-[3/4] overflow-hidden rounded bg-white/5 mb-3">
        {img ? (
          <img src={img} alt={show.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-5xl">🎭</div>
        )}
      </div>
      <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-1">{show.company}</p>
      <h3 className="font-display text-lg text-white font-medium group-hover:text-[#c9a84c] transition-colors leading-tight">{show.title}</h3>
      <p className="text-white/50 text-sm mt-0.5">{show.dateRange}</p>
    </Link>
  )
}
