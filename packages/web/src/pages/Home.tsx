import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Show } from '../lib/api'
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

  const onstage = (current.length > 0
    ? current
    : sorted.filter(s => s.startDate && new Date(s.startDate) > today).slice(0, 1)
  ).sort((a, b) => {
    const da = a.startDate ? new Date(a.startDate).getTime() : 0
    const db = b.startDate ? new Date(b.startDate).getTime() : 0
    return db - da
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
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashSeen'))

  useEffect(() => {
    api.shows.list()
      .then(setShows)
      .catch(() => { /* CMS not connected yet — use static fallback */ })
  }, [])

  const { onstage, upcoming } = deriveShows(shows)

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
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-20 pb-8 flex flex-col gap-6">

        {/* ── Hero ── */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          {/* Lifted inner panel */}
          <div className="absolute inset-6 md:inset-12 bg-[#8B1A1A] rounded-2xl z-0 shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          {/* Soft vignette over the panel */}
          <div className="absolute inset-6 md:inset-12 rounded-2xl bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0e030360_100%)] z-0" />

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
              <div className={`grid gap-6 ${onstage.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {onstage.map((show) => (
                  <ShowCard key={show.id} show={show} variant="featured" staticImage={STATIC_IMAGES[show.slug]} onClick={() => setSelectedShow(show)} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Cue the Future Banner ── */}
        <section className="relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {upcoming.map((show, i) => (
                  <ShowCard key={show.id} show={show} variant="grid" staticImage={STATIC_IMAGES[show.slug]} onClick={() => setSelectedShow(show)} slotColor={['#FF5F38','#00C09A','#CDAAFF','#4361EE'][i]} />
                ))}
              </div>
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
