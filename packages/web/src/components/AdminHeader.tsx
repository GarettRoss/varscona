import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type Props = {
  onRefresh?: () => void
  refreshing?: boolean
}

export default function AdminHeader({ onRefresh, refreshing }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function signOut() {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin')
  }

  const navItems = [
    { label: 'Dashboard',        path: '/admin/dashboard' },
    { label: 'Show Management',  path: '/admin/shows' },
    { label: 'Booking Calendar', path: '/admin/calendar' },
  ]

  return (
    <>
      <header className="bg-[#F2EDDF] border-b border-[#1D1D1B]/10 px-4 md:px-6 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase font-medium">Varscona Theatre</span>
          <span className="text-[#1D1D1B]/20">·</span>
          <span className="text-[#1D1D1B]/50 text-sm">Admin</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-xs tracking-wide transition-colors ${
                pathname === item.path
                  ? 'text-[#1D1D1B] font-semibold'
                  : 'text-[#1D1D1B]/40 hover:text-[#1D1D1B]'
              }`}
            >
              {item.label}
            </button>
          ))}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="text-xs text-[#1D1D1B]/40 hover:text-[#1D1D1B] tracking-wide transition-colors disabled:opacity-30"
            >
              ↺ Refresh
            </button>
          )}
          <div className="w-px h-4 bg-[#1D1D1B]/15" />
          <a href="/" className="text-xs text-[#1D1D1B]/40 hover:text-[#1D1D1B] tracking-wide transition-colors">← View Site</a>
          <button onClick={signOut} className="text-xs text-[#1D1D1B]/40 hover:text-[#1D1D1B] tracking-wide transition-colors">Sign Out</button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-1"
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-[#1D1D1B]/60" />
          <span className="block w-5 h-0.5 bg-[#1D1D1B]/60" />
          <span className="block w-5 h-0.5 bg-[#1D1D1B]/60" />
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F2EDDF] border-b border-[#1D1D1B]/10 px-4 py-2 flex flex-col">
          {navItems.map((item, i) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMenuOpen(false) }}
              className={`flex items-center gap-3 py-3 text-sm transition-colors border-b border-[#1D1D1B]/8 ${
                pathname === item.path
                  ? 'text-[#1D1D1B] font-semibold'
                  : 'text-[#1D1D1B]/60 hover:text-[#1D1D1B]'
              } ${i === navItems.length - 1 ? 'border-b border-[#1D1D1B]/8' : ''}`}
            >
              {item.label}
            </button>
          ))}
          {onRefresh && (
            <button
              onClick={() => { onRefresh(); setMenuOpen(false) }}
              disabled={refreshing}
              className="flex items-center gap-3 py-3 text-sm text-[#1D1D1B]/60 hover:text-[#1D1D1B] transition-colors border-b border-[#1D1D1B]/8 disabled:opacity-30"
            >
              ↺ Refresh
            </button>
          )}
          <a href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 text-sm text-[#1D1D1B]/60 hover:text-[#1D1D1B] transition-colors border-b border-[#1D1D1B]/8">
            ← View Site
          </a>
          <button onClick={signOut} className="flex items-center gap-3 py-3 text-sm text-red-500/70 hover:text-red-500 transition-colors">
            ↩ Sign Out
          </button>
        </div>
      )}
    </>
  )
}
