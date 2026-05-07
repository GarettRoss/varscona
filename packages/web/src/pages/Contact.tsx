const CONTACTS = [
  { name: 'Kendra Connor', role: 'Executive Director', email: 'executivedirector@varsconatheatre.com' },
  { name: 'Coralie Cairns', role: 'Accounts Manager', email: 'accounts@varsconatheatre.com' },
  { name: 'Garett Ross', role: 'Front of House Manager', email: 'frontofhouse@varsconatheatre.com' },
  { name: 'Davina Stewart', role: 'Communications & Rentals', email: 'communications@varsconatheatre.com' },
  { name: 'Tiana McLean', role: 'Director of Production', email: 'tech@varsconatheatre.com' },
]

export default function Contact() {
  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Get in touch</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Contact Us</h1>
            <p className="text-[#F2EDDF]/60 text-lg">We'd love to hear from you</p>
          </div>
        </section>
      </div>

      <div className="bg-[#E5E1D8] px-4 md:px-8 py-8 flex flex-col gap-6">
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Address / Info */}
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#1D1D1B] mb-8">Find Us</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded bg-[#FF5F38]/10 flex items-center justify-center text-[#FF5F38] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1D1D1B] font-medium">Address</p>
                    <p className="text-[#1D1D1B]/60 text-sm mt-0.5">10329 – 83 Avenue, Edmonton, Alberta</p>
                    <p className="text-[#1D1D1B]/40 text-sm">Across from the Old Strathcona Farmers Market</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded bg-[#FF5F38]/10 flex items-center justify-center text-[#FF5F38] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1D1D1B] font-medium">Phone</p>
                    <p className="text-[#1D1D1B]/60 text-sm mt-0.5">(780) 433-3399</p>
                    <p className="text-[#1D1D1B]/40 text-sm">Email preferred for most inquiries</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8">
                <p className="text-[#1D1D1B]/40 text-xs uppercase tracking-widest mb-4">Getting Here</p>
                <div className="space-y-3 text-sm text-[#1D1D1B]/60">
                  <p><span className="text-[#1D1D1B]/40">Transit:</span> ETS routes 4 & 8 (Whyte Avenue); Strathcona County Transit route 404</p>
                  <p><span className="text-[#1D1D1B]/40">Cycling:</span> Located on 83 Ave bike route with public bike racks nearby</p>
                  <p><span className="text-[#1D1D1B]/40">Parking:</span> Old Strathcona Farmer's Market Parking Lot on Tommy Banks Way (11 Tommy Banks Way NW)</p>
                </div>
              </div>

              <div className="mt-6 aspect-video rounded overflow-hidden bg-[#1D1D1B]/5 flex items-center justify-center border border-[#1D1D1B]/8">
                <a
                  href="https://maps.google.com/?q=10329+83+Avenue,+Edmonton,+Alberta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF5F38] hover:text-[#ff7a57] text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Staff contacts */}
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#1D1D1B] mb-8">Team Contacts</h2>
              <div className="space-y-4">
                {CONTACTS.map((c) => (
                  <div key={c.email} className="flex items-start justify-between gap-4 p-4 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8 hover:border-[#1D1D1B]/15 transition-colors">
                    <div>
                      <p className="text-[#1D1D1B] font-medium">{c.name}</p>
                      <p className="text-[#1D1D1B]/50 text-sm">{c.role}</p>
                    </div>
                    <a href={`mailto:${c.email}`} className="text-[#FF5F38] hover:text-[#ff7a57] text-sm shrink-0 transition-colors">
                      Email →
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="text-[#1D1D1B]/40 text-xs uppercase tracking-widest mb-4">Resident Companies</p>
                <div className="space-y-3">
                  {[
                    { name: 'Teatro Live!', email: 'teatro@teatrolive.com', phone: '(780) 554-2974' },
                    { name: 'Shadow Theatre', email: 'info@shadowtheatre.org', phone: '(780) 434-5564' },
                    { name: 'Die-Nasty', email: 'dienasty.soaps@gmail.com', phone: null },
                  ].map((c) => (
                    <div key={c.name} className="p-4 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8">
                      <p className="text-[#1D1D1B] font-medium text-sm">{c.name}</p>
                      <div className="flex gap-4 mt-1 text-sm text-[#1D1D1B]/50">
                        <a href={`mailto:${c.email}`} className="hover:text-[#FF5F38] transition-colors">{c.email}</a>
                        {c.phone && <span>{c.phone}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
