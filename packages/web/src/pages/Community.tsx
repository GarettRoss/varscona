export default function Community() {
  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">About Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Community &amp; Accountability</h1>
            <p className="text-[#F2EDDF]/60 text-lg max-w-2xl mx-auto">Our commitments to each other and our community</p>
          </div>
        </section>
      </div>

      <div className="bg-[#E5E1D8] px-4 md:px-8 py-8 flex flex-col gap-6">
        <section className="bg-[#F2EDDF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#1D1D1B]/70 leading-relaxed text-lg">
              Varscona Theatre is committed to providing a safe, respectful, and inclusive environment for all artists, staff, audiences, and community members. Our respectful workplace policy reflects our values as an artist-run organization.
            </p>
            <p className="text-[#1D1D1B]/70 leading-relaxed mt-6 text-lg">
              For questions about our policies or to report a concern, please contact our Executive Director at{' '}
              <a href="mailto:executivedirector@varsconatheatre.com" className="text-[#FF5F38] hover:text-[#ff7a57]">
                executivedirector@varsconatheatre.com
              </a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
