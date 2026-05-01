import { useEffect } from 'react'
import { mediaUrl, type Show } from '../lib/api'

type Props = {
  show: Show
  staticImage?: string
  onClose: () => void
}

export default function ShowModal({ show, staticImage, onClose }: Props) {
  const img = mediaUrl(show.image, 'medium') || staticImage || ''
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
        className="relative z-10 bg-[#111] border border-white/10 rounded-lg overflow-hidden w-full max-w-3xl shadow-2xl flex flex-col sm:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white/60 hover:text-white hover:bg-black/80 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Poster — left column */}
        <div className="sm:w-56 shrink-0 aspect-[3/4] sm:aspect-auto bg-white/5">
          {img ? (
            <img src={img} alt={show.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">🎭</div>
          )}
        </div>

        {/* Info — right column */}
        <div className="modal-scroll flex-1 overflow-y-auto p-7 flex flex-col">
          <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-3">{show.company}</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{show.title}</h2>
          <p className="text-white/50 text-sm mb-1">{show.dateRange}</p>

          {(show.startDate || show.endDate) && (
            <p className="text-white/30 text-xs mb-4">
              {show.startDate && new Date(show.startDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
              {show.startDate && show.endDate && ' – '}
              {show.endDate && new Date(show.endDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}

          {show.description && (
            <p className="text-white/60 text-sm leading-relaxed mt-2 mb-6 flex-1">{show.description}</p>
          )}

          <a
            href={ticketUrl}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center justify-center bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-sm tracking-widest uppercase px-8 py-4 rounded transition-colors mt-auto"
          >
            Buy Tickets
          </a>
        </div>
      </div>
    </div>
  )
}
