import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, mediaUrl, type Show } from '../lib/api'
import { createShow, deleteShow, saveShow, uploadImage } from '../lib/adminApi'

const COMPANIES = ['Trunk Theatre', 'Die-Nasty', 'House of Hush', 'Shadow Theatre', 'Teatro Live!']

type EditState = Omit<Show, 'id' | 'image'> & {
  id: string
  imageFile: File | null
  imagePreview: string
}

function blankEdit(partial?: Partial<Show>): EditState {
  return {
    id: partial?.id ?? '',
    title: partial?.title ?? '',
    slug: partial?.slug ?? '',
    company: partial?.company ?? COMPANIES[0],
    dateRange: partial?.dateRange ?? '',
    startDate: partial?.startDate ?? '',
    endDate: partial?.endDate ?? '',
    description: partial?.description ?? '',
    featured: partial?.featured ?? false,
    externalLink: partial?.externalLink ?? '',
    imageFile: null,
    imagePreview: partial?.image ? mediaUrl(partial.image, 'small') : '',
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState<EditState | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<Show | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

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
      const data = await api.shows.list()
      setShows(data)
    } finally {
      setLoading(false)
    }
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function startEdit(show: Show) {
    setEditing(blankEdit(show))
  }

  function startNew() {
    setEditing(blankEdit())
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    const preview = URL.createObjectURL(file)
    setEditing({ ...editing, imageFile: file, imagePreview: preview })
  }

  function handleField<K extends keyof EditState>(key: K, value: EditState[K]) {
    if (!editing) return
    const update: EditState = { ...editing, [key]: value }
    if (key === 'title' && !editing.id) {
      update.slug = slugify(value as string)
    }
    setEditing(update)
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    try {
      let imageAssetId: string | undefined
      if (editing.imageFile) {
        imageAssetId = await uploadImage(editing.imageFile)
      }

      const payload = {
        title: editing.title,
        slug: editing.slug,
        company: editing.company,
        dateRange: editing.dateRange,
        startDate: editing.startDate,
        endDate: editing.endDate,
        description: editing.description,
        featured: editing.featured,
        externalLink: editing.externalLink || null,
        imageAssetId,
      }

      if (editing.id) {
        await saveShow(editing.id, payload)
        showToast(`"${editing.title}" updated.`)
      } else {
        await createShow(payload)
        showToast(`"${editing.title}" created.`)
      }

      setEditing(null)
      await load()
    } catch (err) {
      console.error(err)
      showToast('Error saving — check console.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(show: Show) {
    setSaving(true)
    try {
      await deleteShow(show.id)
      showToast(`"${show.title}" deleted.`)
      setConfirmDelete(null)
      await load()
    } catch {
      showToast('Error deleting.')
    } finally {
      setSaving(false)
    }
  }

  const filtered = filter === 'All' ? shows : shows.filter(s => s.company === filter)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-medium">Varscona Theatre</span>
          <span className="text-white/20">·</span>
          <span className="text-white/60 text-sm">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-white/40 hover:text-white text-xs tracking-wide transition-colors">
            ← View Site
          </a>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); navigate('/admin') }}
            className="text-white/40 hover:text-white text-xs tracking-wide transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Title row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Shows</h1>
            <p className="text-white/40 text-sm mt-1">{shows.length} shows in Sanity</p>
          </div>
          <button
            onClick={startNew}
            className="bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
          >
            + Add Show
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['All', ...COMPANIES].map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1 rounded text-xs font-medium tracking-wide transition-colors ${
                filter === c ? 'bg-[#c9a84c] text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Show list */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4 p-4 rounded-lg bg-white/5">
                <div className="w-16 aspect-[3/4] bg-white/10 rounded shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 bg-white/10 rounded w-1/4" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(show => {
              const img = mediaUrl(show.image, 'small')
              return (
                <div key={show.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/8 border border-white/5 transition-colors">
                  <div className="w-12 aspect-[3/4] rounded overflow-hidden shrink-0 bg-white/10">
                    {img ? <img src={img} alt={show.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/20 text-xl">🎭</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-0.5">{show.company}</p>
                    <p className="text-white font-medium truncate">{show.title}</p>
                    <p className="text-white/40 text-xs">{show.dateRange}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(show)}
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs tracking-wide transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(show)}
                      className="px-3 py-1.5 rounded bg-white/5 hover:bg-red-900/40 text-white/40 hover:text-red-400 text-xs tracking-wide transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Edit / Create modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-2xl bg-[#111] border border-white/10 rounded-lg shadow-2xl my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="font-display text-xl font-bold text-white">
                {editing.id ? `Edit: ${editing.title || 'Show'}` : 'Add New Show'}
              </h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white text-2xl leading-none transition-colors">×</button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Image */}
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Poster Image</label>
                <div className="flex items-start gap-4">
                  <div className="w-20 aspect-[3/4] rounded overflow-hidden bg-white/5 shrink-0">
                    {editing.imagePreview
                      ? <img src={editing.imagePreview} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-white/20 text-2xl">🎭</div>}
                  </div>
                  <div>
                    <input ref={fileRef} type="file" accept="image/*,.svg" className="hidden" onChange={handleImageChange} />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs tracking-wide transition-colors"
                    >
                      Choose Image
                    </button>
                    {editing.imageFile && (
                      <p className="text-white/40 text-xs mt-1.5">{editing.imageFile.name}</p>
                    )}
                    <p className="text-white/25 text-xs mt-1">JPG, PNG, or SVG</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Title *</label>
                <input
                  required
                  value={editing.title}
                  onChange={e => handleField('title', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Slug *</label>
                <input
                  required
                  value={editing.slug}
                  onChange={e => handleField('slug', slugify(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white/70 font-mono text-sm placeholder-white/20 focus:outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Company *</label>
                <select
                  value={editing.company}
                  onChange={e => handleField('company', e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#c9a84c] transition-colors text-sm"
                >
                  {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Date range */}
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Display Date Range</label>
                <input
                  value={editing.dateRange}
                  onChange={e => handleField('dateRange', e.target.value)}
                  placeholder="e.g. April 15 – May 10, 2026"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm"
                />
              </div>

              {/* Start / End dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Start Date</label>
                  <input
                    type="date"
                    value={editing.startDate ?? ''}
                    onChange={e => handleField('startDate', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#c9a84c] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">End Date</label>
                  <input
                    type="date"
                    value={editing.endDate ?? ''}
                    onChange={e => handleField('endDate', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#c9a84c] transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Description</label>
                <textarea
                  rows={5}
                  value={editing.description}
                  onChange={e => handleField('description', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm resize-none"
                />
              </div>

              {/* Ticket link */}
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Ticket Link (URL)</label>
                <input
                  type="url"
                  value={editing.externalLink ?? ''}
                  onChange={e => handleField('externalLink', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm"
                />
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={e => handleField('featured', e.target.checked)}
                  className="w-4 h-4 accent-[#c9a84c]"
                />
                <span className="text-white/60 text-sm">Featured show</span>
              </label>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button type="button" onClick={() => setEditing(null)} className="px-5 py-2.5 rounded bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded bg-[#c9a84c] hover:bg-[#e8c96a] disabled:opacity-50 text-black font-bold text-sm tracking-wide transition-colors"
                >
                  {saving ? 'Saving…' : (editing.id ? 'Save Changes' : 'Create Show')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 bg-[#111] border border-white/10 rounded-lg p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-white mb-2">Delete Show?</h2>
            <p className="text-white/50 text-sm mb-6">
              "{confirmDelete.title}" will be permanently removed from Sanity. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-colors">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={saving}
                className="flex-1 py-2.5 rounded bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold text-sm transition-colors"
              >
                {saving ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#c9a84c] text-black text-sm font-bold px-6 py-3 rounded shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
