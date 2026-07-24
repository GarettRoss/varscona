import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'
import { api, mediaUrl, type Show } from '../lib/api'
import { shortDateRange } from '../lib/shortDateRange'
import { companyColor } from '../lib/companyColor'
import ShowCard from '../components/ShowCard'
import ShowModal from '../components/ShowModal'
import SplashScreen from '../components/SplashScreen'
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

// Fallback static shows used before CMS is connected
const STATIC_SHOWS: Show[] = [
  { id: '1',  title: 'Marjorie Prime',                    slug: 'marjorie-prime',       company: 'Trunk Theatre',  dateRange: 'April 15 – May 10, 2026',          description: 'A poignant and witty exploration of memory, loss, and what it means to be human.',                         featured: true,  externalLink: null, image: null, startDate: '2026-04-15', endDate: '2026-05-10' },
  { id: '2',  title: 'Die-Nasty',                         slug: 'die-nasty',             company: 'Die-Nasty',      dateRange: 'Every Monday at 7:30 PM',           description: "Edmonton's legendary live improvised soap opera. No script. No net. No two nights alike.",                 featured: false, externalLink: null, image: null, startDate: '2020-01-01', endDate: '2099-12-31' },
  { id: '3',  title: 'House of Hush',                     slug: 'house-of-hush',         company: 'House of Hush',  dateRange: 'May 20 – June 7, 2026',             description: 'An immersive world premiere. Step inside the house. Something has been left unsaid for decades.',           featured: false, externalLink: null, image: null, startDate: '2026-05-20', endDate: '2026-06-07' },
  { id: '4',  title: 'Fully Committed',                   slug: 'fully-committed',       company: 'Teatro Live!',   dateRange: 'July 14 – August 2, 2026',          description: 'One actor. Forty voices. A bravura one-person comedy set at a Manhattan restaurant.',                     featured: false, externalLink: null, image: null, startDate: '2026-07-14', endDate: '2026-08-02' },
  { id: '5',  title: "Cocktails at Pam's",                slug: 'cocktails-at-pams',     company: 'Teatro Live!',   dateRange: 'August 11 – 30, 2026',              description: 'A fizzy, fast-paced romp through a social gathering where every secret eventually surfaces.',              featured: false, externalLink: null, image: null, startDate: '2026-08-11', endDate: '2026-08-30' },
  { id: '6',  title: 'Autumn',                            slug: 'autumn',                company: 'Shadow Theatre', dateRange: 'September 8 – October 4, 2026',     description: 'A play about endings that feels like a beginning — bittersweet, funny, and achingly real.',               featured: false, externalLink: null, image: null, startDate: '2026-09-08', endDate: '2026-10-04' },
  { id: '7',  title: 'Betrayal',                          slug: 'betrayal',              company: 'Trunk Theatre',  dateRange: 'November 4 – 22, 2026',             description: "Harold Pinter's masterwork of reverse chronology — seven years of a marriage told backwards.",            featured: false, externalLink: null, image: null, startDate: '2026-11-04', endDate: '2026-11-22' },
  { id: '8',  title: 'The Glass Menagerie',               slug: 'glass-menagerie',       company: 'Trunk Theatre',  dateRange: 'February 3 – 21, 2027',             description: "Tennessee Williams's memory play. Tom Wingfield returns to the apartment he fled — tender and shattering.", featured: false, externalLink: null, image: null, startDate: '2027-02-03', endDate: '2027-02-21' },
  { id: '9',  title: 'Die-Nasty: Season Finale',          slug: 'die-nasty-finale',      company: 'Die-Nasty',      dateRange: 'June 8, 2026 – One Night Only',     description: 'Past and present cast members reunite for a no-holds-barred evening of improvised drama.',                 featured: false, externalLink: null, image: null, startDate: '2026-06-08', endDate: '2026-06-08' },
  { id: '10', title: 'Die-Nasty: Halloween Horror',       slug: 'die-nasty-halloween',   company: 'Die-Nasty',      dateRange: 'October 26, 2026 – One Night Only',  description: "Die-Nasty's annual Halloween Horror Special. Costumes encouraged. Screaming permitted.",                  featured: false, externalLink: null, image: null, startDate: '2026-10-26', endDate: '2026-10-26' },
  { id: '11', title: 'Midnight Reverie',                  slug: 'midnight-reverie',      company: 'House of Hush',  dateRange: 'September 15 – October 3, 2026',    description: 'Movement, live sound, and fragmentary text exploring the space between sleep and waking.',                 featured: false, externalLink: null, image: null, startDate: '2026-09-15', endDate: '2026-10-03' },
  { id: '12', title: 'The Still Hours',                   slug: 'the-still-hours',       company: 'House of Hush',  dateRange: 'January 12 – 30, 2027',             description: 'In silence, everything is heard. A meditation on grief, presence, and the moments between moments.',      featured: false, externalLink: null, image: null, startDate: '2027-01-12', endDate: '2027-01-30' },
  { id: '13', title: 'The Penelopiad',                    slug: 'penelopiad',            company: 'Shadow Theatre', dateRange: 'February 9 – 27, 2027',             description: "Margaret Atwood retells the Odyssey from Penelope's side. Who tells the story matters.",                  featured: false, externalLink: null, image: null, startDate: '2027-02-09', endDate: '2027-02-27' },
  { id: '14', title: 'Copenhagen',                        slug: 'copenhagen',            company: 'Shadow Theatre', dateRange: 'November 10 – 28, 2026',            description: "Michael Frayn's tour de force — science, friendship, and moral ambiguity in Nazi-occupied Copenhagen.",   featured: false, externalLink: null, image: null, startDate: '2026-11-10', endDate: '2026-11-28' },
  { id: '15', title: 'The 39 Steps',                      slug: '39-steps',              company: 'Teatro Live!',   dateRange: 'October 13 – 31, 2026',             description: 'Four actors. 150 roles. A genre-bending spy comedy of thrills, spills, and theatrical invention.',        featured: false, externalLink: null, image: null, startDate: '2026-10-13', endDate: '2026-10-31' },
  { id: '16', title: 'Noises Off',                        slug: 'noises-off',            company: 'Teatro Live!',   dateRange: 'March 9 – 27, 2027',                description: "Michael Frayn's comedy of theatrical catastrophe — the funniest farce ever written.",                    featured: false, externalLink: null, image: null, startDate: '2027-03-09', endDate: '2027-03-27' },
]

function OnstageCard({
  show, staticImage, isActive, isInactive, isReturning, onClick, slotColor, index, flipImage, delayMorph,
}: {
  show: Show; staticImage?: string; isActive: boolean; isInactive: boolean; isReturning: boolean; onClick: () => void; slotColor?: string; index: number; flipImage?: boolean; delayMorph?: boolean
}) {
  const color = slotColor || companyColor(show.company) || '#FF8C5A'
  const posterImg = mediaUrl(show.image, 'medium')
  const img = posterImg || staticImage || ''
  const cardRef = useRef<HTMLDivElement>(null)
  const imgContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = imgContainerRef.current
    if (!el) return
    if (!isReturning) {
      el.style.height = ''
      return
    }
    // Capture the current rendered height before anything changes
    const currentHeight = el.offsetHeight
    el.style.transition = 'none'
    el.style.height = `${currentHeight}px`

    const container = cardRef.current?.parentElement?.parentElement
    const numCards = container?.children.length ?? 2
    const gap = 24 * (numCards - 1)
    const finalCardWidth = ((container?.offsetWidth ?? 0) - gap) / numCards
    const targetHeight = finalCardWidth * 0.75

    const raf = requestAnimationFrame(() => {
      el.style.transition = `height 1.1s cubic-bezier(0.16,1,0.3,1)`
      el.style.height = `${targetHeight}px`
    })
    return () => cancelAnimationFrame(raf)
  }, [isReturning])

  return (
    <div
      ref={cardRef}
      className={`onstage-card${isActive ? ' onstage-active' : ''} rounded-2xl overflow-hidden cursor-pointer`}
      style={{ opacity: isInactive ? 0.55 : 1, transition: 'opacity 0.4s ease', background: '#F2EDDF' }}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row" style={{ alignItems: 'center' }}>
        {/* Image — same element, morphs via CSS transitions */}
        <div
          ref={imgContainerRef}
          className={`onstage-img-container ${isActive ? 'w-full sm:w-[38%]' : 'w-full'}`}
          style={{
            flexShrink: 0,
            order: flipImage ? 2 : 1,
            ...(!isReturning && !isActive ? { aspectRatio: '4/3' } : {}),
            ...(isActive ? { maxHeight: '800px' } : {}),
            overflow: 'hidden',
            background: color,
            borderRadius: '1rem',
            transition: `width ${isActive ? '0.9s' : '1.1s'} cubic-bezier(0.16,1,0.3,1)`,
          }}
        >
          {img && (
            <img
              src={img}
              alt={show.title}
              className="onstage-card-img w-full block"
              style={posterImg
                ? {
                    filter: isActive ? 'none' : 'grayscale(1) contrast(8) brightness(1.8)',
                    mixBlendMode: isActive ? 'normal' : 'multiply',
                    transition: `filter ${isActive ? `0.9s ${delayMorph ? '0.55s' : '0s'}` : '1.1s'} cubic-bezier(0.16,1,0.3,1)`,
                  }
                : { objectFit: 'contain' }
              }
            />
          )}
        </div>

        {/* Info panel — slides in beside the image */}
        <div
          className="onstage-info-panel"
          style={{
            flex: 1,
            order: flipImage ? 1 : 2,
            overflow: 'hidden',
            maxWidth: isActive ? '100%' : '0',
            maxHeight: isActive ? '800px' : '0',
            opacity: isActive ? 1 : 0,
            transition: isActive
              ? `max-width 0.9s ${delayMorph ? '0.55s' : '0s'} cubic-bezier(0.16,1,0.3,1), max-height 0.9s ${delayMorph ? '0.55s' : '0s'} cubic-bezier(0.16,1,0.3,1), opacity 0.3s ${delayMorph ? '0.55s' : '0s'} cubic-bezier(0.16,1,0.3,1)`
              : 'opacity 0.25s cubic-bezier(0.16,1,0.3,1), max-width 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s, max-height 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col p-5 space-y-3">
            <div className="space-y-3">
              <p className="text-sm font-bold tracking-widest uppercase" style={{ color }}>{show.company}</p>
              <h3 className="font-display text-2xl font-bold text-[#1D1D1B] leading-tight">{show.title}</h3>
              <p className="text-[#1D1D1B]/50 text-sm">{shortDateRange(show)}</p>
              {show.description && <p className="text-[#1D1D1B]/60 text-sm leading-relaxed">{show.description}</p>}
              {(show.director || (show.cast && show.cast.length > 0)) && (
                <div className="space-y-1">
                  {show.director && <p className="text-xs text-[#1D1D1B]/40"><span className="uppercase tracking-widest mr-2">Director</span>{show.director}</p>}
                  {show.cast && show.cast.length > 0 && <p className="text-xs text-[#1D1D1B]/40"><span className="uppercase tracking-widest mr-2">Cast</span>{show.cast.join(', ')}</p>}
                </div>
              )}
            </div>
            <a
              href={show.externalLink || `/shows/${show.slug}`}
              {...(show.externalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center justify-center text-white font-bold text-sm tracking-widest uppercase px-6 py-3 rounded transition-opacity hover:opacity-80 self-start mt-2"
              style={{ backgroundColor: color }}
              onClick={e => e.stopPropagation()}
            >
              Buy Tickets
            </a>
          </div>
        </div>
      </div>

      {/* Label row — visible when inactive, collapses when active */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: (isActive || isReturning) ? '0' : '60px',
          transition: 'none',
        }}
      >
        <div className="flex items-baseline justify-between px-3 py-3" style={{ containerType: 'inline-size' }}>
          <p
            className="font-bold tracking-widest uppercase whitespace-nowrap overflow-hidden"
            style={{ color, fontSize: isInactive ? 'clamp(0.45rem, 2.5cqw, 0.6rem)' : 'clamp(0.55rem, 3.5cqw, 0.875rem)', transition: 'font-size 0.9s cubic-bezier(0.16,1,0.3,1)' }}
          >{show.company}</p>
          <h3
            className="font-display font-bold text-[#1D1D1B] leading-tight text-right whitespace-nowrap overflow-hidden"
            style={{ fontSize: isInactive ? 'clamp(0.6rem, 4cqw, 0.9rem)' : 'clamp(0.75rem, 6cqw, 1.5rem)', transition: 'font-size 0.9s cubic-bezier(0.16,1,0.3,1)' }}
          >{show.title}</h3>
        </div>
      </div>
    </div>
  )
}

function deriveShows(shows: Show[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sorted = [...shows].sort((a, b) => {
    const da = a.startDate ? new Date(a.startDate).getTime() : Infinity
    const db = b.startDate ? new Date(b.startDate).getTime() : Infinity
    return da - db
  })

  const current = sorted.filter(s => {
    if (!s.startDate || !s.endDate) return false
    return new Date(s.startDate) <= today && new Date(s.endDate) >= today
  })

  const nextUpcoming = sorted.filter(s => s.startDate && new Date(s.startDate) > today).slice(0, 1)
  const onstage = (current.length > 0
    ? [...current, ...nextUpcoming.filter(s => !current.find(c => c.id === s.id))]
    : nextUpcoming
  ).sort((a, b) => {
    // Die-Nasty (permanent run) always sorts to the right slot
    const aPerma = a.slug === 'die-nasty' ? 1 : 0
    const bPerma = b.slug === 'die-nasty' ? 1 : 0
    if (aPerma !== bPerma) return aPerma - bPerma
    const da = a.startDate ? new Date(a.startDate).getTime() : 0
    const db = b.startDate ? new Date(b.startDate).getTime() : 0
    return da - db
  })

  const onstageIds = new Set(onstage.map(s => s.id))

  const upcoming = sorted
    .filter(s => !onstageIds.has(s.id) && s.startDate && new Date(s.startDate) > today)
    .slice(0, 4)

  return { onstage, upcoming }
}

export default function Home() {
  const [shows, setShows] = useState<Show[]>(STATIC_SHOWS)
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [activeOnstageId, setActiveOnstageId] = useState<string | null>(null)
  const [returningId, setReturningId] = useState<string | null>(null)
  const [activeUpcomingId, setActiveUpcomingId] = useState<string | null>(null)
  const [upcomingCardEntered, setUpcomingCardEntered] = useState(false)
  const [hoveredStackId, setHoveredStackId] = useState<string | null>(null)
  const upcomingRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashSeen'))

  useEffect(() => {
    api.shows.list()
      .then(setShows)
      .catch(() => { /* CMS not connected yet — use static fallback */ })
  }, [])

  useEffect(() => {
    if (activeUpcomingId) {
      setUpcomingCardEntered(false)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setUpcomingCardEntered(true)))
      return () => cancelAnimationFrame(raf)
    } else {
      setUpcomingCardEntered(false)
    }
  }, [activeUpcomingId])

  const { onstage, upcoming } = deriveShows(shows)

  const upcomingColors: Record<string, string> = {}
  upcoming.forEach((s, i) => { upcomingColors[s.id] = ['#FF5F38', '#00C09A', '#7B3FE4', '#BF1650'][i] ?? '#FF8C5A' })

  function handleUpcomingClick(show: Show) {
    const before = new Map<string, DOMRect>()
    upcomingRefs.current.forEach((el, id) => { if (el) before.set(id, el.getBoundingClientRect()) })

    flushSync(() => setActiveUpcomingId(prev => prev === show.id ? null : show.id))

    requestAnimationFrame(() => {
      upcomingRefs.current.forEach((el, id) => {
        if (!el) return
        const b = before.get(id)
        if (!b) return
        const a = el.getBoundingClientRect()
        const dx = b.left - a.left
        const dy = b.top - a.top
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return
        el.style.transition = 'none'
        el.style.transform = `translate(${dx}px, ${dy}px)`
        requestAnimationFrame(() => {
          el.style.transition = 'transform 1.1s cubic-bezier(0.16,1,0.3,1)'
          el.style.transform = ''
          setTimeout(() => { el.style.transition = '' }, 1150)
        })
      })
    })
  }

  function handleSplashDone() {
    sessionStorage.setItem('splashSeen', '1')
    setShowSplash(false)
  }

  return (
    <div>
      {showSplash && <SplashScreen onComplete={handleSplashDone} />}
      {selectedShow && (
        <ShowModal
          show={selectedShow}
          staticImage={STATIC_IMAGES[selectedShow.slug]}
          onClose={() => setSelectedShow(null)}
        />
      )}
      {/* ── All sections wrapper ── */}
      <div className="bg-[#1D1D1B] px-4 md:px-8 pt-20 pb-8 flex flex-col gap-6">

        {/* ── Hero ── */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#8B1A1A]">
          {/* Soft vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0e030360_100%)] z-0" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p className="text-[#FF5F38] text-xs font-medium tracking-[0.4em] uppercase mb-6">
              Centre stage in the heart of old Strathcona
            </p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-[#F2EDDF] leading-none mb-4">
              BIG STORIES
            </h1>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-[#FF5F38] leading-none mb-8">
              SMALL THEATRE
            </h1>
            <p className="text-[#F2EDDF]/60 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
              From sharp-witted comedies to heartfelt dramas, spontaneous improv to dazzling cabaret — Edmonton's most intimate stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shows"
                className="inline-flex items-center justify-center gap-2 bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
              >
                See What's On
              </Link>
              <Link
                to="/support/donate"
                className="inline-flex items-center justify-center gap-2 border border-[#F2EDDF]/30 hover:border-[#F2EDDF] text-[#F2EDDF] text-sm tracking-wide uppercase px-8 py-4 rounded transition-colors"
              >
                Support the Theatre
              </Link>
            </div>
          </div>
        </section>

        {/* ── Now Onstage ── */}
        {onstage.length > 0 && (
          <section className="py-14 px-8 bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-baseline justify-between mb-10">
                <h2 className="font-display text-3xl font-semibold text-[#1D1D1B]">Now Onstage</h2>
                <Link to="/shows" className="text-sm text-[#FF5F38] hover:text-[#ff7a57] tracking-wide">
                  All shows →
                </Link>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {onstage.map((show, index) => {
                  const isActive = activeOnstageId === show.id
                  const isInactive = activeOnstageId !== null && !isActive
                  const basis = onstage.length === 1 ? '100%' : isActive ? '75%' : isInactive ? '25%' : 'calc(50% - 12px)'
                  return (
                  <div
                    key={show.id}
                    style={{
                      flexBasis: basis,
                      flexGrow: 0,
                      flexShrink: 1,
                      minWidth: 0,
                      transition: `flex-basis ${isActive ? '0.9s' : '1.1s'} cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                  >
                    <OnstageCard
                      show={show}
                      staticImage={STATIC_IMAGES[show.slug]}
                      slotColor="#FF8C5A"
                      index={index}
                      flipImage={index === 0}
                      isActive={isActive}
                      isInactive={isInactive}
                      isReturning={returningId === show.id}
                      onClick={() => {
                        if (activeOnstageId === show.id) {
                          setReturningId(show.id)
                          setActiveOnstageId(null)
                          setTimeout(() => setReturningId(null), 1300)
                        } else {
                          setReturningId(null)
                          setActiveOnstageId(show.id)
                        }
                      }}
                    />
                  </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Cue the Future Banner ── */}
        <section className="relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#8B1A1A]">
          <div className="relative max-w-7xl mx-auto px-12 py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#FF5F38] text-xs tracking-widest uppercase mb-3">Capital Campaign</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F2EDDF]">Cue the Future</h2>
              <p className="text-[#F2EDDF]/60 max-w-md mt-2">
                Help us secure the next chapter for Edmonton's most beloved intimate stage. Every gift makes a difference.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="https://www.canadahelps.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-bold text-sm tracking-widest uppercase px-10 py-4 rounded transition-colors"
              >
                Donate Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Upcoming Shows ── */}
        {upcoming.length > 0 && (
          <section className="py-14 px-8 bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-display text-3xl font-semibold text-[#1D1D1B]">Upcoming Shows</h2>
                <Link to="/shows" className="text-sm text-[#FF5F38] hover:text-[#ff7a57] tracking-wide">
                  Full season →
                </Link>
              </div>
              <p className="text-[#1D1D1B]/50 mb-10">Next up this season</p>

              {!activeUpcomingId ? (
                /* ── Grid: 4 ShowCards ── */
                <div className="flex flex-row gap-4">
                  {upcoming.map((show) => (
                    <div key={show.id} ref={el => upcomingRefs.current.set(show.id, el)} style={{ flex: '1 1 0', minWidth: 0 }}>
                      <ShowCard
                        show={show}
                        staticImage={STATIC_IMAGES[show.slug]}
                        slotColor={upcomingColors[show.id]}
                        onClick={() => handleUpcomingClick(show)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* ── Expanded: OnstageCard left + stacked pile right ── */
                <div className="flex flex-col sm:flex-row" style={{ gap: '32px', alignItems: 'stretch' }}>
                  {/* Active card */}
                  <div
                    className="w-full sm:flex-1"
                    style={{ minWidth: 0 }}
                    ref={el => upcomingRefs.current.set(activeUpcomingId, el)}
                  >
                    <OnstageCard
                      show={upcoming.find(s => s.id === activeUpcomingId)!}
                      staticImage={STATIC_IMAGES[upcoming.find(s => s.id === activeUpcomingId)?.slug ?? '']}
                      slotColor={upcomingColors[activeUpcomingId]}
                      index={0}
                      flipImage={false}
                      delayMorph
                      isActive
                      isInactive={false}
                      isReturning={false}
                      onClick={() => handleUpcomingClick(upcoming.find(s => s.id === activeUpcomingId)!)}
                    />
                  </div>

                  {/* Stacked pile — hidden on mobile, hover tracked via onMouseMove on desktop */}
                  {(() => {
                    const stackCards = upcoming.filter(s => s.id !== activeUpcomingId)
                    return (
                      <div
                        className="hidden sm:block"
                        style={{ flex: '0 0 42%', position: 'relative', alignSelf: 'center', aspectRatio: '3/2', overflow: 'visible' }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const x = e.clientX - rect.left
                          const pct = (x / rect.width) * 100
                          const zoneW = 100 / stackCards.length
                          const idx = Math.max(0, Math.min(stackCards.length - 1, Math.floor(pct / zoneW)))
                          const newId = stackCards[idx].id
                          if (newId !== hoveredStackId) setHoveredStackId(newId)
                        }}
                        onMouseLeave={() => setHoveredStackId(null)}
                      >
                        {stackCards.map((show, i, arr) => {
                          const posterImg = mediaUrl(show.image, 'medium')
                          const img = posterImg || STATIC_IMAGES[show.slug] || ''
                          const color = upcomingColors[show.id]
                          const isHovered = hoveredStackId === show.id
                          const step = arr.length > 1 ? (100 - 50) / (arr.length - 1) : 0

                          return (
                            <div
                              key={show.id}
                              ref={el => upcomingRefs.current.set(show.id, el)}
                              onClick={() => handleUpcomingClick(show)}
                              style={{
                                position: 'absolute', top: 0, height: '100%',
                                left: `${i * step}%`, width: '50%',
                                zIndex: isHovered ? 10 : (() => {
                                  const hi = arr.findIndex(s => s.id === hoveredStackId)
                                  return hi >= 0 ? (arr.length + 1 - Math.abs(i - hi)) : (arr.length - i)
                                })(),
                                borderRadius: '1rem', overflow: 'hidden',
                                background: color, cursor: 'pointer',
                                boxShadow: isHovered ? '0 8px 32px rgba(0,0,0,0.32)' : '0 4px 20px rgba(0,0,0,0.18)',
                                transition: 'box-shadow 0.2s ease',
                              }}
                            >
                              {img && (
                                <img src={img} alt={show.title} style={{
                                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                                  objectFit: 'cover', objectPosition: 'center',
                                  filter: posterImg ? 'grayscale(1) contrast(8) brightness(1.8)' : 'none',
                                  mixBlendMode: posterImg ? 'multiply' : 'normal',
                                }} />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── About Blurb ── */}
        <section className="py-14 px-8 bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#FF5F38] text-xs tracking-widest uppercase mb-4">Our Theatre</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1D1D1B] mb-6 leading-tight">
                Rebuilt and Renewed
              </h2>
              <p className="text-[#1D1D1B]/60 text-lg leading-relaxed mb-6">
                Beautifully rebuilt in 2016, our theatre retains all the intimacy our audiences love, while heightening the performance experience for both artists and guests.
              </p>
              <p className="text-[#1D1D1B]/60 leading-relaxed mb-8">
                Located in Edmonton's heart of old Strathcona — a renovated fire hall that has been home to some of the most exciting theatre in Canada since 1982.
              </p>
              <Link to="/rent" className="text-sm text-[#FF5F38] hover:text-[#ff7a57] tracking-wide border-b border-[#FF5F38]/30 hover:border-[#FF5F38] pb-0.5 transition-colors">
                Rent our space →
              </Link>
            </div>
            <div>
              <p className="text-[#FF5F38] text-xs tracking-widest uppercase mb-4">Our Companies</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1D1D1B] mb-6 leading-tight">
                Artist-Run, Community-Led
              </h2>
              <p className="text-[#1D1D1B]/60 text-lg leading-relaxed mb-6">
                We're artist-run, meaning everyone on our team both operates and performs in our space — three resident companies, one shared home.
              </p>
              <div className="space-y-3">
                {[
                  { name: 'Shadow Theatre', description: 'Thrilling productions opening hearts and minds' },
                  { name: 'Teatro Live!', description: 'A riot of fun' },
                  { name: 'Die-Nasty', description: 'An Edmonton institution — Monday nights at 7:30' },
                ].map((c) => (
                  <div key={c.name} className="flex items-start gap-3 p-4 bg-[#1D1D1B]/5 rounded">
                    <div className="w-1 h-full bg-[#FF5F38] shrink-0 rounded-full mt-1" />
                    <div>
                      <p className="text-[#1D1D1B] font-medium">{c.name}</p>
                      <p className="text-[#1D1D1B]/50 text-sm">{c.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/who-we-are" className="inline-block mt-6 text-sm text-[#FF5F38] hover:text-[#ff7a57] tracking-wide border-b border-[#FF5F38]/30 hover:border-[#FF5F38] pb-0.5 transition-colors">
                Learn more about our companies →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
