import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'tt49pmnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skSAvYbx5tG1ZBoKFldW7VS2aGni0L9POYSCTRgsbNFBgReLCH2NqApr3Qpb88nEo1CZJIlvfP2ieZwca',
  useCdn: false,
})

const posters = [
  { slug: 'popcorn-falls',        url: 'https://images.squarespace-cdn.com/content/v1/5592e24fe4b0ac83f4dbb2d3/e149f08d-2da0-40af-82da-c3c80125c313/TEAT-12334_Teatro_Popcorn_Falls_11x17_FA.png' },
  { slug: 'the-cottage',          url: 'https://images.squarespace-cdn.com/content/v1/5592e24fe4b0ac83f4dbb2d3/55e7eecd-65b6-4a65-ad0d-5091ba373c4b/TEAT-12334_Teatro_The_Cottage_Poster_11x17_FA.png' },
  { slug: 'the-glittering-heart', url: 'https://images.squarespace-cdn.com/content/v1/5592e24fe4b0ac83f4dbb2d3/f6a7a3ca-4beb-4636-8634-58c27e5dad16/TEAT-12334_Teatro_Glittering_Heart_Poster_11x17_FA.png' },
  { slug: 'jane-austens-emma',    url: 'https://images.squarespace-cdn.com/content/v1/5592e24fe4b0ac83f4dbb2d3/534b76b8-26e4-4082-b214-02b7bc0f4d6d/TEAT-12334_Teatro_Emma_Poster_11x17_FA.png' },
]

for (const { slug, url } of posters) {
  console.log(`Fetching poster for ${slug}...`)
  const res = await fetch(url)
  if (!res.ok) { console.log(`  Failed to fetch: ${res.status}`); continue }
  const buffer = Buffer.from(await res.arrayBuffer())

  console.log(`  Uploading to Sanity...`)
  const asset = await client.assets.upload('image', buffer, {
    filename: `${slug}-poster.png`,
    contentType: 'image/png',
  })

  const shows = await client.fetch(`*[_type == "show" && slug.current == $slug]`, { slug })
  if (!shows.length) { console.log(`  No show found for "${slug}"`); continue }

  await client.patch(shows[0]._id).set({
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  }).commit()

  console.log(`  Done: ${slug}`)
}

console.log('\nAll posters uploaded.')
