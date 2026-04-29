import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Shows', to: '/shows' },
  {
    label: 'About Us',
    children: [
      { label: 'Who We Are', to: '/who-we-are' },
      { label: 'Community & Accountability', to: '/community' },
      { label: 'Jobs', to: '/jobs' },
    ],
  },
  { label: 'Contact', to: '/contact' },
  { label: 'Rent', to: '/rent' },
  {
    label: 'Support',
    children: [
      { label: 'Donate Today', to: '/support/donate' },
      { label: 'Become A Member', to: '/support/membership' },
      { label: 'Cue the Future', to: '/support/cue-the-future' },
    ],
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-end gap-3 shrink-0">
          <span className="text-white font-display text-xl font-semibold tracking-wide">
            VARSCONA
          </span>
          <span className="hidden sm:inline text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-light mb-0.5">
            Theatre
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) =>
            item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white tracking-wide uppercase transition-colors flex items-center gap-1">
                  {item.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === item.label && (
                  <ul className="absolute top-full left-0 mt-1 w-52 bg-black/95 backdrop-blur-sm border border-white/10 rounded shadow-xl py-1">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <NavLink
                  to={item.to!}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                      isActive ? 'text-[#c9a84c]' : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <span className="block w-4 h-0.5 bg-white transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-sm border-t border-white/10">
          <ul className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    className="w-full text-left px-2 py-2 text-sm font-medium text-white/80 uppercase tracking-wide"
                    onClick={() =>
                      setOpenDropdown((o) => (o === item.label ? null : item.label))
                    }
                  >
                    {item.label}
                  </button>
                  {openDropdown === item.label && (
                    <ul className="pl-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className="block px-2 py-2 text-sm text-white/60 hover:text-white"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to!}
                    className={({ isActive }) =>
                      `block px-2 py-2 text-sm font-medium uppercase tracking-wide ${
                        isActive ? 'text-[#c9a84c]' : 'text-white/80'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
