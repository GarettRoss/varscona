const CMS_BASE = import.meta.env.VITE_CMS_URL ?? 'http://localhost:1337'
const API_BASE = `${CMS_BASE}/api`

export type Show = {
  id: number
  documentId: string
  title: string
  slug: string
  company: string
  dateRange: string
  description: string
  featured: boolean
  externalLink: string | null
  image: StrapiMedia | null
  createdAt: string
}

export type StaffMember = {
  id: number
  name: string
  role: string
  email: string | null
  photo: StrapiMedia | null
  sortOrder: number
  isBoardMember: boolean
}

export type StrapiMedia = {
  id: number
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
}

export type SiteSettings = {
  heroTagline: string
  heroSubtext: string
  heroImage: StrapiMedia | null
  donateUrl: string
  membershipUrl: string
  cueTheFutureUrl: string
  instagramUrl: string
  twitterUrl: string
  facebookUrl: string
}

async function fetchAPI<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const qs = new URLSearchParams({ populate: '*', ...params }).toString()
  const res = await fetch(`${API_BASE}${path}?${qs}`)
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  const json = await res.json()
  return json.data as T
}

export function mediaUrl(media: StrapiMedia | null, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'): string {
  if (!media) return ''
  const sizeUrl = size !== 'original' ? media.formats?.[size]?.url : null
  const raw = sizeUrl ?? media.url
  return raw.startsWith('http') ? raw : `${CMS_BASE}${raw}`
}

export const api = {
  shows: {
    list: () => fetchAPI<Show[]>('/shows', { sort: 'dateRange:asc' }),
    featured: () => fetchAPI<Show[]>('/shows', { 'filters[featured][$eq]': 'true', sort: 'dateRange:asc' }),
    bySlug: (slug: string) => fetchAPI<Show[]>(`/shows`, { 'filters[slug][$eq]': slug }),
  },
  staff: {
    list: () => fetchAPI<StaffMember[]>('/staff-members', { sort: 'sortOrder:asc' }),
  },
  settings: {
    get: () => fetchAPI<SiteSettings>('/site-setting'),
  },
}
