export default function Rent() {
  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#8B1A1A]">
          <div className="text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Venue Rental</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Rent Our Space</h1>
            <p className="text-[#F2EDDF]/60 text-lg max-w-2xl mx-auto">
              Beautifully rebuilt in 2016, our intimate theatre is available for productions, events, and rehearsals.
            </p>
          </div>
        </section>
      </div>

      <div className="bg-[#E5E1D8] px-4 md:px-8 py-8 flex flex-col gap-6">
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#1D1D1B] mb-6">The Venue</h2>
              <p className="text-[#1D1D1B]/60 leading-relaxed mb-6">
                Our theatre retains all the intimacy our audiences love, while heightening the performance experience for both artists and guests. Whether you're mounting a full production or hosting a private event, the Varscona offers a unique and memorable setting.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Capacity', value: '~200 seats' },
                  { label: 'Location', value: 'Old Strathcona' },
                  { label: 'Stage Type', value: 'Flexible / Proscenium' },
                  { label: 'Year Rebuilt', value: '2016' },
                ].map((f) => (
                  <div key={f.label} className="p-4 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8">
                    <p className="text-[#1D1D1B]/40 text-xs uppercase tracking-wide mb-1">{f.label}</p>
                    <p className="text-[#1D1D1B] font-medium">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8">
                <p className="text-[#1D1D1B]/40 text-xs uppercase tracking-widest mb-3">What's included</p>
                <ul className="space-y-2 text-sm text-[#1D1D1B]/60">
                  {[
                    'Professional stage lighting rig',
                    'Sound system',
                    'Backstage / dressing rooms',
                    'Front of house staff available',
                    'Accessible venue',
                    'Green room',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[#FF5F38]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl font-semibold text-[#1D1D1B] mb-6">Rental Inquiry</h2>
              <p className="text-[#1D1D1B]/60 mb-8">
                Contact our Communications Director to discuss availability, rates, and requirements.
              </p>
              <div className="p-6 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8 mb-6">
                <p className="text-[#1D1D1B] font-medium mb-1">Davina Stewart</p>
                <p className="text-[#1D1D1B]/50 text-sm mb-4">Director of Communications & Theatre Rentals</p>
                <a
                  href="mailto:communications@varsconatheatre.com"
                  className="inline-flex items-center gap-2 bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-semibold text-sm tracking-wide px-6 py-3 rounded transition-colors"
                >
                  Email about Rental
                </a>
              </div>
              <div className="p-6 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8">
                <p className="text-[#1D1D1B]/40 text-xs uppercase tracking-widest mb-3">Good to know</p>
                <ul className="space-y-2 text-sm text-[#1D1D1B]/60">
                  <li>Rentals subject to availability around resident company schedules</li>
                  <li>Technical rider available on request</li>
                  <li>Booking typically requires 4–6 weeks lead time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
