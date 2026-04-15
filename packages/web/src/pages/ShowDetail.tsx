import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type Show, mediaUrl } from '../lib/api'

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
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-white/40 animate-pulse">Loading…</div>
    </div>
  )

  if (notFound || !show) return (
    <div className="pt-16 min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <p className="text-6xl">🎭</p>
      <h1 className="font-display text-3xl text-white">Show not found</h1>
      <Link to="/shows" className="text-[#c9a84c] hover:text-[#e8c96a]">← Back to shows</Link>
    </div>
  )

  const img = mediaUrl(show.image, 'large')

  return (
    <div className="pt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link to="/shows" className="text-white/50 hover:text-white text-sm flex items-center gap-2 mb-12">
          ← All shows
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="aspect-[3/4] overflow-hidden rounded bg-white/5">
            {img ? (
              <img src={img} alt={show.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-8xl">🎭</div>
            )}
          </div>
          <div className="pt-2">
            <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-3">{show.company}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{show.title}</h1>
            <p className="text-white/50 text-lg mb-6">{show.dateRange}</p>
            {show.description && (
              <p className="text-white/70 leading-relaxed mb-8">{show.description}</p>
            )}
            {show.externalLink ? (
              <a
                href={show.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
              >
                Book Tickets
              </a>
            ) : (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
              >
                Contact for Tickets
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
