import { useParams, Link } from 'react-router-dom'

const TIERS = [
  { name: 'Friend', amount: '$25', perks: ['Our sincere gratitude', 'Newsletter updates'] },
  { name: 'Supporter', amount: '$50', perks: ['Friend benefits', 'Name in programs'] },
  { name: 'Patron', amount: '$100', perks: ['Supporter benefits', 'Invitations to special events'] },
  { name: 'Champion', amount: '$250+', perks: ['Patron benefits', 'Recognition on our website', 'Personal acknowledgement from leadership'] },
]

export default function Support() {
  const { page } = useParams<{ page?: string }>()

  if (page === 'cue-the-future') return <CueTheFuture />
  if (page === 'membership') return <Membership />
  return <Donate />
}

function Donate() {
  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Support the Arts</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Donate Today</h1>
            <p className="text-[#F2EDDF]/60 text-lg max-w-2xl mx-auto">
              Your generosity keeps live, independent theatre alive in Edmonton. Every gift, no matter the size, makes a real difference.
            </p>
          </div>
        </section>
      </div>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {TIERS.map((tier) => (
              <div key={tier.name} className="p-6 bg-white/5 rounded border border-white/10 hover:border-[#c9a84c]/30 transition-colors flex flex-col">
                <p className="text-[#c9a84c] font-display text-2xl font-bold mb-1">{tier.amount}</p>
                <p className="text-white font-semibold mb-4">{tier.name}</p>
                <ul className="space-y-1 flex-1">
                  {tier.perks.map((p) => (
                    <li key={p} className="text-white/50 text-xs flex items-start gap-1.5">
                      <span className="text-[#c9a84c] mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://www.canadahelps.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-sm tracking-widest uppercase px-12 py-5 rounded transition-colors text-lg"
            >
              Donate via CanadaHelps
            </a>
            <p className="text-white/30 text-sm mt-4">Official tax receipts issued by CanadaHelps</p>
          </div>
          <div className="mt-12 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/support/membership" className="text-center p-6 bg-white/5 rounded border border-white/10 hover:border-white/20 transition-colors flex-1">
              <p className="text-white font-semibold mb-1">Become a Member</p>
              <p className="text-white/50 text-sm">Ongoing support with exclusive benefits</p>
            </Link>
            <Link to="/support/cue-the-future" className="text-center p-6 bg-white/5 rounded border border-white/10 hover:border-white/20 transition-colors flex-1">
              <p className="text-white font-semibold mb-1">Cue the Future</p>
              <p className="text-white/50 text-sm">Capital campaign for our next chapter</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Membership() {
  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Join Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Become A Member</h1>
            <p className="text-[#F2EDDF]/60 text-lg max-w-2xl mx-auto">Support Varscona with a recurring membership and enjoy exclusive benefits all season long.</p>
          </div>
        </section>
      </div>
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/60 mb-8 leading-relaxed">
            Membership details and sign-up are managed through CanadaHelps. Click below to learn about current membership tiers and join.
          </p>
          <a
            href="https://www.canadahelps.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-sm tracking-widest uppercase px-10 py-4 rounded transition-colors"
          >
            Become a Member
          </a>
          <div className="mt-8">
            <Link to="/support/donate" className="text-white/40 hover:text-white text-sm transition-colors">← Back to Donate</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function CueTheFuture() {
  return (
    <div className="pt-16">
      <div className="bg-[#E5E1D8] px-4 md:px-8 pt-4 pb-0">
        <section className="relative py-28 flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-[#3a0a0a]">
          <div className="absolute inset-6 bg-[#8B1A1A] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <p className="text-[#FF5F38] text-xs tracking-[0.4em] uppercase mb-4">Capital Campaign</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F2EDDF] mb-4">Cue the Future</h1>
            <p className="text-[#F2EDDF]/70 text-lg max-w-2xl mx-auto">
              Help us secure the next chapter for Edmonton's most beloved intimate stage.
            </p>
          </div>
        </section>
      </div>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/60 leading-relaxed text-lg mb-8">
            Cue the Future is our capital campaign to ensure Varscona Theatre remains a home for bold, independent, artist-driven work for generations to come.
          </p>
          <p className="text-white/60 leading-relaxed mb-12">
            Every gift to this campaign directly supports the infrastructure and operations that make our work possible. From technical upgrades to accessibility improvements, your contribution shapes the future of the stage.
          </p>
          <div className="text-center">
            <a
              href="https://www.canadahelps.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-sm tracking-widest uppercase px-12 py-5 rounded transition-colors text-lg"
            >
              Donate to Cue the Future
            </a>
          </div>
          <div className="mt-8 text-center">
            <Link to="/support/donate" className="text-white/40 hover:text-white text-sm transition-colors">← All giving options</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
