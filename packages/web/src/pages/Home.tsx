import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Show } from '../lib/api'
import ShowCard from '../components/ShowCard'
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

// Fallback static shows used before CMS is connected
const STATIC_SHOWS: Show[] = [
  { id: 1, documentId: '1', title: 'Marjorie Prime', slug: 'marjorie-prime', company: 'Trunk Theatre', dateRange: 'April 9 – April 19', description: '', featured: true, externalLink: null, image: null, createdAt: '' },
  { id: 2, documentId: '2', title: 'Die-Nasty', slug: 'die-nasty', company: 'Die-Nasty', dateRange: 'Every Monday at 7:30', description: '', featured: true, externalLink: null, image: null, createdAt: '' },
  { id: 3, documentId: '3', title: 'House of Hush', slug: 'house-of-hush', company: 'House of Hush', dateRange: 'Coming soon', description: '', featured: false, externalLink: null, image: null, createdAt: '' },
  { id: 4, documentId: '4', title: 'Autumn', slug: 'autumn', company: 'Shadow Theatre', dateRange: 'Fall 2025', description: '', featured: false, externalLink: null, image: null, createdAt: '' },
  { id: 5, documentId: '5', title: 'Fully Committed', slug: 'fully-committed', company: 'Teatro Live!', dateRange: 'Summer 2025', description: '', featured: false, externalLink: null, image: null, createdAt: '' },
  { id: 6, documentId: '6', title: 'Cocktails at Pam\'s', slug: 'cocktails-at-pams', company: 'Teatro Live!', dateRange: 'Summer 2025', description: '', featured: false, externalLink: null, image: null, createdAt: '' },
]

export default function Home() {
  const [shows, setShows] = useState<Show[]>(STATIC_SHOWS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.shows.list()
      .then(setShows)
      .catch(() => { /* CMS not connected yet — use static fallback */ })
      .finally(() => setLoading(false))
  }, [])

  const featured = shows.filter((s) => s.featured)
  const upcoming = shows.filter((s) => !s.featured)

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d0d0d] to-[#111] z-0" />
        {/* Curtain texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_#c9a84c_0%,_transparent_70%)] z-0" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="text-[#c9a84c] text-xs font-medium tracking-[0.4em] uppercase mb-6">
            Centre stage in the heart of old Strathcona
          </p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-none mb-4">
            BIG STORIES
          </h1>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-[#c9a84c] leading-none mb-8">
            SMALL THEATRE
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            From sharp-witted comedies to heartfelt dramas, spontaneous improv to dazzling cabaret — Edmonton's most intimate stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shows"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
            >
              See What's On
            </Link>
            <Link
              to="/support/donate"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
            >
              Support the Theatre
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── Featured Shows ── */}
      {featured.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-display text-3xl font-semibold text-white">Now Onstage</h2>
              <Link to="/shows" className="text-sm text-[#c9a84c] hover:text-[#e8c96a] tracking-wide">
                All shows →
              </Link>
            </div>
            <div className={`grid gap-6 ${featured.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {featured.map((show) => (
                <ShowCard key={show.id} show={show} variant="featured" staticImage={STATIC_IMAGES[show.slug]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Cue the Future Banner ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded bg-gradient-to-r from-[#8b1a1a] to-[#5a0f0f] px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_right,_#c9a84c_0%,_transparent_60%)]" />
            <div className="relative">
              <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-2">Capital Campaign</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Cue the Future</h2>
              <p className="text-white/70 max-w-md">
                Help us secure the next chapter for Edmonton's most beloved intimate stage. Every gift makes a difference.
              </p>
            </div>
            <div className="relative shrink-0">
              <a
                href="https://www.canadahelps.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-sm tracking-widest uppercase px-10 py-4 rounded transition-colors"
              >
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Shows ── */}
      {upcoming.length > 0 && (
        <section className="py-20 px-6 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-white mb-2">Upcoming Shows</h2>
            <p className="text-white/50 mb-10">The full season at a glance</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {upcoming.map((show) => (
                <ShowCard key={show.id} show={show} variant="grid" staticImage={STATIC_IMAGES[show.slug]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── About Blurb ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-4">Our Theatre</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Rebuilt and Renewed
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Beautifully rebuilt in 2016, our theatre retains all the intimacy our audiences love, while heightening the performance experience for both artists and guests.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Located in Edmonton's heart of old Strathcona — a renovated fire hall that has been home to some of the most exciting theatre in Canada since 1982.
            </p>
            <Link to="/rent" className="text-sm text-[#c9a84c] hover:text-[#e8c96a] tracking-wide border-b border-[#c9a84c]/30 hover:border-[#c9a84c] pb-0.5 transition-colors">
              Rent our space →
            </Link>
          </div>
          <div>
            <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-4">Our Companies</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Artist-Run, Community-Led
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              We're artist-run, meaning everyone on our team both operates and performs in our space — three resident companies, one shared home.
            </p>
            <div className="space-y-3">
              {[
                { name: 'Shadow Theatre', description: 'Thrilling productions opening hearts and minds' },
                { name: 'Teatro Live!', description: 'A riot of fun' },
                { name: 'Die-Nasty', description: 'An Edmonton institution — Monday nights at 7:30' },
              ].map((c) => (
                <div key={c.name} className="flex items-start gap-3 p-4 bg-white/5 rounded">
                  <div className="w-1 h-full bg-[#c9a84c] shrink-0 rounded-full mt-1" />
                  <div>
                    <p className="text-white font-medium">{c.name}</p>
                    <p className="text-white/50 text-sm">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/who-we-are" className="inline-block mt-6 text-sm text-[#c9a84c] hover:text-[#e8c96a] tracking-wide border-b border-[#c9a84c]/30 hover:border-[#c9a84c] pb-0.5 transition-colors">
              Learn more about our companies →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
