import { useEffect, useState } from 'react'
import { api, type Show, mediaUrl } from '../lib/api'
import imgMarjoriePrime from '../assets/shows/marjorie-prime.svg'
import imgDieNasty from '../assets/shows/die-nasty.svg'
import imgHouseOfHush from '../assets/shows/house-of-hush.svg'
import imgAutumn from '../assets/shows/autumn.svg'
import imgFullyCommitted from '../assets/shows/fully-committed.svg'
import imgCocktailsAtPams from '../assets/shows/cocktails-at-pams.svg'

const STATIC_IMAGES: Record<string, string> = {
  'marjorie-prime': imgMarjoriePrime,
  'die-nasty': imgDieNasty,
  'house-of-hush': imgHouseOfHush,
  'autumn': imgAutumn,
  'fully-committed': imgFullyCommitted,
  'cocktails-at-pams': imgCocktailsAtPams,
}

const STATIC_SHOWS: Show[] = [
  { id: '1', title: 'Marjorie Prime', slug: 'marjorie-prime', company: 'Trunk Theatre', dateRange: 'April 9 – April 19', description: 'A tender, witty and thought-provoking play about memory, loss and the people we become.', featured: true, externalLink: null, image: null },
  { id: '2', title: 'Die-Nasty', slug: 'die-nasty', company: 'Die-Nasty', dateRange: 'Every Monday at 7:30', description: 'Edmonton\'s legendary live improvised soap opera. No two nights alike — ever.', featured: true, externalLink: null, image: null },
  { id: '3', title: 'House of Hush', slug: 'house-of-hush', company: 'House of Hush', dateRange: 'Coming soon', description: 'An intimate evening of music and storytelling. Some silences speak loudest.', featured: false, externalLink: null, image: null },
  { id: '4', title: 'Autumn', slug: 'autumn', company: 'Shadow Theatre', dateRange: 'Fall 2025', description: 'Shadow Theatre returns with a stirring new production exploring change, loss and renewal.', featured: false, externalLink: null, image: null },
  { id: '5', title: 'Fully Committed', slug: 'fully-committed', company: 'Teatro Live!', dateRange: 'Summer 2025', description: 'A one-person comedic tour-de-force set in the reservation line of a high-end Manhattan restaurant.', featured: false, externalLink: null, image: null },
  { id: '6', title: 'Cocktails at Pam\'s', slug: 'cocktails-at-pams', company: 'Teatro Live!', dateRange: 'Summer 2025', description: 'The party of the season — a riot of fun from the masters of comedy.', featured: false, externalLink: null, image: null },
]

const COMPANIES = ['All', 'Trunk Theatre', 'Shadow Theatre', 'Teatro Live!', 'Die-Nasty', 'House of Hush']

export default function Shows() {
  const [shows, setShows] = useState<Show[]>(STATIC_SHOWS)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    api.shows.list()
      .then(setShows)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'All' ? shows : shows.filter((s) => s.company === filter)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-28 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0a0a0a]" />
        <div className="relative text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Varscona Theatre</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">IT'S SHOWTIME</h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            From sharp-witted comedies to heartfelt dramas, spontaneous improv to dazzling cabaret — all year round.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="px-6 pb-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex gap-2 flex-wrap">
          {COMPANIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded text-sm font-medium tracking-wide transition-colors ${
                filter === c
                  ? 'bg-[#c9a84c] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Show list */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-6 p-5 rounded-lg bg-white/5">
                  <div className="w-28 aspect-[3/4] bg-white/10 rounded shrink-0" />
                  <div className="flex-1 py-2 space-y-3">
                    <div className="h-3 bg-white/10 rounded w-1/4" />
                    <div className="h-5 bg-white/10 rounded w-1/2" />
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                  </div>
                  <div className="w-32 h-10 bg-white/10 rounded self-center shrink-0" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="text-4xl mb-4">🎭</p>
              <p>No shows found for this company.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((show) => {
                const img = mediaUrl(show.image, 'medium') || STATIC_IMAGES[show.slug] || ''
                const ticketUrl = show.externalLink || `/shows/${show.slug}`
                const isExternal = !!show.externalLink
                return (
                  <div
                    key={show.id}
                    className="flex items-center gap-6 p-5 rounded-lg bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-24 md:w-32 aspect-[3/4] rounded overflow-hidden shrink-0 bg-white/5">
                      {img ? (
                        <img src={img} alt={show.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-3xl">🎭</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase mb-1">{show.company}</p>
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1 truncate">{show.title}</h3>
                      <p className="text-white/50 text-sm mb-3">{show.dateRange}</p>
                      {show.description && (
                        <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{show.description}</p>
                      )}
                    </div>

                    {/* Buy Tickets */}
                    <div className="shrink-0">
                      <a
                        href={ticketUrl}
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="inline-flex items-center justify-center bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors whitespace-nowrap"
                      >
                        Buy Tickets
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
