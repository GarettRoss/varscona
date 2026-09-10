import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, type Show, mediaUrl } from '../lib/api'
import { companyColor } from '../lib/companyColor'
const STATIC_IMAGES: Record<string, string> = {}

// Last Monday of October for a given year
function lastMondayOfOctober(year: number): Date {
  const oct31 = new Date(year, 9, 31, 12, 0, 0)
  const dow = oct31.getDay() // 0=Sun,1=Mon…6=Sat
  oct31.setDate(oct31.getDate() - ((dow + 6) % 7)) // roll back to Monday
  return oct31
}

// Die-Nasty: season opens on last Monday of October.
// Before that date → show that opening date.
// On/after that date → show the next upcoming Monday.
function dieNastyDate(): { mm: string; dd: string } {
  const now = new Date()
  now.setHours(12, 0, 0, 0)
  const seasonStart = lastMondayOfOctober(now.getFullYear())
  let target: Date
  if (now < seasonStart) {
    target = seasonStart
  } else {
    target = new Date(now)
    const day = target.getDay()
    if (day !== 1) target.setDate(target.getDate() + ((8 - day) % 7 || 7))
  }
  return {
    mm: String(target.getMonth() + 1).padStart(2, '0'),
    dd: String(target.getDate()).padStart(2, '0'),
  }
}

function showImage(show: Show): string {
  const poster = mediaUrl(show.image, 'medium')
  if (poster) return poster
  const card = mediaUrl((show as any).cardImage, 'medium')
  if (card) return card
  return STATIC_IMAGES[show.slug] ?? ''
}

function FilterPill({ label, isActive, onClick }: { label: string; value?: string; isActive: boolean; onClick: () => void }) {
  const color = '#FF5F38'
  return (
    <button
      onClick={onClick}
      className="rounded tracking-widest uppercase font-medium transition-all duration-200 whitespace-nowrap"
      style={{
        fontSize: '11px',
        padding: '4px 10px',
        background: isActive ? color : 'rgba(29,29,27,0.08)',
        color: isActive ? '#fff' : 'rgba(29,29,27,0.55)',
      }}
    >
      {label}
    </button>
  )
}

function ShowRow({ show }: { show: Show }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const color = companyColor(show.company)
  const img = showImage(show)
  const isDieNasty = show.slug === 'die-nasty'
  const dateLabel = isDieNasty
    ? (() => { const { mm, dd } = dieNastyDate(); return `${mm}/${dd}` })()
    : show.startDate
      ? (() => {
          const d = new Date(show.startDate + 'T12:00:00')
          return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
        })()
      : '––'

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/shows/${show.slug}`)}
    >
      {/* hover background */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{ background: color, opacity: hovered ? 0.18 : 0 }}
      />

      <div className="relative flex items-center gap-6 md:gap-10 px-4 md:px-8 py-6 md:py-8">

        {/* number */}
        <span
          className="font-sans text-sm md:text-base font-medium tabular-nums shrink-0 transition-colors duration-300 tracking-widest"
          style={{ color: hovered ? color : '#F2EDDF55' }}
        >
          {dateLabel}
        </span>

        {/* title + company */}
        <div className="flex-1 min-w-0">
          <h2
            className="font-display text-2xl md:text-4xl font-bold text-[#F2EDDF] leading-tight truncate transition-colors duration-300"
            style={{ color: hovered ? '#F2EDDF' : '#F2EDDFcc' }}
          >
            {show.title}
          </h2>
          <p
            className="text-xs tracking-[0.25em] uppercase mt-1 font-medium transition-colors duration-300"
            style={{ color }}
          >
            {show.company}
          </p>
        </div>

        {/* dates — hidden on small screens */}
        <span className="hidden md:block text-sm tracking-widest uppercase text-[#F2EDDF]/40 shrink-0 text-right transition-colors duration-300 group-hover:text-[#F2EDDF]/70">
          {show.dateRange}
        </span>

        {/* arrow + optional thumbnail */}
        <div className="flex items-center gap-4 shrink-0">
          {/* thumbnail — appears on hover */}
          <div
            className="hidden md:block rounded-lg overflow-hidden transition-all duration-300 shrink-0"
            style={{
              width: hovered ? 56 : 0,
              height: 56,
              opacity: hovered ? 1 : 0,
              background: color,
            }}
          >
            {img
              ? <img
                  src={img}
                  alt={show.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(1) contrast(8) brightness(1.8)', mixBlendMode: 'multiply' }}
                />
              : null
            }
          </div>

          <span
            className="text-lg transition-all duration-300"
            style={{ color, transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}
          >
            →
          </span>
        </div>
      </div>

      {/* divider */}
      <div className="h-px mx-4 md:mx-8" style={{ background: '#F2EDDF0f' }} />
    </div>
  )
}

// Effective sort date for a show (Die-Nasty uses its dynamic next-Monday date)
function effectiveSortDate(show: Show): Date {
  if (show.slug === 'die-nasty') {
    const { mm, dd } = dieNastyDate()
    const year = new Date().getFullYear()
    return new Date(`${year}-${mm}-${dd}T12:00:00`)
  }
  return show.startDate ? new Date(show.startDate + 'T12:00:00') : new Date('9999-01-01')
}

export default function ShowsV2() {
  const [shows, setShows] = useState<Show[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const FIELDS = '"id": _id, title, "slug": slug.current, company, dateRange, startDate, endDate, description, featured, "externalLink": externalLink, image, cardImage, director, cast, imagePosition'
    const query = encodeURIComponent(`*[_type == "show"] | order(startDate asc) { ${FIELDS} }`)
    fetch(`https://tt49pmnb.api.sanity.io/v2024-01-01/data/query/production?query=${query}`)
      .then(r => r.json())
      .then(d => setShows(d.result ?? []))
      .catch(() => {})
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const active = shows
    .filter(s => !s.endDate || new Date(s.endDate) >= today)
    .sort((a, b) => effectiveSortDate(a).getTime() - effectiveSortDate(b).getTime())

  // Build rolling 6-month window of months that have shows
  const months = useMemo(() => {
    const now = new Date()
    const thisYear = now.getFullYear()
    const thisMonth = now.getMonth() // 0-indexed
    const result: { key: string; label: string }[] = []
    for (let i = 0; i < 6; i++) {
      const d = new Date(thisYear, thisMonth + i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const label = d.toLocaleString('default', { month: 'long' })
      // Only include months that have at least one active show
      const hasShow = active.some(s => {
        const start = s.startDate ? new Date(s.startDate + 'T00:00:00') : null
        const end = s.endDate ? new Date(s.endDate + 'T23:59:59') : null
        const mStart = new Date(d.getFullYear(), d.getMonth(), 1)
        const mEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)
        if (s.slug === 'die-nasty') return true
        if (!start) return false
        return start <= mEnd && (!end || end >= mStart)
      })
      if (hasShow) result.push({ key, label })
    }
    return result
  }, [active])

  const filtered = useMemo(() => {
    if (filter === 'All') return active
    const [year, month] = filter.split('-').map(Number)
    const mStart = new Date(year, month - 1, 1)
    const mEnd = new Date(year, month, 0, 23, 59, 59)
    return active.filter(s => {
      if (s.slug === 'die-nasty') return true
      const start = s.startDate ? new Date(s.startDate + 'T00:00:00') : null
      const end = s.endDate ? new Date(s.endDate + 'T23:59:59') : null
      if (!start) return false
      return start <= mEnd && (!end || end >= mStart)
    })
  }, [active, filter])

  return (
    <div className="h-screen overflow-hidden bg-[#1D1D1B] flex flex-col">

      {/* Header */}
      <div className="pt-32 pb-10 px-4 md:px-16 max-w-6xl mx-auto w-full shrink-0">
        <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Varscona Theatre</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-[#F2EDDF] leading-none mb-6">
          The Season
        </h1>
        <p className="text-[#F2EDDF]/50 text-lg max-w-xl">
          All year round — comedy, drama, improv, and everything in between.
        </p>
      </div>

      {/* Company filter */}
      <div className="px-4 md:px-16 max-w-6xl mx-auto w-full mb-8 shrink-0">
        <div className="bg-[#F2EDDF] rounded-2xl px-6 py-4">
          <div style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133%' }}>
            <div className="flex gap-2 items-start">
              <FilterPill label="All" value="All" isActive={filter === 'All'} onClick={() => setFilter('All')} />
              <div className="flex flex-wrap gap-2">
                {months.map(m => (
                  <FilterPill key={m.key} label={m.label} value={m.key} isActive={filter === m.key} onClick={() => setFilter(m.key)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show list — scrolls inside, rest of page locked */}
      <div className="max-w-6xl mx-auto w-full px-0 md:px-8 flex flex-col min-h-0 flex-1 pb-16">
        {/* top rule */}
        <div className="h-px mx-4 md:mx-0 shrink-0" style={{ background: '#F2EDDF1a' }} />

        <div
          style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
          className="[&::-webkit-scrollbar]:hidden flex-1"
        >
          {filtered.map((show) => (
            <ShowRow key={show.id} show={show} />
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-[#F2EDDF]/30 py-24 text-lg">No shows found.</p>
          )}
        </div>

        {/* bottom rule */}
        <div className="h-px mx-4 md:mx-0 shrink-0" style={{ background: '#F2EDDF1a' }} />
      </div>
    </div>
  )
}
