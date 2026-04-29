import { useEffect } from 'react'
import type { Show } from '../lib/api'

type Props = {
  show: Show
  staticImage?: string
  onClose: () => void
}

export default function ShowModal({ show, staticImage, onClose }: Props) {
  const img = staticImage || ''
  const ticketUrl = show.externalLink || `/shows/${show.slug}`
  const isExternal = !!show.externalLink

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-10 bg-[#111] border border-white/10 rounded-lg overflow-hidden max-w-lg w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/60 hover:text-white hover:bg-black/80 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Image */}
        <div className="aspect-[16/9] bg-white/5 overflow-hidden">
          {img ? (
            <img src={img} alt={show.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">🎭</div>
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-2">{show.company}</p>
          <h2 className="font-display text-2xl font-bold text-white mb-1">{show.title}</h2>
          <p className="text-white/50 text-sm mb-4">{show.dateRange}</p>

          {show.description && (
            <p className="text-white/60 text-sm leading-relaxed mb-6">{show.description}</p>
          )}

          <a
            href={ticketUrl}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center justify-center w-full bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-sm tracking-widest uppercase px-8 py-4 rounded transition-colors"
          >
            Buy Tickets
          </a>
        </div>
      </div>
    </div>
  )
}
