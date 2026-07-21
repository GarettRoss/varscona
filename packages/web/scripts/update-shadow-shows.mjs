import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'tt49pmnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const DELETE_IDS = ['lgnD7znJQv6dsdVKZvkFaM', 'lgnD7znJQv6dsdVKZvkGHT']

const NEW_SHOWS = [
  {
    slug: 'yaga',
    title: 'Yaga',
    director: 'Kat Sandler',
    dateRange: 'Oct 14 – Nov 1, 2026',
    startDate: '2026-10-14',
    endDate: '2026-11-01',
    description: 'A thrilling comedic mystery by Kat Sandler that will have you on the edge of your seat.',
    posterFile: resolve(__dirname, '../poster-uploads/yaga.jpg'),
  },
  {
    slug: 'the-waltz',
    title: 'The Waltz',
    director: 'Marie Beath Badian',
    dateRange: 'Jan 20 – Feb 7, 2027',
    startDate: '2027-01-20',
    endDate: '2027-02-07',
    description: 'A new play by Marie Beath Badian.',
    posterFile: resolve(__dirname, '../poster-uploads/the-waltz.jpg'),
  },
  {
    slug: 'undressed',
    title: 'Undressed',
    director: 'Louise Casemore',
    dateRange: 'Mar 17 – Apr 4, 2027',
    startDate: '2027-03-17',
    endDate: '2027-04-04',
    description: 'A new play by Louise Casemore.',
    posterFile: resolve(__dirname, '../poster-uploads/undressed.jpg'),
  },
  {
    slug: 'the-golden-anniversaries',
    title: 'The Golden Anniversaries',
    director: 'Mark Crawford',
    dateRange: 'Apr 28 – May 16, 2027',
    startDate: '2027-04-28',
    endDate: '2027-05-16',
    description: 'A new play by Mark Crawford.',
    posterFile: resolve(__dirname, '../poster-uploads/the-golden-anniversaries.jpg'),
  },
]

async function run() {
  // Delete old shows
  for (const id of DELETE_IDS) {
    await client.delete(id)
    console.log(`Deleted ${id}`)
  }

  // Create new shows
  for (const show of NEW_SHOWS) {
    let imageAsset
    try {
      const fileData = readFileSync(show.posterFile)
      imageAsset = await client.assets.upload('image', fileData, { filename: `${show.slug}.jpg`, contentType: 'image/jpeg' })
      console.log(`Uploaded poster for ${show.title}: ${imageAsset._id}`)
    } catch (e) {
      console.warn(`No poster file found for ${show.title}, skipping image`)
    }

    const doc = {
      _type: 'show',
      title: show.title,
      slug: { _type: 'slug', current: show.slug },
      company: 'Shadow Theatre',
      dateRange: show.dateRange,
      startDate: show.startDate,
      endDate: show.endDate,
      description: show.description,
      director: show.director,
      cast: [],
      externalLink: null,
      featured: false,
    }

    if (imageAsset) {
      doc.image = { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }
    }

    const created = await client.create(doc)
    console.log(`Created ${show.title}: ${created._id}`)
  }

  console.log('Done!')
}

run().catch(console.error)
