import { useEffect } from 'react'
import { mediaUrl, type Show } from '../lib/api'
import { companyColor } from '../lib/companyColor'

type Props = {
  show: Show
  staticImage?: string
  onClose: () => void
}

export default function ShowModal({ show, staticImage, onClose }: Props) {
  const img = mediaUrl(show.image, 'medium') || staticImage || ''
  const ticketUrl = show.externalLink || `/shows/${show.slug}`
  const isExternal = !!show.externalLink
  const color = companyColor(show.company)

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
        className="modal-scroll relative z-10 bg-[#1D1D1B] border border-[#F2EDDF]/10 rounded-lg overflow-hidden w-full max-w-md shadow-2xl flex flex-col max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-[#F2EDDF]/60 hover:text-[#F2EDDF] hover:bg-black/80 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Poster — top, portrait ratio */}
        <div className="w-full aspect-[3/4] shrink-0 bg-white/5">
          {img ? (
            <img src={img} alt={show.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">🎭</div>
          )}
        </div>

        {/* Info — below poster */}
        <div className="p-6 flex flex-col gap-3">
          <p className="text-xs font-medium tracking-widest uppercase" style={{ color }}>{show.company}</p>
          <h2 className="font-display text-2xl font-bold text-[#F2EDDF] leading-tight">{show.title}</h2>
          <p className="text-[#F2EDDF]/50 text-sm">{show.dateRange}</p>

          {show.description && (
            <p className="text-[#F2EDDF]/60 text-sm leading-relaxed">{show.description}</p>
          )}

          <a
            href={ticketUrl}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center justify-center text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded transition-colors mt-2 hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            Buy Tickets
          </a>
        </div>
      </div>
    </div>
  )
}
