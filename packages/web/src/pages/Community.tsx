export default function Community() {
  return (
    <div className="pt-16">
      <section className="py-28 px-6 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">About Us</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">Community &amp; Accountability</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Our commitments to each other and our community</p>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
          <p className="text-white/70 leading-relaxed">
            Varscona Theatre is committed to providing a safe, respectful, and inclusive environment for all artists, staff, audiences, and community members. Our respectful workplace policy reflects our values as an artist-run organization.
          </p>
          <p className="text-white/70 leading-relaxed mt-6">
            For questions about our policies or to report a concern, please contact our Executive Director at{' '}
            <a href="mailto:executivedirector@varsconatheatre.com" className="text-[#c9a84c] hover:text-[#e8c96a]">
              executivedirector@varsconatheatre.com
            </a>.
          </p>
        </div>
      </section>
    </div>
  )
}
