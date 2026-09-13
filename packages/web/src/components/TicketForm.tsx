import { useState } from 'react'
import { type Show } from '../lib/api'
import { companyColor } from '../lib/companyColor'

// Placeholder data — replace with live API calls once token is available
const PLACEHOLDER_DATES = [
  { label: 'September 11, 2026 — 11:00 AM', value: 'sep11-am' },
  { label: 'September 11, 2026 — 7:30 PM',  value: 'sep11-pm' },
  { label: 'September 13, 2026 — 7:30 PM',  value: 'sep13' },
  { label: 'September 14, 2026 — 2:00 PM',  value: 'sep14' },
  { label: 'September 19, 2026 — 7:30 PM',  value: 'sep19' },
  { label: 'September 20, 2026 — 2:00 PM',  value: 'sep20' },
]

const TICKET_TYPES = [
  { label: 'Adult — $25',              value: 'adult' },
  { label: 'Student / Senior — $20',   value: 'concession' },
  { label: 'Child (under 12) — $15',   value: 'child' },
  { label: 'Group (10+) — $18 ea.',    value: 'group' },
]

const PAYMENT_TYPES = [
  { label: 'Credit / Debit Card', value: 'card' },
  { label: 'Gift Card',           value: 'gift' },
  { label: 'Season Pass',         value: 'pass' },
]

type Props = {
  show: Show
  /** 'dark' = modal/dark bg, 'light' = show detail page cream bg */
  theme?: 'dark' | 'light'
  onBack: () => void
  /** Only needed in dark/modal mode */
  onClose?: () => void
}

export default function TicketForm({ show, theme = 'dark', onBack, onClose }: Props) {
  const [date, setDate] = useState('')
  const [ticketType, setTicketType] = useState('')
  const [qty, setQty] = useState('1')
  const [payment, setPayment] = useState('')
  const color = companyColor(show.company)
  const canContinue = date && ticketType && payment
  const isDark = theme === 'dark'

  const selectClass = isDark
    ? `w-full bg-[#F2EDDF]/8 border border-[#F2EDDF]/15 rounded-lg px-4 py-3 text-[#F2EDDF] text-sm appearance-none cursor-pointer transition-colors hover:border-[#F2EDDF]/30 focus:outline-none focus:border-[#F2EDDF]/40`
    : `w-full bg-[#1D1D1B]/6 border border-[#1D1D1B]/15 rounded-lg px-4 py-3 text-[#1D1D1B] text-sm appearance-none cursor-pointer transition-colors hover:border-[#1D1D1B]/30 focus:outline-none focus:border-[#1D1D1B]/40`

  const labelClass = `block text-xs font-medium tracking-widest uppercase mb-2 ${isDark ? 'text-[#F2EDDF]/50' : 'text-[#1D1D1B]/50'}`
  const dividerStyle = { background: isDark ? '#F2EDDF18' : '#1D1D1B18' }
  const chevronClass = `pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs ${isDark ? 'text-[#F2EDDF]/40' : 'text-[#1D1D1B]/40'}`

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors text-lg shrink-0 ${
            isDark
              ? 'bg-white/8 text-[#F2EDDF]/60 hover:text-[#F2EDDF] hover:bg-white/15'
              : 'bg-[#1D1D1B]/8 text-[#1D1D1B]/60 hover:text-[#1D1D1B] hover:bg-[#1D1D1B]/15'
          }`}
          aria-label="Back"
        >
          ←
        </button>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase" style={{ color }}>{show.company}</p>
          <h3 className={`font-display text-lg font-bold leading-tight ${isDark ? 'text-[#F2EDDF]' : 'text-[#1D1D1B]'}`}>
            {show.title}
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-[#F2EDDF]/60 hover:text-[#F2EDDF] hover:bg-black/80 transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>

      <div className="h-px" style={dividerStyle} />

      {/* Date */}
      <div>
        <label className={labelClass}>Performance Date</label>
        <div className="relative">
          <select className={selectClass} value={date} onChange={e => setDate(e.target.value)}>
            <option value="" disabled>Select a date…</option>
            {PLACEHOLDER_DATES.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <span className={chevronClass}>▾</span>
        </div>
      </div>

      {/* Ticket type + qty */}
      <div>
        <label className={labelClass}>Ticket Type</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <select className={selectClass} value={ticketType} onChange={e => setTicketType(e.target.value)}>
              <option value="" disabled>Select type…</option>
              {TICKET_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <span className={chevronClass}>▾</span>
          </div>
          <div className="relative w-20 shrink-0">
            <select className={selectClass} value={qty} onChange={e => setQty(e.target.value)}>
              {[1,2,3,4,5,6,7,8].map(n => (
                <option key={n} value={String(n)}>× {n}</option>
              ))}
            </select>
            <span className={chevronClass}>▾</span>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div>
        <label className={labelClass}>Payment Method</label>
        <div className="relative">
          <select className={selectClass} value={payment} onChange={e => setPayment(e.target.value)}>
            <option value="" disabled>Select payment…</option>
            {PAYMENT_TYPES.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <span className={chevronClass}>▾</span>
        </div>
      </div>

      <div className="h-px" style={dividerStyle} />

      {/* Continue */}
      <button
        disabled={!canContinue}
        className="w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-200"
        style={{
          background: canContinue ? color : isDark ? '#F2EDDF18' : '#1D1D1B12',
          color: canContinue ? '#fff' : isDark ? '#F2EDDF33' : '#1D1D1B33',
          cursor: canContinue ? 'pointer' : 'not-allowed',
        }}
      >
        Continue to Payment →
      </button>

      <p className={`text-center text-xs ${isDark ? 'text-[#F2EDDF]/30' : 'text-[#1D1D1B]/40'}`}>
        Payment is handled securely via the Varscona box office
      </p>
    </div>
  )
}
