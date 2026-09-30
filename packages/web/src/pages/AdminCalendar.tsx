import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import { fetchBookings, createBooking, updateBooking, deleteBooking, type Booking } from '../lib/adminApi'

const ROOMS = [
  { value: 'room-a',     label: 'Rehearsal Room A' },
  { value: 'room-b',     label: 'Rehearsal Room B' },
  { value: 'main-stage', label: 'Main Stage' },
  { value: 'studio',     label: 'Studio Space' },
]

const COLORS = [
  { value: '#FF5F38', label: 'Orange' },
  { value: '#3B82F6', label: 'Blue' },
  { value: '#10B981', label: 'Green' },
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#F59E0B', label: 'Yellow' },
  { value: '#EF4444', label: 'Red' },
]

function toEvents(bookings: Booking[]): EventInput[] {
  return bookings.map(b => ({
    id: b.id,
    title: `${b.title}${b.company ? ` · ${b.company}` : ''}`,
    start: `${b.date}T${b.startTime}`,
    end: `${b.date}T${b.endTime}`,
    backgroundColor: b.color ?? '#FF5F38',
    borderColor: b.color ?? '#FF5F38',
    extendedProps: { booking: b },
  }))
}

const EMPTY_FORM: Omit<Booking, 'id'> = {
  title: '',
  room: 'room-a',
  date: '',
  startTime: '09:00',
  endTime: '12:00',
  bookedBy: '',
  company: '',
  notes: '',
  color: '#FF5F38',
}

type ModalState =
  | { mode: 'create'; initial: typeof EMPTY_FORM }
  | { mode: 'edit';   booking: Booking }
  | null

export default function AdminCalendar() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState>(null)
  const [form, setForm] = useState<Omit<Booking, 'id'>>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [filterRoom, setFilterRoom] = useState('all')
  const calendarRef = useRef<InstanceType<typeof FullCalendar>>(null)

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== '1') {
      navigate('/admin')
      return
    }
    load()
  }, [navigate])

  async function load() {
    setLoading(true)
    try {
      const data = await fetchBookings()
      setBookings(data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  function openCreate(selectInfo?: DateSelectArg) {
    const date = selectInfo ? selectInfo.startStr.slice(0, 10) : new Date().toISOString().slice(0, 10)
    const initial = { ...EMPTY_FORM, date }
    setForm(initial)
    setModal({ mode: 'create', initial })
    selectInfo?.view.calendar.unselect()
  }

  function openEdit(clickInfo: EventClickArg) {
    const b: Booking = clickInfo.event.extendedProps.booking
    setForm({
      title: b.title,
      room: b.room,
      date: b.date,
      startTime: b.startTime,
      endTime: b.endTime,
      bookedBy: b.bookedBy,
      company: b.company ?? '',
      notes: b.notes ?? '',
      color: b.color ?? '#FF5F38',
    })
    setModal({ mode: 'edit', booking: b })
  }

  async function handleSave() {
    if (!form.title || !form.date || !form.startTime || !form.endTime || !form.bookedBy) return
    setSaving(true)
    try {
      if (modal?.mode === 'create') {
        await createBooking(form)
      } else if (modal?.mode === 'edit') {
        await updateBooking(modal.booking.id, form)
      }
      await load()
      setModal(null)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (modal?.mode !== 'edit') return
    if (!confirm(`Delete "${modal.booking.title}"?`)) return
    setDeleting(true)
    try {
      await deleteBooking(modal.booking.id)
      await load()
      setModal(null)
    } finally {
      setDeleting(false)
    }
  }

  const visible = filterRoom === 'all'
    ? bookings
    : bookings.filter(b => b.room === filterRoom)

  const events = toEvents(visible)

  const inputClass = 'w-full rounded-lg px-3 py-2 text-sm bg-[#2a2a27] border border-[#F2EDDF]/15 text-[#F2EDDF] placeholder-[#F2EDDF]/30 focus:outline-none focus:border-[#FF5F38]/60'
  const labelClass = 'block text-xs font-medium tracking-widest uppercase text-[#F2EDDF]/50 mb-1'

  return (
    <div className="min-h-screen bg-[#1D1D1B] text-[#F2EDDF]">
      {/* Top nav */}
      <header className="bg-[#111110] border-b border-[#F2EDDF]/8 px-4 md:px-6 py-3 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        {/* Row 1: back + title + sign out */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-sm text-[#F2EDDF]/50 hover:text-[#F2EDDF] transition-colors shrink-0"
          >
            ← Dashboard
          </button>
          <div className="h-4 w-px bg-[#F2EDDF]/15 shrink-0" />
          <h1 className="font-bold text-[#F2EDDF] tracking-wide text-sm md:text-base truncate">Rehearsal Room Bookings</h1>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); navigate('/admin') }}
            className="ml-auto text-xs text-[#F2EDDF]/40 hover:text-[#F2EDDF]/70 transition-colors shrink-0 md:hidden"
          >
            Sign Out
          </button>
        </div>

        {/* Row 2 on mobile / inline on desktop: filter + new booking + sign out */}
        <div className="flex items-center gap-2 md:ml-auto">
          <select
            value={filterRoom}
            onChange={e => setFilterRoom(e.target.value)}
            className="flex-1 md:flex-none text-xs rounded-lg px-3 py-1.5 bg-[#2a2a27] border border-[#F2EDDF]/15 text-[#F2EDDF] focus:outline-none"
          >
            <option value="all">All rooms</option>
            {ROOMS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>

          <button
            onClick={() => openCreate()}
            className="shrink-0 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-lg bg-[#FF5F38] text-white hover:opacity-90 transition-opacity"
          >
            + New Booking
          </button>

          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); navigate('/admin') }}
            className="hidden md:block text-xs text-[#F2EDDF]/40 hover:text-[#F2EDDF]/70 transition-colors shrink-0"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Calendar */}
      <main className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-96 text-[#F2EDDF]/30 text-sm">Loading bookings…</div>
        ) : (
          <div className="fc-varscona">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              events={events}
              selectable
              selectMirror
              editable={false}
              dayMaxEvents={4}
              weekends
              select={openCreate}
              eventClick={openEdit}
              height="auto"
            />
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="relative bg-[#1D1D1B] border border-[#F2EDDF]/12 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">
                  {modal.mode === 'create' ? 'New Booking' : 'Edit Booking'}
                </h2>
                <button
                  onClick={() => setModal(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-lg text-[#F2EDDF]/60"
                >
                  ×
                </button>
              </div>

              <div className="h-px bg-[#F2EDDF]/8" />

              {/* Title */}
              <div>
                <label className={labelClass}>Purpose / Title *</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Die-Nasty rehearsal"
                />
              </div>

              {/* Room */}
              <div>
                <label className={labelClass}>Room *</label>
                <select
                  className={inputClass}
                  value={form.room}
                  onChange={e => setForm(f => ({ ...f, room: e.target.value }))}
                >
                  {ROOMS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className={labelClass}>Date *</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                />
              </div>

              {/* Start / End */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Start *</label>
                  <input
                    type="time"
                    className={inputClass}
                    value={form.startTime}
                    onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelClass}>End *</label>
                  <input
                    type="time"
                    className={inputClass}
                    value={form.endTime}
                    onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))}
                  />
                </div>
              </div>

              {/* Booked by */}
              <div>
                <label className={labelClass}>Booked By *</label>
                <input
                  className={inputClass}
                  value={form.bookedBy}
                  onChange={e => setForm(f => ({ ...f, bookedBy: e.target.value }))}
                  placeholder="Contact name"
                />
              </div>

              {/* Company */}
              <div>
                <label className={labelClass}>Company / Group</label>
                <input
                  className={inputClass}
                  value={form.company ?? ''}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Optional"
                />
              </div>

              {/* Notes */}
              <div>
                <label className={labelClass}>Notes</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={form.notes ?? ''}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Any extra details…"
                />
              </div>

              {/* Color */}
              <div>
                <label className={labelClass}>Calendar Colour</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button
                      key={c.value}
                      title={c.label}
                      onClick={() => setForm(f => ({ ...f, color: c.value }))}
                      className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                      style={{
                        background: c.value,
                        outline: form.color === c.value ? `3px solid ${c.value}` : '3px solid transparent',
                        outlineOffset: '2px',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#F2EDDF]/8" />

              <div className="flex gap-3">
                {modal.mode === 'edit' && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                  >
                    {deleting ? 'Deleting…' : 'Delete'}
                  </button>
                )}
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#F2EDDF]/50 hover:text-[#F2EDDF] transition-colors ml-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title || !form.date || !form.bookedBy}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold tracking-widest uppercase bg-[#FF5F38] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving…' : modal.mode === 'create' ? 'Create' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FullCalendar dark-theme overrides */}
      <style>{`
        .fc-varscona {
          --fc-border-color: rgba(242,237,223,0.08);
          --fc-button-bg-color: #2a2a27;
          --fc-button-border-color: rgba(242,237,223,0.15);
          --fc-button-text-color: #F2EDDF;
          --fc-button-hover-bg-color: #3a3a37;
          --fc-button-hover-border-color: rgba(242,237,223,0.25);
          --fc-button-active-bg-color: #FF5F38;
          --fc-button-active-border-color: #FF5F38;
          --fc-today-bg-color: rgba(255,95,56,0.08);
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: #2a2a27;
          --fc-list-event-hover-bg-color: rgba(242,237,223,0.05);
          color: #F2EDDF;
          font-family: inherit;
        }
        .fc-varscona .fc-toolbar-title { font-size: 1.1rem; font-weight: 700; letter-spacing: 0.05em; }
        .fc-varscona .fc-col-header-cell-cushion,
        .fc-varscona .fc-daygrid-day-number { color: rgba(242,237,223,0.55); text-decoration: none; font-size: 0.75rem; }
        .fc-varscona .fc-daygrid-day.fc-day-today .fc-daygrid-day-number { color: #FF5F38; font-weight: 700; }
        .fc-varscona .fc-event { border-radius: 6px; font-size: 0.72rem; cursor: pointer; }
        .fc-varscona .fc-event:hover { opacity: 0.85; }
        .fc-varscona .fc-highlight { background: rgba(255,95,56,0.15) !important; }
        .fc-varscona .fc-timegrid-slot { font-size: 0.72rem; color: rgba(242,237,223,0.35); }
        .fc-varscona .fc-scrollgrid { border-color: rgba(242,237,223,0.08); }
        .fc-varscona td, .fc-varscona th { border-color: rgba(242,237,223,0.08) !important; }
        .fc-varscona .fc-button { transition: all 0.15s; border-radius: 8px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        .fc-varscona .fc-button-group .fc-button { border-radius: 0; }
        .fc-varscona .fc-button-group .fc-button:first-child { border-radius: 8px 0 0 8px; }
        .fc-varscona .fc-button-group .fc-button:last-child { border-radius: 0 8px 8px 0; }
        .fc-varscona .fc-daygrid-more-link { color: rgba(242,237,223,0.5); font-size: 0.7rem; }
      `}</style>
    </div>
  )
}
