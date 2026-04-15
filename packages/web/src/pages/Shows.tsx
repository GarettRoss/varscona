import { useEffect, useState } from 'react'
import { api, type Show } from '../lib/api'
import ShowCard from '../components/ShowCard'

const COMPANIES = ['All', 'Trunk Theatre', 'Shadow Theatre', 'Teatro Live!', 'Die-Nasty', 'House of Hush']

export default function Shows() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    api.shows.list()
      .then(setShows)
      .catch(() => setShows([]))
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

      {/* Filter */}
      <section className="px-6 pb-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
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

      {/* Shows grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-white/5 rounded mb-3" />
                  <div className="h-3 bg-white/5 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="text-4xl mb-4">🎭</p>
              <p>No shows found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((show) => (
                <ShowCard key={show.id} show={show} variant="grid" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
