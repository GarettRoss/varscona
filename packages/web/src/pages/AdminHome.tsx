import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function AdminHome() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== '1') navigate('/admin')
  }, [navigate])

  return (
    <div className="min-h-screen bg-[#1D1D1B] text-[#F2EDDF]">
      {/* Header */}
      <header className="bg-[#F2EDDF] border-b border-[#1D1D1B]/10 px-4 md:px-6 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase font-medium">Varscona Theatre</span>
          <span className="text-[#1D1D1B]/20">·</span>
          <span className="text-[#1D1D1B]/50 text-sm">Admin</span>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/" className="text-[#1D1D1B]/40 hover:text-[#1D1D1B] text-xs tracking-wide transition-colors">← View Site</a>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); navigate('/admin') }}
            className="text-[#1D1D1B]/40 hover:text-[#1D1D1B] text-xs tracking-wide transition-colors"
          >
            Sign Out
          </button>
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
          <a href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 text-sm text-[#1D1D1B]/60 hover:text-[#1D1D1B] transition-colors border-b border-[#1D1D1B]/8">
            ← View Site
          </a>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); navigate('/admin') }}
            className="flex items-center gap-3 py-3 text-sm text-red-500/70 hover:text-red-500 transition-colors"
          >
            ↩ Sign Out
          </button>
        </div>
      )}

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase font-medium mb-3">Dashboard</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F2EDDF] mb-10">
          What would you like to manage?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Shows tile */}
          <button
            onClick={() => navigate('/admin/shows')}
            className="group text-left rounded-2xl border border-[#F2EDDF]/10 bg-[#F2EDDF]/4 hover:bg-[#F2EDDF]/8 transition-colors p-7 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF5F38]/15 flex items-center justify-center text-2xl">
              🎭
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#F2EDDF] mb-1 group-hover:text-white transition-colors">Show Management</h2>
              <p className="text-sm text-[#F2EDDF]/45 leading-relaxed">Add, edit, and remove shows from the season. Manage posters, dates, companies, and descriptions.</p>
            </div>
            <span className="text-[#FF5F38] text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform inline-block">Open →</span>
          </button>

          {/* Calendar tile */}
          <button
            onClick={() => navigate('/admin/calendar')}
            className="group text-left rounded-2xl border border-[#F2EDDF]/10 bg-[#F2EDDF]/4 hover:bg-[#F2EDDF]/8 transition-colors p-7 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF5F38]/15 flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#F2EDDF] mb-1 group-hover:text-white transition-colors">Booking Calendar</h2>
              <p className="text-sm text-[#F2EDDF]/45 leading-relaxed">View and manage rehearsal room bookings. Create, edit, and delete reservations by day, week, or month.</p>
            </div>
            <span className="text-[#FF5F38] text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform inline-block">Open →</span>
          </button>
        </div>
      </div>
    </div>
  )
}
