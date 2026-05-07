export default function Jobs() {
  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Work With Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Jobs</h1>
            <p className="text-[#F2EDDF]/60 text-lg max-w-xl mx-auto">Current opportunities at Varscona Theatre</p>
          </div>
        </section>
      </div>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 bg-white/5 rounded border border-white/10">
            <p className="text-4xl mb-4">🎭</p>
            <p className="text-white font-semibold text-lg mb-2">No current openings</p>
            <p className="text-white/50 mb-6">Check back often, or get in touch to express your interest.</p>
            <a
              href="mailto:executivedirector@varsconatheatre.com"
              className="inline-flex items-center gap-2 border border-[#c9a84c]/50 hover:border-[#c9a84c] text-[#c9a84c] text-sm px-6 py-3 rounded transition-colors"
            >
              Send us your CV
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
