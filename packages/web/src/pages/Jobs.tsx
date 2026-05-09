export default function Jobs() {
  return (
    <div className="pt-16">
      <div className="bg-[#1D1D1B] px-4 md:px-8 pt-4 pb-0">
        <section className="py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#8B1A1A]">
          <div className="text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Work With Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Jobs</h1>
            <p className="text-[#F2EDDF]/60 text-lg max-w-xl mx-auto">Current opportunities at Varscona Theatre</p>
          </div>
        </section>
      </div>

      <div className="bg-[#1D1D1B] px-4 md:px-8 py-8 flex flex-col gap-6">
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-12 bg-[#1D1D1B]/5 rounded border border-[#1D1D1B]/8">
              <p className="text-4xl mb-4">🎭</p>
              <p className="text-[#1D1D1B] font-semibold text-lg mb-2">No current openings</p>
              <p className="text-[#1D1D1B]/50 mb-6">Check back often, or get in touch to express your interest.</p>
              <a
                href="mailto:executivedirector@varsconatheatre.com"
                className="inline-flex items-center gap-2 bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-semibold text-sm px-6 py-3 rounded transition-colors"
              >
                Send us your CV
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
