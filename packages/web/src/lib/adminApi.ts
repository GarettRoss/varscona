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

export async function saveShow(id: string, patch: Partial<Omit<Show, 'id' | 'image' | 'featured'> & { imageAssetId?: string }>): Promise<void> {
  const { imageAssetId, ...fields } = patch

  const patchObj: Record<string, unknown> = {
    title: fields.title,
    company: fields.company,
    dateRange: fields.dateRange,
    startDate: fields.startDate,
    endDate: fields.endDate,
    description: fields.description,
    externalLink: fields.externalLink || null,
    'slug.current': fields.slug,
  }

  if (imageAssetId) {
    patchObj.image = {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId },
    } satisfies SanityImage
  }

  await writeClient.patch(id).set(patchObj).commit()
}

export async function createShow(data: Omit<Show, 'id' | 'image' | 'featured'> & { imageAssetId?: string }): Promise<void> {
  const { imageAssetId, ...fields } = data

  const doc: { _type: string; [key: string]: unknown } = {
    _type: 'show',
    title: fields.title,
    slug: { _type: 'slug', current: fields.slug },
    company: fields.company,
    dateRange: fields.dateRange,
    startDate: fields.startDate,
    endDate: fields.endDate,
    description: fields.description,
    externalLink: fields.externalLink || null,
  }

  if (imageAssetId) {
    doc.image = {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId },
    }
  }

  await writeClient.create(doc)
}

export async function deleteShow(id: string): Promise<void> {
  await writeClient.delete(id)
}
