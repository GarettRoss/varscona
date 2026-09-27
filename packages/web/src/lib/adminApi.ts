import { createClient } from '@sanity/client'
import type { Show, SanityImage } from './api'

const writeClient = createClient({
  projectId: 'tt49pmnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
  useCdn: false,
})

export async function uploadImage(file: File): Promise<string> {
  const asset = await writeClient.assets.upload('image', file, {
    filename: file.name,
    contentType: file.type || 'image/svg+xml',
  })
  return asset._id
}

export async function saveShow(id: string, patch: Partial<Omit<Show, 'id' | 'image' | 'cardImage' | 'featured'> & { imageAssetId?: string; cardImageAssetId?: string }>): Promise<void> {
  const { imageAssetId, cardImageAssetId, ...fields } = patch

  const patchObj: Record<string, unknown> = {
    title: fields.title,
    company: fields.company,
    dateRange: fields.dateRange,
    startDate: fields.startDate,
    endDate: fields.endDate,
    description: fields.description,
    director: fields.director || null,
    cast: fields.cast ?? [],
    externalLink: fields.externalLink || null,
    imagePosition: fields.imagePosition ?? 'center',
    'slug.current': fields.slug,
  }

  if (imageAssetId) {
    patchObj.image = { _type: 'image', asset: { _type: 'reference', _ref: imageAssetId } } satisfies SanityImage
  }
  if (cardImageAssetId) {
    patchObj.cardImage = { _type: 'image', asset: { _type: 'reference', _ref: cardImageAssetId } } satisfies SanityImage
  }

  await writeClient.patch(id).set(patchObj).commit()
}

export async function createShow(data: Omit<Show, 'id' | 'image' | 'cardImage' | 'featured'> & { imageAssetId?: string; cardImageAssetId?: string }): Promise<void> {
  const { imageAssetId, cardImageAssetId, ...fields } = data

  const doc: { _type: string; [key: string]: unknown } = {
    _type: 'show',
    title: fields.title,
    slug: { _type: 'slug', current: fields.slug },
    company: fields.company,
    dateRange: fields.dateRange,
    startDate: fields.startDate,
    endDate: fields.endDate,
    description: fields.description,
    director: fields.director || null,
    cast: fields.cast ?? [],
    externalLink: fields.externalLink || null,
    imagePosition: fields.imagePosition ?? 'center',
  }

  if (imageAssetId) {
    doc.image = { _type: 'image', asset: { _type: 'reference', _ref: imageAssetId } }
  }
  if (cardImageAssetId) {
    doc.cardImage = { _type: 'image', asset: { _type: 'reference', _ref: cardImageAssetId } }
  }

  await writeClient.create(doc)
}

export async function deleteShow(id: string): Promise<void> {
  await writeClient.delete(id)
}

// ─── Booking types ────────────────────────────────────────────────────────────

export type Booking = {
  id: string
  title: string
  room: string
  date: string        // YYYY-MM-DD
  startTime: string   // HH:MM
  endTime: string     // HH:MM
  bookedBy: string
  company?: string
  notes?: string
  color?: string
}

const BOOKING_FIELDS = '"id": _id, title, room, date, startTime, endTime, bookedBy, company, notes, color'

export async function fetchBookings(): Promise<Booking[]> {
  const query = encodeURIComponent(`*[_type == "booking"] | order(date asc, startTime asc) { ${BOOKING_FIELDS} }`)
  const res = await fetch(`https://tt49pmnb.api.sanity.io/v2024-01-01/data/query/production?query=${query}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_SANITY_WRITE_TOKEN}` },
  })
  const data = await res.json()
  return data.result ?? []
}

export async function createBooking(b: Omit<Booking, 'id'>): Promise<void> {
  await writeClient.create({ _type: 'booking', ...b })
}

export async function updateBooking(id: string, patch: Partial<Omit<Booking, 'id'>>): Promise<void> {
  await writeClient.patch(id).set(patch).commit()
}

export async function deleteBooking(id: string): Promise<void> {
  await writeClient.delete(id)
}
