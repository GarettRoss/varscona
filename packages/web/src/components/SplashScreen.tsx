import { useState, useEffect } from 'react'
import logo from '../assets/varscona-logo.png'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3000)
    const doneTimer = setTimeout(() => onComplete(), 3900)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onComplete])

  return (
    <div className={`splash${fading ? ' splash-out' : ''}`}>
      <div className="splash-inner">
        <div className="splash-line" />
        <img
          src={logo}
          alt="Varscona Theatre"
          className="splash-logo"
          style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
        />
        <p className="splash-sub">Theatre</p>
        <div className="splash-line" />
        <p className="splash-tagline">Big Stories &middot; Small Theatre</p>
      </div>
    </div>
  )
}
