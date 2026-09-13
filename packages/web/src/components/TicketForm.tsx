import { useEffect, useRef, useState } from 'react'
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

type Option = { label: string; value: string }

function Dropdown({ options, value, onChange, placeholder, isDark }: {
  options: Option[]
  value: string
  onChange: (v: string) => void
  placeholder: string
  isDark: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const triggerStyle = isDark
    ? { background: 'rgba(242,237,223,0.10)', border: '1px solid rgba(242,237,223,0.35)', color: value ? '#F2EDDF' : 'rgba(242,237,223,0.45)' }
    : { background: 'rgba(29,29,27,0.06)', border: '1px solid rgba(29,29,27,0.20)', color: value ? '#1D1D1B' : 'rgba(29,29,27,0.40)' }

  const menuStyle = isDark
    ? { background: '#2a2a27', border: '1px solid rgba(242,237,223,0.18)' }
    : { background: '#fff', border: '1px solid rgba(29,29,27,0.15)' }

  const itemBase = `px-4 py-2.5 text-sm cursor-pointer transition-colors`
  const itemDark = `${itemBase} text-[#F2EDDF] hover:bg-[#F2EDDF]/10`
  const itemLight = `${itemBase} text-[#1D1D1B] hover:bg-[#1D1D1B]/6`
  const itemActive = isDark ? 'bg-[#F2EDDF]/15' : 'bg-[#1D1D1B]/8'

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-colors text-left"
        style={triggerStyle}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span className="ml-2 shrink-0 text-xs opacity-60">▾</span>
      </button>

      {open && (
        <div
          className="absolute z-50 w-full mt-1 rounded-lg overflow-hidden shadow-xl"
          style={menuStyle}
        >
          {options.map(opt => (
            <div
              key={opt.value}
              className={`${isDark ? itemDark : itemLight} ${opt.value === value ? itemActive : ''}`}
              onMouseDown={() => { onChange(opt.value); setOpen(false) }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type Props = {
  show: Show
  theme?: 'dark' | 'light'
  onBack: () => void
  onClose?: () => void
}

export default function TicketForm({ show, theme = 'dark', onBack, onClose }: Props) {
  const [date, setDate] = useState('')
  const [tickets, setTickets] = useState<string[]>([''])
  const [payment, setPayment] = useState('')
  const color = companyColor(show.company)
  const canContinue = date && tickets.every(t => t !== '') && tickets.length > 0 && payment

  function updateTicket(i: number, value: string) {
    setTickets(prev => prev.map((t, idx) => idx === i ? value : t))
  }
  function removeTicket(i: number) {
    setTickets(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev)
  }
  const isDark = theme === 'dark'

  const labelClass = `block text-xs font-medium tracking-widest uppercase mb-2 ${isDark ? 'text-[#F2EDDF]/75' : 'text-[#1D1D1B]/50'}`
  const dividerStyle = { background: isDark ? '#F2EDDF18' : '#1D1D1B18' }

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
        <Dropdown
          options={PLACEHOLDER_DATES}
          value={date}
          onChange={setDate}
          placeholder="Select a date…"
          isDark={isDark}
        />
      </div>

      {/* Tickets */}
      <div>
        <label className={labelClass}>Tickets</label>
        <div className="flex flex-col gap-2">
          {tickets.map((t, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Dropdown
                options={TICKET_TYPES}
                value={t}
                onChange={v => updateTicket(i, v)}
                placeholder="Select type…"
                isDark={isDark}
              />
              {tickets.length > 1 && (
                <button
                  onClick={() => removeTicket(i)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full shrink-0 transition-colors text-base ${
                    isDark ? 'text-[#F2EDDF]/40 hover:text-[#F2EDDF]/80 hover:bg-white/10' : 'text-[#1D1D1B]/40 hover:text-[#1D1D1B]/80 hover:bg-[#1D1D1B]/8'
                  }`}
                  aria-label="Remove ticket"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setTickets(prev => [...prev, ''])}
            className={`mt-1 text-xs font-medium tracking-widest uppercase flex items-center gap-1.5 transition-colors ${
              isDark ? 'text-[#F2EDDF]/50 hover:text-[#F2EDDF]' : 'text-[#1D1D1B]/50 hover:text-[#1D1D1B]'
            }`}
          >
            <span className="text-base leading-none">+</span> Add Ticket
          </button>
        </div>
      </div>

      {/* Payment */}
      <div>
        <label className={labelClass}>Payment Method</label>
        <Dropdown
          options={PAYMENT_TYPES}
          value={payment}
          onChange={setPayment}
          placeholder="Select payment…"
          isDark={isDark}
        />
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
