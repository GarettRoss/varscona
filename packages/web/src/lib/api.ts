import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'tt49pmnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

export type Show = {
  id: string
  title: string
  slug: string
  company: string
  dateRange: string
  description: string
  featured: boolean
  externalLink: string | null
  image: SanityImage | null
  startDate?: string
  endDate?: string
}

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

export type StaffMember = {
  id: string
  name: string
  role: string
  email: string | null
  photo: SanityImage | null
  sortOrder: number
  isBoardMember: boolean
}

export function mediaUrl(image: SanityImage | null, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'): string {
  if (!image) return ''
  const img = builder.image(image).auto('format')
  const sizes = { thumbnail: 100, small: 320, medium: 600, large: 1200, original: 0 }
  const w = sizes[size]
  return w ? img.width(w).url() : img.url()
}

const SHOW_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  company,
  dateRange,
  startDate,
  endDate,
  description,
  featured,
  "externalLink": externalLink,
  image,
`

export const api = {
  shows: {
    list: () => sanity.fetch<Show[]>(
      `*[_type == "show"] | order(startDate asc) { ${SHOW_FIELDS} }`
    ),
    bySlug: (slug: string) => sanity.fetch<Show[]>(
      `*[_type == "show" && slug.current == $slug] { ${SHOW_FIELDS} }`,
      { slug }
    ),
  },
}
