import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/varscona-logo.png'

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
        scrolled ? 'bg-[#F2EDDF]/98 backdrop-blur-sm shadow-md' : 'bg-[#F2EDDF]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <img src={logo} alt="Varscona Theatre" className="h-8 w-auto" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#1D1D1B]/70 font-medium">Theatre</span>
        </Link>

        {/* Click-outside overlay — closes any open dropdown */}
        {openDropdown && (
          <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
        )}

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) =>
            item.children ? (
              <li key={item.label} className="relative z-50">
                <button
                  onClick={() => setOpenDropdown((o) => (o === item.label ? null : item.label))}
                  className="px-4 py-2 text-sm font-medium text-[#1D1D1B]/70 hover:text-[#1D1D1B] tracking-wide uppercase transition-colors flex items-center gap-1"
                >
                  {item.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === item.label && (
                  <ul className="absolute top-full left-0 mt-1 w-52 bg-[#F2EDDF] border border-[#1D1D1B]/10 rounded shadow-xl py-1">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className="block px-4 py-2 text-sm text-[#1D1D1B]/70 hover:text-[#1D1D1B] hover:bg-[#1D1D1B]/5 transition-colors"
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
                      isActive ? 'text-[#FF5F38]' : 'text-[#1D1D1B]/70 hover:text-[#1D1D1B]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Get Tickets CTA */}
        <Link
          to="/shows"
          className="hidden lg:inline-flex items-center justify-center bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
        >
          Get Tickets
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[#1D1D1B]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-[#1D1D1B] mb-1.5 transition-all" />
          <span className="block w-6 h-0.5 bg-[#1D1D1B] mb-1.5 transition-all" />
          <span className="block w-4 h-0.5 bg-[#1D1D1B] transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#F2EDDF] border-t border-[#1D1D1B]/10">
          <ul className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    className="w-full text-left px-2 py-2 text-sm font-medium text-[#1D1D1B]/80 uppercase tracking-wide"
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
                            className="block px-2 py-2 text-sm text-[#1D1D1B]/60 hover:text-[#1D1D1B]"
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
                        isActive ? 'text-[#FF5F38]' : 'text-[#1D1D1B]/80'
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
