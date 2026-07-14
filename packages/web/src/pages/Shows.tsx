import { useEffect, useMemo, useRef, useState } from 'react'
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
import imgPopcornFalls from '../assets/shows/popcorn-falls.svg'
import imgTheCottage from '../assets/shows/the-cottage.svg'
import imgTheGlitteringHeart from '../assets/shows/the-glittering-heart.svg'
import imgJaneAustensEmma from '../assets/shows/jane-austens-emma.svg'

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
  'popcorn-falls': imgPopcornFalls,
  'the-cottage': imgTheCottage,
  'the-glittering-heart': imgTheGlitteringHeart,
  'jane-austens-emma': imgJaneAustensEmma,
}


const STATIC_SHOWS: Show[] = [
  { id: '1',  title: 'Marjorie Prime',              slug: 'marjorie-prime',     company: 'Trunk Theatre',  dateRange: 'April 15 – May 10, 2026',          description: 'A poignant and witty exploration of memory, loss, and what it means to be human.',                         featured: true,  externalLink: null, image: null, startDate: '2026-04-15', endDate: '2026-05-10' },
  { id: '2',  title: 'Die-Nasty',                   slug: 'die-nasty',           company: 'Die-Nasty',      dateRange: 'Every Monday at 7:30 PM',           description: "Edmonton's legendary live improvised soap opera. No script. No net. No two nights alike.",                 featured: false, externalLink: null, image: null, startDate: '2020-01-01', endDate: '2099-12-31' },
  { id: '3',  title: 'House of Hush',               slug: 'house-of-hush',       company: 'House of Hush',  dateRange: 'May 20 – June 7, 2026',             description: 'An immersive world premiere. Step inside the house. Something has been left unsaid for decades.',           featured: false, externalLink: null, image: null, startDate: '2026-05-20', endDate: '2026-06-07' },
  { id: '4',  title: 'Fully Committed',             slug: 'fully-committed',     company: 'Teatro Live!',   dateRange: 'July 14 – August 2, 2026',          description: 'One actor. Forty voices. A bravura one-person comedy set at a Manhattan restaurant.',                     featured: false, externalLink: null, image: null, startDate: '2026-07-14', endDate: '2026-08-02' },
  { id: '5',  title: "Cocktails at Pam's",          slug: 'cocktails-at-pams',   company: 'Teatro Live!',   dateRange: 'August 11 – 30, 2026',              description: 'A fizzy, fast-paced romp through a social gathering where every secret eventually surfaces.',              featured: false, externalLink: null, image: null, startDate: '2026-08-11', endDate: '2026-08-30' },
  { id: '6',  title: 'Autumn',                      slug: 'autumn',              company: 'Shadow Theatre', dateRange: 'September 8 – October 4, 2026',     description: 'A play about endings that feels like a beginning — bittersweet, funny, and achingly real.',               featured: false, externalLink: null, image: null, startDate: '2026-09-08', endDate: '2026-10-04' },
  { id: '7',  title: 'Betrayal',                    slug: 'betrayal',            company: 'Trunk Theatre',  dateRange: 'November 4 – 22, 2026',             description: "Harold Pinter's masterwork of reverse chronology — seven years of a marriage told backwards.",            featured: false, externalLink: null, image: null, startDate: '2026-11-04', endDate: '2026-11-22' },
  { id: '8',  title: 'The Glass Menagerie',         slug: 'glass-menagerie',     company: 'Trunk Theatre',  dateRange: 'February 3 – 21, 2027',             description: "Tennessee Williams's memory play. Tom Wingfield returns to the apartment he fled — tender and shattering.", featured: false, externalLink: null, image: null, startDate: '2027-02-03', endDate: '2027-02-21' },
  { id: '9',  title: 'Die-Nasty: Season Finale',   slug: 'die-nasty-finale',    company: 'Die-Nasty',      dateRange: 'June 8, 2026 – One Night Only',     description: 'Past and present cast members reunite for a no-holds-barred evening of improvised drama.',                 featured: false, externalLink: null, image: null, startDate: '2026-06-08', endDate: '2026-06-08' },
  { id: '10', title: 'Die-Nasty: Halloween Horror', slug: 'die-nasty-halloween', company: 'Die-Nasty',      dateRange: 'October 26, 2026 – One Night Only',  description: "Die-Nasty's annual Halloween Horror Special. Costumes encouraged. Screaming permitted.",                  featured: false, externalLink: null, image: null, startDate: '2026-10-26', endDate: '2026-10-26' },
  { id: '11', title: 'Midnight Reverie',            slug: 'midnight-reverie',    company: 'House of Hush',  dateRange: 'September 15 – October 3, 2026',    description: 'Movement, live sound, and fragmentary text exploring the space between sleep and waking.',                 featured: false, externalLink: null, image: null, startDate: '2026-09-15', endDate: '2026-10-03' },
  { id: '12', title: 'The Still Hours',             slug: 'the-still-hours',     company: 'House of Hush',  dateRange: 'January 12 – 30, 2027',             description: 'In silence, everything is heard. A meditation on grief, presence, and the moments between moments.',      featured: false, externalLink: null, image: null, startDate: '2027-01-12', endDate: '2027-01-30' },
  { id: '13', title: 'The Penelopiad',              slug: 'penelopiad',          company: 'Shadow Theatre', dateRange: 'February 9 – 27, 2027',             description: "Margaret Atwood retells the Odyssey from Penelope's side. Who tells the story matters.",                  featured: false, externalLink: null, image: null, startDate: '2027-02-09', endDate: '2027-02-27' },
  { id: '14', title: 'Copenhagen',                  slug: 'copenhagen',          company: 'Shadow Theatre', dateRange: 'November 10 – 28, 2026',            description: "Michael Frayn's tour de force — science, friendship, and moral ambiguity in Nazi-occupied Copenhagen.",   featured: false, externalLink: null, image: null, startDate: '2026-11-10', endDate: '2026-11-28' },
  { id: '15', title: 'The 39 Steps',                slug: '39-steps',            company: 'Teatro Live!',   dateRange: 'October 13 – 31, 2026',             description: 'Four actors. 150 roles. A genre-bending spy comedy of thrills, spills, and theatrical invention.',        featured: false, externalLink: null, image: null, startDate: '2026-10-13', endDate: '2026-10-31' },
  { id: '16', title: 'Noises Off',                  slug: 'noises-off',          company: 'Teatro Live!',   dateRange: 'March 9 – 27, 2027',               description: "Michael Frayn's comedy of theatrical catastrophe — the funniest farce ever written.",                    featured: false, externalLink: null, image: null, startDate: '2027-03-09', endDate: '2027-03-27' },
]

const SLOT_COLORS = ['#FF5F38', '#00C09A', '#7B3FE4', '#BF1650']

import { shortDateRange } from '../lib/shortDateRange'

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

function CarouselCard({ show, colorById }: { show: Show; colorById: Record<string, string> }) {
  const slotBg = colorById[show.id] ?? SLOT_COLORS[0]
  const posterImg = mediaUrl(show.image, 'medium')

  if (posterImg) {
    return (
      <div className="w-full h-full rounded-2xl overflow-hidden relative" style={{ background: slotBg }}>
        <img
          src={posterImg}
          alt={show.title}
          className="w-full h-full object-cover absolute inset-0"
          style={{ filter: 'grayscale(1) contrast(8) brightness(1.8)', mixBlendMode: 'multiply' }}
        />
      </div>
    )
  }

  const img = mediaUrl(show.cardImage, 'medium') || STATIC_IMAGES[show.slug] || ''
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden" style={{ background: slotBg }}>
      {img
        ? <img src={img} alt={show.title} className="w-full h-full object-contain" />
        : <div className="w-full h-full flex items-center justify-center text-white/10 text-6xl">🎭</div>
      }
    </div>
  )
}

function ShowCarousel({ shows, colorById, filterKey }: { shows: Show[]; colorById: Record<string, string>; filterKey: string }) {
  const [index, setIndex] = useState(0)
  const [detailShow, setDetailShow] = useState<Show | null>(null)
  const [displayShows, setDisplayShows] = useState(shows)
  const [visible, setVisible] = useState(true)
  const [gradColor, setGradColor] = useState<string>(() => colorById[shows[0]?.id] ?? SLOT_COLORS[0])
  const startX = useRef<number | null>(null)
  const isFirst = useRef(true)

  const n = displayShows.length
  const loop = n > 3
  const safeIndex = loop ? index : Math.min(index, Math.max(0, n - 1))

  // On filter change: fade+rotate out → swap → fade+rotate in
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }
    setVisible(false)
    const t1 = setTimeout(() => {
      setDisplayShows(shows)
      setIndex(0)
      setGradColor(colorById[shows[0]?.id] ?? SLOT_COLORS[0])
      const t2 = setTimeout(() => setVisible(true), 30)
      return () => clearTimeout(t2)
    }, 380)
    return () => clearTimeout(t1)
  }, [filterKey])

  useEffect(() => {
    if (detailShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [detailShow])

  // Preload poster images for current + adjacent cards
  useEffect(() => {
    [-1, 0, 1].forEach(offset => {
      const idx = ((safeIndex + offset) % n + n) % n
      const show = displayShows[idx]
      if (!show) return
      const url = mediaUrl(show.image, 'medium')
      if (url) { const img = new Image(); img.src = url }
    })
  }, [safeIndex, displayShows])

  function navigate(delta: number) {
    setIndex(i => {
      const next = i + delta
      const nextShow = displayShows[((next % n) + n) % n]
      setGradColor(colorById[nextShow.id] ?? SLOT_COLORS[0])
      return next
    })
  }

  function onTouchStart(e: React.TouchEvent) {
    if (detailShow) return
    startX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (detailShow || startX.current === null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx < -40 && (loop || safeIndex < n - 1)) navigate(1)
    if (dx > 40 && (loop || safeIndex > 0)) navigate(-1)
    startX.current = null
  }

  if (displayShows.length === 0) return (
    <div className="text-center py-16 text-[#F2EDDF]/30">
      <p className="text-4xl mb-4">🎭</p>
      <p>No shows found.</p>
    </div>
  )

  const curr = displayShows[((safeIndex % n + n) % n)]
  const ticketUrl = curr.externalLink || `/shows/${curr.slug}`
  const isExternal = !!curr.externalLink
  const color = companyColor(curr.company)

  const cardW = 200
  const cardH = 300
  const radius = 420

  return (
    <div
      className="select-none relative"
      style={{ background: '#111', padding: '1rem 0 1.5rem', overflow: 'hidden',
        marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)',
        paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Gradient wash — solid colour transitions smoothly, mask creates the fade */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '60%',
          zIndex: 0,
          backgroundColor: gradColor,
          opacity: 0.22,
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          transition: 'background-color 0.5s ease',
        }}
      />

      {/* 3D stage */}
      <div style={{ position: 'relative', zIndex: 1,
        perspective: '1200px',
        perspectiveOrigin: '50% 40%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'rotateY(0deg) scale(1)' : 'rotateY(25deg) scale(0.92)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
        <div className="relative w-full" style={{ height: `${cardH + 80}px` }}>

          {/* Left arrow — inside left edge of centre card (card is 200px wide, centred at 50%) */}
          <button
            onClick={() => navigate(-1)}
            disabled={!loop && safeIndex === 0}
            className="absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 border border-white/15 text-white/70 flex items-center justify-center disabled:opacity-0 transition-all hover:bg-black/60 hover:text-white"
            style={{ fontSize: '18px', left: 'calc(50% - 158px)' }}
          >
            ‹
          </button>

          {/* Right arrow — inside right edge of centre card */}
          <button
            onClick={() => navigate(1)}
            disabled={!loop && safeIndex === n - 1}
            className="absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 border border-white/15 text-white/70 flex items-center justify-center disabled:opacity-0 transition-all hover:bg-black/60 hover:text-white"
            style={{ fontSize: '18px', left: 'calc(50% + 126px)' }}
          >
            ›
          </button>

          {/* Looping: render 9 absolute positions, each maps to a show via modulo.
              Non-looping: render shows by their real index, no repeats. */}
          {(loop
            ? Array.from({ length: 9 }, (_, k) => safeIndex - 4 + k).map(absPos => ({
                absPos,
                offset: absPos - safeIndex,
                show: displayShows[((absPos % n) + n) % n],
              }))
            : displayShows.map((show, i) => ({
                absPos: i,
                offset: i - safeIndex,
                show,
              }))
          ).map(({ absPos, offset, show }) => {
            const abs = Math.abs(offset)

            const angle = offset * 38
            const rad = (angle * Math.PI) / 180
            const tx = Math.sin(rad) * radius
            const tz = Math.cos(rad) * radius - radius
            const scale = Math.max(0.45, 1 - abs * 0.15)
            const visible = abs <= 3

            const transform = `translateX(calc(-50% + ${tx}px)) translateZ(${tz}px) rotateY(${-angle}deg) scale(${scale})`
            const zIndex = 10 - abs
            const opacity = visible ? Math.max(0.35, 1 - abs * 0.2) : 0
            const shadow = abs === 0 ? 'drop-shadow(0 20px 48px rgba(0,0,0,0.9))' : 'none'

            return (
              <div
                key={absPos}
                onClick={() => {
                  if (abs === 0) setDetailShow(show)
                  else navigate(offset)
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  marginTop: `-${cardH / 2}px`,
                  transform,
                  zIndex,
                  filter: shadow,
                  opacity,
                  cursor: 'pointer',
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, filter 0.5s ease',
                }}
              >
                <CarouselCard show={show} colorById={colorById} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Centered title + info */}
      <div className="text-center px-6 mt-6">
        <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>{curr.company}</p>
        <h3 className="font-display text-3xl font-bold text-white leading-tight mb-1">{curr.title}</h3>
        <p className="text-white/40 text-sm mb-5">{shortDateRange(curr)}</p>
        <button
          onClick={() => setDetailShow(curr)}
          className="inline-flex items-center justify-center border border-white/80 text-white font-bold text-xs tracking-widest uppercase px-8 py-2.5 rounded-full transition-colors hover:bg-white hover:text-black"
        >
          View Show
        </button>
      </div>

      {/* Detail drawer */}
      {detailShow && (() => {
        const s = detailShow
        const dImg = mediaUrl(s.image, 'medium') || STATIC_IMAGES[s.slug] || ''
        const dSlotBg = colorById[s.id] ?? SLOT_COLORS[0]
        const dColor = companyColor(s.company)
        const dTicketUrl = s.externalLink || `/shows/${s.slug}`
        const dIsExternal = !!s.externalLink
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setDetailShow(null)}
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Sheet */}
            <div
              className="relative bg-[#1A1A18] rounded-3xl flex flex-col"
              onClick={e => e.stopPropagation()}
              style={{ maxHeight: '80vh', width: '340px', flexShrink: 0 }}
            >
              {/* Close button — inside top-right corner of sheet */}
              <button
                onClick={() => setDetailShow(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors text-lg leading-none"
              >
                ×
              </button>
              <div className="pt-4" />

              {/* Scrollable content */}
              <div className="overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
                {/* Poster — natural size if poster exists, fixed ratio fallback */}
                {dImg
                  ? <div className="mx-5 rounded-xl overflow-hidden">
                      <img src={dImg} alt={s.title} className="w-full h-auto block" />
                    </div>
                  : <div className="mx-5 rounded-xl overflow-hidden aspect-[3/4] flex items-center justify-center text-white/10 text-7xl" style={{ background: dSlotBg }}>🎭</div>
                }

                {/* Info */}
                <div className="px-5 pt-5 pb-8">
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: dColor }}>{s.company}</p>
                  <h3 className="font-display text-3xl font-bold text-white leading-tight mb-1">{s.title}</h3>
                  <p className="text-white/40 text-sm mb-4">{shortDateRange(s)}</p>
                  {s.description && (
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{s.description}</p>
                  )}
                  {(s.director || (s.cast && s.cast.length > 0)) && (
                    <div className="mb-6 space-y-2">
                      {s.director && (
                        <div className="flex gap-2 text-sm">
                          <span className="text-white/30 uppercase tracking-widest text-xs w-20 shrink-0 pt-0.5">Director</span>
                          <span className="text-white/70">{s.director}</span>
                        </div>
                      )}
                      {s.cast && s.cast.length > 0 && (
                        <div className="flex gap-2 text-sm">
                          <span className="text-white/30 uppercase tracking-widest text-xs w-20 shrink-0 pt-0.5">Cast</span>
                          <span className="text-white/70">{s.cast.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <a
                    href={dTicketUrl}
                    {...(dIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="w-full inline-flex items-center justify-center bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-xl transition-colors"
                  >
                    Buy Tickets
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])
  return isMobile
}

export default function Shows() {
  const [shows, setShows] = useState<Show[]>(STATIC_SHOWS)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const isTouchDevice = useIsMobile()

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

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const active = shows.filter(s => !s.endDate || new Date(s.endDate) >= today)

  const companies = deriveCompanies(active)
  const filtered = filter === 'All' ? active : active.filter((s) => s.company === filter)

  return (
    <div className="pt-16">
      <div className="bg-[#1D1D1B] px-4 md:px-8 pt-4 pb-0">
        <section className="py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#8B1A1A]">
          <div className="text-center px-6">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Varscona Theatre</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">IT'S SHOWTIME</h1>
            <p className="text-[#F2EDDF]/60 max-w-xl mx-auto text-lg">
              From sharp-witted comedies to heartfelt dramas, spontaneous improv to dazzling cabaret — all year round.
            </p>
          </div>
        </section>
      </div>

      {/* Chalk content area */}
      <div className="bg-[#1D1D1B] px-4 md:px-8 py-8 flex flex-col gap-6">

        {/* Filter tabs */}
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-6">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            <button
              onClick={() => setFilter('All')}
              className={`col-span-2 sm:col-span-1 px-4 py-1.5 rounded text-sm font-medium tracking-wide transition-colors text-center ${
                filter === 'All' ? 'bg-[#FF5F38] text-white' : 'bg-[#1D1D1B]/8 text-[#1D1D1B]/60 hover:bg-[#1D1D1B]/12 hover:text-[#1D1D1B]'
              }`}
            >
              All
            </button>
            {companies.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded text-sm font-medium tracking-wide transition-colors text-center ${
                  filter === c ? 'bg-[#FF5F38] text-white' : 'bg-[#1D1D1B]/8 text-[#1D1D1B]/60 hover:bg-[#1D1D1B]/12 hover:text-[#1D1D1B]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Carousel — all devices */}
        <section>
          {loading ? (
            <div className="rounded-2xl bg-[#F2EDDF]/10 animate-pulse aspect-[3/4] w-full" />
          ) : (
            <ShowCarousel shows={filtered} colorById={colorById} filterKey={filter} />
          )}
        </section>

        {/* Show list — hidden for now */}
        <section className={`bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-8 hidden`}>
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
                    className="flex items-start gap-4 p-5 rounded-lg bg-[#1D1D1B]/4 hover:bg-[#1D1D1B]/7 border border-[#1D1D1B]/8 hover:border-[#1D1D1B]/15 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-24 md:w-32 aspect-[3/4] rounded overflow-hidden shrink-0" style={{ background: slotBg }}>
                      {img ? (
                        <img src={img} alt={show.title} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#1D1D1B]/20 text-3xl">🎭</div>
                      )}
                    </div>

                    {/* Info + button */}
                    <div className="flex-1 min-w-0 flex flex-col gap-3">
                      <div>
                        <p className="text-xs font-bold tracking-wide uppercase mb-1" style={{ color }}>{show.company}</p>
                        <h3 className="font-display text-lg md:text-2xl font-semibold text-[#1D1D1B] mb-1">{show.title}</h3>
                        <p className="text-[#1D1D1B]/50 text-sm">{shortDateRange(show)}</p>
                      </div>
                      {show.description && (
                        <p className="text-[#1D1D1B]/45 text-sm leading-relaxed line-clamp-2 hidden sm:block">{show.description}</p>
                      )}
                      <a
                        href={ticketUrl}
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="self-start inline-flex items-center justify-center bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors whitespace-nowrap"
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
