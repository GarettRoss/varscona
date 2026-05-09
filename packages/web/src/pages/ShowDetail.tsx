import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type Show, mediaUrl } from '../lib/api'
import { companyColor } from '../lib/companyColor'

export default function ShowDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [show, setShow] = useState<Show | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    api.shows.bySlug(slug)
      .then((results) => {
        if (!results || results.length === 0) setNotFound(true)
        else setShow(results[0])
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="pt-16 min-h-screen bg-[#1D1D1B] flex items-center justify-center">
      <div className="text-[#1D1D1B]/40 animate-pulse">Loading…</div>
    </div>
  )

  if (notFound || !show) return (
    <div className="pt-16 min-h-screen bg-[#1D1D1B] flex flex-col items-center justify-center gap-6 px-6">
      <p className="text-6xl">🎭</p>
      <h1 className="font-display text-3xl text-[#1D1D1B]">Show not found</h1>
      <Link to="/shows" className="text-[#FF5F38] hover:text-[#ff7a57]">← Back to shows</Link>
    </div>
  )

  const img = mediaUrl(show.image, 'large')
  const color = companyColor(show.company)

  return (
    <div className="pt-16">
      <div className="bg-[#1D1D1B] px-4 md:px-8 pt-4 pb-8 flex flex-col gap-6">

        {/* Hero banner */}
        <section className="py-20 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#8B1A1A]">
          <div className="text-center px-6 max-w-3xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">{show.company}</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4 leading-tight">{show.title}</h1>
            <p className="text-[#F2EDDF]/60 text-lg">{show.dateRange}</p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-12">
          <div className="max-w-5xl mx-auto">
            <Link to="/shows" className="text-[#FF5F38] hover:text-[#ff7a57] text-sm flex items-center gap-2 mb-10">
              ← All shows
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="aspect-[3/4] overflow-hidden rounded" style={{ background: color }}>
                {img ? (
                  <img src={img} alt={show.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-8xl">🎭</div>
                )}
              </div>
              <div className="pt-2">
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color }}>{show.company}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1D1D1B] mb-4 leading-tight">{show.title}</h2>
                <p className="text-[#1D1D1B]/50 text-lg mb-6">{show.dateRange}</p>
                {show.description && (
                  <p className="text-[#1D1D1B]/70 leading-relaxed mb-8">{show.description}</p>
                )}
                {show.externalLink ? (
                  <a
                    href={show.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
                  >
                    Book Tickets
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
                  >
                    Contact for Tickets
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
