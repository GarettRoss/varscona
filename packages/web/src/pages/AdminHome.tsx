import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'

export default function AdminHome() {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== '1') navigate('/admin')
  }, [navigate])

  return (
    <div className="min-h-screen bg-[#1D1D1B] text-[#F2EDDF]">
      <AdminHeader />

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase font-medium mb-3">Dashboard</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F2EDDF] mb-10">
          What would you like to manage?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button
            onClick={() => navigate('/admin/shows')}
            className="group text-left rounded-2xl border border-[#F2EDDF]/10 bg-[#F2EDDF]/4 hover:bg-[#F2EDDF]/8 transition-colors p-7 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF5F38]/15 flex items-center justify-center text-2xl">🎭</div>
            <div>
              <h2 className="font-bold text-lg text-[#F2EDDF] mb-1 group-hover:text-white transition-colors">Show Management</h2>
              <p className="text-sm text-[#F2EDDF]/45 leading-relaxed">Add, edit, and remove shows from the season. Manage posters, dates, companies, and descriptions.</p>
            </div>
            <span className="text-[#FF5F38] text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform inline-block">Open →</span>
          </button>

          <button
            onClick={() => navigate('/admin/calendar')}
            className="group text-left rounded-2xl border border-[#F2EDDF]/10 bg-[#F2EDDF]/4 hover:bg-[#F2EDDF]/8 transition-colors p-7 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF5F38]/15 flex items-center justify-center text-2xl">📅</div>
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
