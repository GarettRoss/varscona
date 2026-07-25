import { useEffect, useRef, useState } from 'react'
import { fromCircle, separate, splitPathString } from 'flubber'

// ─────────────────────────────────────────────────────────────────
// PHASE 1 — Classic splash (original title + lines animation)
// ─────────────────────────────────────────────────────────────────

function ClassicSplash({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2600)
    const t2 = setTimeout(() => onDone(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div className="splash-line" />
      <h1 className="splash-title">VARSCONA</h1>
      <p className="splash-sub">Theatre</p>
      <div className="splash-line" />
      <p className="splash-tagline">Big Stories &middot; Small Theatre</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// PHASE 2 — Circle-morph splash
// ─────────────────────────────────────────────────────────────────

const RAW: Record<string, string> = {
  V: 'M65.10 9.20L65.10 11.20Q63.10 11.70 60.85 13.90Q58.60 16.10 56.70 21L34 80.40Q33.60 80.40 33.20 80.40Q32.80 80.40 32.30 80.40Q31.90 80.40 31.50 80.40Q31.10 80.40 30.70 80.40L5.90 17.60Q4.40 13.90 2.60 12.60Q0.80 11.30-0.80 11.20L-0.80 9.20Q1.50 9.30 4.85 9.40Q8.20 9.50 11.40 9.50Q15.50 9.50 19.15 9.40Q22.80 9.30 25 9.20L25 11.20Q21.70 11.30 19.90 12Q18.10 12.70 17.95 14.45Q17.80 16.20 19.10 19.60L37.60 67.90L35.80 69.90L52 27.30Q54.30 21.20 54.30 17.75Q54.30 14.30 52.10 12.80Q49.90 11.30 45.70 11.20L45.70 9.20Q48.80 9.30 51.80 9.40Q54.80 9.50 57.50 9.50Q60 9.50 61.80 9.40Q63.60 9.30 65.10 9.20',
  A: 'M33.80 8.80L58.20 71.60Q59.60 75.30 61.45 76.60Q63.30 77.90 64.90 78L64.90 80Q62.50 79.80 59.25 79.75Q56 79.70 52.70 79.70Q48.50 79.70 44.90 79.75Q41.30 79.80 39.10 80L39.10 78Q44.20 77.80 45.55 76.25Q46.90 74.70 44.90 69.60L26.90 21L28.50 19.20L11.90 62.60Q10.10 67.10 9.75 70.10Q9.40 73.10 10.25 74.80Q11.10 76.50 13.20 77.20Q15.30 77.90 18.40 78L18.40 80Q15.40 79.80 12.35 79.75Q9.30 79.70 6.60 79.70Q4.20 79.70 2.35 79.75Q0.50 79.80-1 80L-1 78Q1.10 77.50 3.20 75.50Q5.30 73.50 7.20 68.70L30.40 8.80Q31.20 8.80 32.10 8.80Q33 8.80 33.80 8.80',
  R: 'M3.90 11.20L3.90 9.20Q6.20 9.30 9.85 9.40Q13.50 9.50 17.10 9.50Q21.90 9.50 26.25 9.40Q30.60 9.30 32.40 9.30Q40.90 9.30 46.55 11.50Q52.20 13.70 54.95 17.65Q57.70 21.60 57.70 26.70Q57.70 29.80 56.45 33.25Q55.20 36.70 52.10 39.65Q49 42.60 43.70 44.50Q38.40 46.40 30.20 46.40L20.60 46.40L20.60 44.40L29.20 44.40Q35.90 44.40 39.45 42.15Q43 39.90 44.25 36.15Q45.50 32.40 45.50 27.80Q45.50 19.90 42.10 15.55Q38.70 11.20 30.30 11.20Q26 11.20 24.65 12.90Q23.30 14.60 23.30 19.80L23.30 69.40Q23.30 73 23.90 74.80Q24.50 76.60 26.20 77.20Q27.90 77.80 31.20 78L31.20 80Q28.80 79.80 25.15 79.75Q21.50 79.70 17.70 79.70Q13.50 79.70 9.85 79.75Q6.20 79.80 3.90 80L3.90 78Q7.30 77.80 9 77.20Q10.70 76.60 11.25 74.80Q11.80 73 11.80 69.40L11.80 19.80Q11.80 16.10 11.25 14.35Q10.70 12.60 8.95 11.95Q7.20 11.30 3.90 11.20M21 46.40L20.80 44.70Q25.90 44.90 29 45.15Q32.10 45.40 34.20 45.60Q36.30 45.80 38.10 46.10Q45.60 47.10 49.05 50.10Q52.50 53.10 53.80 59.30L56.30 69.50Q57.20 73.80 58.25 75.60Q59.30 77.40 61.40 77.40Q63 77.30 64.05 76.45Q65.10 75.60 66.30 74.10L67.70 75.20Q65.40 78.30 62.90 79.85Q60.40 81.40 56.20 81.40Q51.90 81.40 48.85 79.15Q45.80 76.90 44.50 70.60L42.50 60.60Q41.60 56.30 40.50 53.15Q39.40 50 37.45 48.20Q35.50 46.40 31.80 46.40',
  S: 'M26.50 8Q31.80 8 34.60 9.20Q37.40 10.40 39.50 11.80Q40.70 12.50 41.45 12.85Q42.20 13.20 42.90 13.20Q43.90 13.20 44.35 12.10Q44.80 11 45.10 8.80L47.40 8.80Q47.30 10.60 47.15 13.05Q47 15.50 46.95 19.50Q46.90 23.50 46.90 30L44.60 30Q44.30 25.10 42.45 20.50Q40.60 15.90 37.05 13Q33.50 10.10 28 10.10Q22.90 10.10 19.55 13.15Q16.20 16.20 16.20 21.20Q16.20 25.60 18.40 28.55Q20.60 31.50 24.45 34.05Q28.30 36.60 33.20 39.70Q38.20 42.90 42.20 46.05Q46.20 49.20 48.50 53Q50.80 56.80 50.80 62.20Q50.80 68.70 47.75 72.95Q44.70 77.20 39.60 79.30Q34.50 81.40 28.40 81.40Q22.80 81.40 19.50 80.20Q16.20 79 13.90 77.70Q11.70 76.30 10.50 76.30Q9.50 76.30 9.05 77.40Q8.60 78.50 8.30 80.70L6 80.70Q6.20 78.50 6.25 75.55Q6.30 72.60 6.35 67.80Q6.40 63 6.40 55.70L8.70 55.70Q9.10 61.90 10.95 67.30Q12.80 72.70 16.65 75.95Q20.50 79.20 26.90 79.20Q30.30 79.20 33.20 77.90Q36.10 76.60 37.90 73.80Q39.70 71 39.70 66.60Q39.70 62.50 37.75 59.40Q35.80 56.30 32.35 53.65Q28.90 51 24.30 48.20Q19.60 45.20 15.50 42.20Q11.40 39.20 8.95 35.20Q6.50 31.20 6.50 25.70Q6.50 19.60 9.35 15.70Q12.20 11.80 16.75 9.90Q21.30 8 26.50 8',
  C: 'M38 7.80Q44.60 7.80 48.85 9.75Q53.10 11.70 56.40 14.30Q58.40 15.80 59.45 14.65Q60.50 13.50 60.90 9.20L63.20 9.20Q63 13 62.90 18.35Q62.80 23.70 62.80 32.60L60.50 32.60Q59.80 28.20 59.15 25.40Q58.50 22.60 57.45 20.60Q56.40 18.60 54.60 16.70Q51.70 13.10 47.50 11.50Q43.30 9.90 38.60 9.90Q33.50 9.90 29.60 12.45Q25.70 15 23.05 19.70Q20.40 24.40 19 30.80Q17.60 37.20 17.60 44.80Q17.60 52.60 19.10 58.95Q20.60 65.30 23.45 69.85Q26.30 74.40 30.35 76.85Q34.40 79.30 39.40 79.30Q43.50 79.30 47.90 77.65Q52.30 76 54.90 72.60Q57.70 69.60 58.75 65.85Q59.80 62.10 60.50 55.60L62.80 55.60Q62.80 64.80 62.90 70.45Q63 76.10 63.20 80L60.90 80Q60.50 75.70 59.55 74.60Q58.60 73.50 56.40 74.90Q52.70 77.50 48.55 79.45Q44.40 81.40 37.90 81.40Q28 81.40 20.60 77.10Q13.20 72.80 9.10 64.70Q5 56.60 5 45.20Q5 34 9.25 25.60Q13.50 17.20 20.90 12.50Q28.30 7.80 38 7.80',
  O: 'M38 7.80Q47.80 7.80 55.25 12.10Q62.70 16.40 66.80 24.45Q70.90 32.50 70.90 44Q70.90 55.20 66.70 63.60Q62.50 72 55 76.70Q47.50 81.40 37.90 81.40Q28 81.40 20.60 77.10Q13.20 72.80 9.10 64.70Q5 56.60 5 45.20Q5 34 9.25 25.60Q13.50 17.20 20.90 12.50Q28.30 7.80 38 7.80M37.60 9.60Q31.40 9.60 26.80 14.10Q22.20 18.60 19.70 26.50Q17.20 34.40 17.20 44.80Q17.20 55.40 20 63.25Q22.80 71.10 27.60 75.35Q32.40 79.60 38.30 79.60Q44.50 79.60 49.05 75.10Q53.60 70.60 56.15 62.65Q58.70 54.70 58.70 44.40Q58.70 33.70 55.85 25.90Q53 18.10 48.25 13.85Q43.50 9.60 37.60 9.60',
  N: 'M67.80 9.20L67.80 11.20Q64.40 11.40 62.70 12.40Q61 13.40 60.45 15.65Q59.90 17.90 59.90 22L59.90 80.40Q59.10 80.40 58.30 80.40Q57.50 80.40 56.60 80.40L14.20 18.80L14.20 66.80Q14.20 71 14.80 73.35Q15.40 75.70 17.40 76.70Q19.40 77.70 23.50 78L23.50 80Q21.60 79.80 18.65 79.75Q15.70 79.70 13.10 79.70Q10.60 79.70 8.10 79.75Q5.60 79.80 4 80L4 78Q7.30 77.70 9 76.75Q10.70 75.80 11.30 73.50Q11.90 71.20 11.90 67.20L11.90 19.80Q11.90 16.10 11.30 14.35Q10.70 12.60 9 11.95Q7.30 11.30 4 11.20L4 9.20Q5.60 9.30 8.10 9.40Q10.60 9.50 13.10 9.50Q15.30 9.50 17.40 9.40Q19.50 9.30 21.10 9.20L57.60 61.40L57.60 22.40Q57.60 18.10 56.95 15.80Q56.30 13.50 54.30 12.45Q52.30 11.40 48.30 11.20L48.30 9.20Q50.10 9.30 53.10 9.40Q56.10 9.50 58.70 9.50Q61.20 9.50 63.70 9.40Q66.20 9.30 67.80 9.20',
}

const SLOTS: Array<{ key: keyof typeof RAW; evenodd: boolean }> = [
  { key: 'V', evenodd: false },
  { key: 'A', evenodd: false },
  { key: 'R', evenodd: false },
  { key: 'S', evenodd: false },
  { key: 'C', evenodd: false },
  { key: 'O', evenodd: true  },
  { key: 'N', evenodd: false },
  { key: 'A', evenodd: false },
]

const VIEW = '-5 4 82 82'
const CX = 36, CY = 45, CR = 35
const CIRCLE_PATH =
  `M${CX - CR},${CY}A${CR},${CR},0,1,1,${CX + CR},${CY}A${CR},${CR},0,1,1,${CX - CR},${CY}Z`

const interpolators = SLOTS.map(({ key }) => {
  const subs = splitPathString(RAW[key])
  if (subs.length > 1) return separate(CIRCLE_PATH, subs, { single: true, maxSegmentLength: 5 })
  return fromCircle(CX, CY, CR, RAW[key], { maxSegmentLength: 5 })
})

const CIRCLE_STAGGER  = 200
const CIRCLE_FADE     = 300
const PAUSE           = 700
const MORPH_STAGGER   = 60
const MORPH_DURATION  = 1000
const CIRCLES_DONE    = (SLOTS.length - 1) * CIRCLE_STAGGER + CIRCLE_FADE
const MORPH_START     = CIRCLES_DONE + PAUSE
const MORPH_DONE      = MORPH_START + (SLOTS.length - 1) * MORPH_STAGGER + MORPH_DURATION

function LetterShape({ index, opacity, morph }: { index: number; opacity: number; morph: number }) {
  const d = interpolators[index](morph)
  return (
    <svg viewBox={VIEW} width="100%" height="100%" style={{ display: 'block' }}>
      <path d={d} fill="#F2EDDF" fillRule={SLOTS[index].evenodd ? 'evenodd' : 'nonzero'} opacity={opacity} />
    </svg>
  )
}

function MorphSplash({ onDone }: { onDone: () => void }) {
  const [opacities, setOpacities] = useState<number[]>(() => SLOTS.map(() => 0))
  const [morphs,    setMorphs]    = useState<number[]>(() => SLOTS.map(() => 0))
  const [fading,    setFading]    = useState(false)
  const rafRef   = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now
      const t = now - startRef.current

      setOpacities(SLOTS.map((_, i) =>
        Math.max(0, Math.min(1, (t - i * CIRCLE_STAGGER) / CIRCLE_FADE))
      ))
      setMorphs(SLOTS.map((_, i) => {
        const raw = Math.max(0, Math.min(1, (t - MORPH_START - i * MORPH_STAGGER) / MORPH_DURATION))
        return 1 - Math.pow(1 - raw, 3)
      }))

      if (t < MORPH_DONE) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const fadeAt = MORPH_DONE + 500
    const doneAt = fadeAt + 900
    const t1 = setTimeout(() => setFading(true), fadeAt)
    const t2 = setTimeout(() => onDone(), doneAt)

    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  const allMorphed = morphs[7] > 0.85

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.9s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2px, 0.5vw, 6px)' }}>
        {SLOTS.map((_, i) => (
          <div key={i} style={{ width: 'clamp(36px, 8vw, 72px)', height: 'clamp(36px, 8vw, 72px)', flexShrink: 0 }}>
            <LetterShape index={i} opacity={opacities[i]} morph={morphs[i]} />
          </div>
        ))}
      </div>
      <div className="splash-line" />
      <p
        className="splash-sub"
        style={{
          marginTop: '0',
          opacity:   allMorphed ? 1 : 0,
          transform: allMorphed ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        Theatre
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Main export — sequences classic → morph
// ─────────────────────────────────────────────────────────────────

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'classic' | 'morph'>('classic')

  return (
    <div className="splash">
      <div className="splash-inner">
        {phase === 'classic'
          ? <ClassicSplash onDone={() => setPhase('morph')} />
          : <MorphSplash   onDone={onComplete} />
        }
      </div>
    </div>
  )
}
