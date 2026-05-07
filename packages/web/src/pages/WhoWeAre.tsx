import { useState } from 'react'
import { type StaffMember } from '../lib/api'

const STATIC_STAFF: StaffMember[] = [
  { id: '1', name: 'Kendra Connor', role: 'Executive Director', email: 'executivedirector@varsconatheatre.com', photo: null, sortOrder: 1, isBoardMember: false },
  { id: '2', name: 'Coralie Cairns', role: 'Accounts Manager', email: 'accounts@varsconatheatre.com', photo: null, sortOrder: 2, isBoardMember: false },
  { id: '3', name: 'Garett Ross', role: 'Front of House Manager', email: 'frontofhouse@varsconatheatre.com', photo: null, sortOrder: 3, isBoardMember: false },
  { id: '4', name: 'Davina Stewart', role: 'Director of Communications, Theatre Rentals', email: 'communications@varsconatheatre.com', photo: null, sortOrder: 4, isBoardMember: false },
]

const STATIC_BOARD = [
  { name: 'Victoria Jones', role: 'President' },
  { name: 'Heather Klimchuk', role: 'Vice-president' },
  { name: 'Kerry Powell', role: 'Secretary' },
  { name: 'Mark Reid', role: 'Treasurer' },
  { name: 'Jim McKillop', role: 'Past President' },
  { name: 'Norm St. Arnaud', role: 'Director' },
  { name: 'Stacey Boychuk-Cooper', role: 'Director' },
  { name: 'Belinda Cornish', role: 'Director' },
  { name: 'James Song', role: 'Director' },
  { name: 'Sherine Spence', role: 'Director' },
  { name: 'Dónal O\'Beirne', role: 'Director' },
  { name: 'Andrew MacDonald-Smith', role: 'Director' },
  { name: 'Natasha Soles', role: 'Director' },
  { name: 'Jason Hardwick', role: 'Director' },
]

export default function WhoWeAre() {
  const [staff] = useState<StaffMember[]>(STATIC_STAFF)

  const team = staff.filter((s) => !s.isBoardMember)

  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">About Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-6 leading-tight">
              Where talent and collaboration wonderfully collide
            </h1>
            <p className="text-[#F2EDDF]/60 text-lg leading-relaxed max-w-2xl mx-auto">
              Founded in 1982 as a summer festival space, Varscona has become one of North America's most important arts incubators — a renovated fire hall on Whyte Avenue alive with imagination, experimentation, and entrepreneurial energy.
            </p>
          </div>
        </section>
      </div>

      {/* Resident Companies */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-2">Our Companies</p>
          <h2 className="font-display text-4xl font-bold text-white mb-12">Resident Theatre Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Shadow Theatre',
                tagline: 'Thrilling productions opening hearts and minds',
                href: 'https://www.shadowtheatre.org',
                email: 'info@shadowtheatre.org',
                phone: '(780) 434-5564',
              },
              {
                name: 'Teatro Live!',
                tagline: 'A riot of fun',
                href: 'https://www.teatrolive.com',
                email: 'teatro@teatrolive.com',
                phone: '(780) 554-2974',
              },
              {
                name: 'Die-Nasty',
                tagline: 'An Edmonton institution — Monday nights at 7:30',
                href: 'https://www.die-nasty.com',
                email: 'dienasty.soaps@gmail.com',
                phone: null,
              },
            ].map((c) => (
              <div key={c.name} className="p-8 bg-white/5 rounded border border-white/10 hover:border-[#c9a84c]/30 transition-colors">
                <h3 className="font-display text-2xl font-semibold text-white mb-2">{c.name}</h3>
                <p className="text-white/60 mb-6">{c.tagline}</p>
                <div className="space-y-2 text-sm text-white/40">
                  <p>{c.email}</p>
                  {c.phone && <p>{c.phone}</p>}
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-6 text-sm text-[#c9a84c] hover:text-[#e8c96a] transition-colors"
                >
                  Visit website →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-2">The Team</p>
          <h2 className="font-display text-4xl font-bold text-white mb-12">Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.id} className="p-6 bg-white/5 rounded border border-white/10">
                <div className="w-16 h-16 rounded-full bg-white/10 mb-4 overflow-hidden flex items-center justify-center text-white/30 text-2xl">
                  {member.photo ? (
                    <img src={member.photo.asset._ref} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    '👤'
                  )}
                </div>
                <h3 className="text-white font-medium">{member.name}</h3>
                <p className="text-white/50 text-sm mt-0.5 mb-3">{member.role}</p>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-[#c9a84c] text-xs hover:text-[#e8c96a] break-all">
                    {member.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-2">Governance</p>
          <h2 className="font-display text-4xl font-bold text-white mb-12">Board of Directors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {STATIC_BOARD.map((member) => (
              <div key={member.name} className="p-4 bg-white/5 rounded">
                <p className="text-white font-medium text-sm">{member.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
