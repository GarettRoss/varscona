import { createClient } from '@sanity/client'
import sharp from 'sharp'
import { readFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'tt49pmnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skSAvYbx5tG1ZBoKFldW7VS2aGni0L9POYSCTRgsbNFBgReLCH2NqApr3Qpb88nEo1CZJIlvfP2ieZwca',
  useCdn: false,
})

const svgDir = join(__dirname, '../src/assets/shows')
const svgFiles = readdirSync(svgDir).filter(f => f.endsWith('.svg'))

for (const file of svgFiles) {
  const slug = basename(file, '.svg')
  const svgPath = join(svgDir, file)
  const svgBuffer = readFileSync(svgPath)

  console.log(`Converting ${file}...`)
  const pngBuffer = await sharp(svgBuffer, { density: 150 })
    .resize(600, 800)
    .png()
    .toBuffer()

  console.log(`Uploading ${slug}...`)
  const asset = await client.assets.upload('image', pngBuffer, {
    filename: `${slug}.png`,
    contentType: 'image/png',
  })

  // Find the matching show and set cardImage
  const shows = await client.fetch(`*[_type == "show" && slug.current == $slug]`, { slug })
  if (shows.length === 0) {
    console.log(`  No show found for slug "${slug}", skipping.`)
    continue
  }

  await client.patch(shows[0]._id).set({
    cardImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    }
  }).commit()

  console.log(`  Done: ${slug}`)
}

console.log('\nAll card images uploaded.')
