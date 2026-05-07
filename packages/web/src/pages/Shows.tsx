import { useEffect, useMemo, useState } from 'react'
import { api, type Show, mediaUrl } from '../lib/api'
import { companyColor } from '../lib/companyColor'
import imgMarjoriePrime from '../assets/shows/marjorie-prime.svg'
import imgDieNasty from '../assets/shows/die-nasty.svg'
import imgHouseOfHush from '../assets/shows/house-of-hush.svg'
import imgAutumn from '../assets/shows/autumn.svg'
import imgFullyCommitted from '../assets/shows/fully-committed.svg'
import imgCocktailsAtPams from '../assets/shows/cocktails-at-pams.svg'
import imgBetrayal from '../assets/shows/betrayal.svg'
import imgGlassMenagerie from '../assets/shows/glass-menagerie.svg'
import imgDieNastyFinale from '../assets/shows/die-nasty-finale.svg'
import imgDieNastyHalloween from '../assets/shows/die-nasty-halloween.svg'
import imgMidnightReverie from '../assets/shows/midnight-reverie.svg'
import imgTheStillHours from '../assets/shows/the-still-hours.svg'
import imgPenelopiad from '../assets/shows/penelopiad.svg'
import imgCopenhagen from '../assets/shows/copenhagen.svg'
import img39Steps from '../assets/shows/39-steps.svg'
import imgNoisesOff from '../assets/shows/noises-off.svg'

const STATIC_IMAGES: Record<string, string> = {
  'marjorie-prime': imgMarjoriePrime,
  'die-nasty': imgDieNasty,
  'house-of-hush': imgHouseOfHush,
  'autumn': imgAutumn,
  'fully-committed': imgFullyCommitted,
  'cocktails-at-pams': imgCocktailsAtPams,
  'betrayal': imgBetrayal,
  'glass-menagerie': imgGlassMenagerie,
  'die-nasty-finale': imgDieNastyFinale,
  'die-nasty-halloween': imgDieNastyHalloween,
  'midnight-reverie': imgMidnightReverie,
  'the-still-hours': imgTheStillHours,
  'penelopiad': imgPenelopiad,
  'copenhagen': imgCopenhagen,
  '39-steps': img39Steps,
  'noises-off': imgNoisesOff,
}


const STATIC_SHOWS: Show[] = [
  { id: '1',  title: 'Marjorie Prime',              slug: 'marjorie-prime',     company: 'Trunk Theatre',  dateRange: 'April 15 – May 10, 2026',         description: 'A poignant and witty exploration of memory, loss, and what it means to be human.',                         featured: true,  externalLink: null, image: null },
  { id: '2',  title: 'Die-Nasty',                   slug: 'die-nasty',           company: 'Die-Nasty',      dateRange: 'Every Monday at 7:30 PM',          description: "Edmonton's legendary live improvised soap opera. No script. No net. No two nights alike.",                 featured: false, externalLink: null, image: null },
  { id: '3',  title: 'House of Hush',               slug: 'house-of-hush',       company: 'House of Hush',  dateRange: 'May 20 – June 7, 2026',            description: 'An immersive world premiere. Step inside the house. Something has been left unsaid for decades.',           featured: false, externalLink: null, image: null },
  { id: '4',  title: 'Fully Committed',             slug: 'fully-committed',     company: 'Teatro Live!',   dateRange: 'July 14 – August 2, 2026',         description: 'One actor. Forty voices. A bravura one-person comedy set at a Manhattan restaurant.',                     featured: false, externalLink: null, image: null },
  { id: '5',  title: "Cocktails at Pam's",          slug: 'cocktails-at-pams',   company: 'Teatro Live!',   dateRange: 'August 11 – 30, 2026',             description: 'A fizzy, fast-paced romp through a social gathering where every secret eventually surfaces.',              featured: false, externalLink: null, image: null },
  { id: '6',  title: 'Autumn',                      slug: 'autumn',              company: 'Shadow Theatre', dateRange: 'September 8 – October 4, 2026',    description: 'A play about endings that feels like a beginning — bittersweet, funny, and achingly real.',               featured: false, externalLink: null, image: null },
  { id: '7',  title: 'Betrayal',                    slug: 'betrayal',            company: 'Trunk Theatre',  dateRange: 'November 4 – 22, 2026',            description: "Harold Pinter's masterwork of reverse chronology — seven years of a marriage told backwards.",            featured: false, externalLink: null, image: null },
  { id: '8',  title: 'The Glass Menagerie',         slug: 'glass-menagerie',     company: 'Trunk Theatre',  dateRange: 'February 3 – 21, 2027',            description: "Tennessee Williams's memory play. Tom Wingfield returns to the apartment he fled — tender and shattering.", featured: false, externalLink: null, image: null },
  { id: '9',  title: 'Die-Nasty: Season Finale',   slug: 'die-nasty-finale',    company: 'Die-Nasty',      dateRange: 'June 8, 2026 – One Night Only',    description: 'Past and present cast members reunite for a no-holds-barred evening of improvised drama.',                 featured: false, externalLink: null, image: null },
  { id: '10', title: 'Die-Nasty: Halloween Horror', slug: 'die-nasty-halloween', company: 'Die-Nasty',      dateRange: 'October 26, 2026 – One Night Only', description: "Die-Nasty's annual Halloween Horror Special. Costumes encouraged. Screaming permitted.",                  featured: false, externalLink: null, image: null },
  { id: '11', title: 'Midnight Reverie',            slug: 'midnight-reverie',    company: 'House of Hush',  dateRange: 'September 15 – October 3, 2026',   description: 'Movement, live sound, and fragmentary text exploring the space between sleep and waking.',                 featured: false, externalLink: null, image: null },
  { id: '12', title: 'The Still Hours',             slug: 'the-still-hours',     company: 'House of Hush',  dateRange: 'January 12 – 30, 2027',            description: 'In silence, everything is heard. A meditation on grief, presence, and the moments between moments.',      featured: false, externalLink: null, image: null },
  { id: '13', title: 'The Penelopiad',              slug: 'penelopiad',          company: 'Shadow Theatre', dateRange: 'February 9 – 27, 2027',            description: "Margaret Atwood retells the Odyssey from Penelope's side. Who tells the story matters.",                  featured: false, externalLink: null, image: null },
  { id: '14', title: 'Copenhagen',                  slug: 'copenhagen',          company: 'Shadow Theatre', dateRange: 'November 10 – 28, 2026',           description: "Michael Frayn's tour de force — science, friendship, and moral ambiguity in Nazi-occupied Copenhagen.",   featured: false, externalLink: null, image: null },
  { id: '15', title: 'The 39 Steps',                slug: '39-steps',            company: 'Teatro Live!',   dateRange: 'October 13 – 31, 2026',            description: 'Four actors. 150 roles. A genre-bending spy comedy of thrills, spills, and theatrical invention.',        featured: false, externalLink: null, image: null },
  { id: '16', title: 'Noises Off',                  slug: 'noises-off',          company: 'Teatro Live!',   dateRange: 'March 9 – 27, 2027',               description: "Michael Frayn's comedy of theatrical catastrophe — the funniest farce ever written.",                    featured: false, externalLink: null, image: null },
]

const SLOT_COLORS = ['#FF5F38', '#00C09A', '#CDAAFF', '#4361EE']

function deriveCompanies(shows: Show[]): string[] {
  const seen = new Set<string>()
  const list: string[] = []
  for (const s of shows) {
    if (s.company && !seen.has(s.company)) {
      seen.add(s.company)
      list.push(s.company)
    }
  }
  return list.sort()
}

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

  const colorById = useMemo(() => {
    const map: Record<string, string> = {}
    shows.forEach((show, i) => { map[show.id] = SLOT_COLORS[i % 4] })
    return map
  }, [shows])

  const companies = deriveCompanies(shows)
  const filtered = filter === 'All' ? shows : shows.filter((s) => s.company === filter)

  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Varscona Theatre</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">IT'S SHOWTIME</h1>
            <p className="text-[#F2EDDF]/60 max-w-xl mx-auto text-lg">
              From sharp-witted comedies to heartfelt dramas, spontaneous improv to dazzling cabaret — all year round.
            </p>
          </div>
        </section>
      </div>

      {/* Chalk content area */}
      <div className="bg-[#E5E1D8] px-4 md:px-8 py-8 flex flex-col gap-6">

        {/* Filter tabs */}
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-6">
          <div className="flex gap-2 flex-wrap">
            {['All', ...companies].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded text-sm font-medium tracking-wide transition-colors ${
                  filter === c
                    ? 'bg-[#FF5F38] text-white'
                    : 'bg-[#1D1D1B]/8 text-[#1D1D1B]/60 hover:bg-[#1D1D1B]/12 hover:text-[#1D1D1B]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Show list */}
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-8">
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-6 p-5 rounded-lg bg-[#1D1D1B]/5">
                  <div className="w-28 aspect-[3/4] bg-[#1D1D1B]/10 rounded shrink-0" />
                  <div className="flex-1 py-2 space-y-3">
                    <div className="h-3 bg-[#1D1D1B]/10 rounded w-1/4" />
                    <div className="h-5 bg-[#1D1D1B]/10 rounded w-1/2" />
                    <div className="h-3 bg-[#1D1D1B]/10 rounded w-1/3" />
                    <div className="h-3 bg-[#1D1D1B]/10 rounded w-3/4" />
                  </div>
                  <div className="w-32 h-10 bg-[#1D1D1B]/10 rounded self-center shrink-0" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#1D1D1B]/40">
              <p className="text-4xl mb-4">🎭</p>
              <p>No shows found for this company.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((show) => {
                const img = STATIC_IMAGES[show.slug] || mediaUrl(show.image, 'medium') || ''
                const ticketUrl = show.externalLink || `/shows/${show.slug}`
                const isExternal = !!show.externalLink
                const color = companyColor(show.company)
                const slotBg = colorById[show.id] ?? SLOT_COLORS[0]
                return (
                  <div
                    key={show.id}
                    className="flex items-center gap-6 p-5 rounded-lg bg-[#1D1D1B]/4 hover:bg-[#1D1D1B]/7 border border-[#1D1D1B]/8 hover:border-[#1D1D1B]/15 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-24 md:w-32 aspect-[3/4] rounded overflow-hidden shrink-0" style={{ background: slotBg }}>
                      {img ? (
                        <img src={img} alt={show.title} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#1D1D1B]/20 text-3xl">🎭</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>{show.company}</p>
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-[#1D1D1B] mb-1 truncate">{show.title}</h3>
                      <p className="text-[#1D1D1B]/50 text-sm mb-3">{show.dateRange}</p>
                      {show.description && (
                        <p className="text-[#1D1D1B]/45 text-sm leading-relaxed line-clamp-2">{show.description}</p>
                      )}
                    </div>

                    {/* Buy Tickets */}
                    <div className="shrink-0">
                      <a
                        href={ticketUrl}
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="inline-flex items-center justify-center bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors whitespace-nowrap"
                      >
                        Buy Tickets
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
