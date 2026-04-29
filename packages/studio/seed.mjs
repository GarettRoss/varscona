import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'tt49pmnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skSAvYbx5tG1ZBoKFldW7VS2aGni0L9POYSCTRgsbNFBgReLCH2NqApr3Qpb88nEo1CZJIlvfP2ieZwca',
  useCdn: false,
})

const SHOWS_DIR = resolve(__dirname, '../web/src/assets/shows')

const shows = [
  // Trunk Theatre
  {
    slug: 'marjorie-prime',
    title: 'Marjorie Prime',
    company: 'Trunk Theatre',
    dateRange: 'April 15 – May 10, 2026',
    startDate: '2026-04-15',
    endDate: '2026-05-10',
    description: 'A poignant and witty exploration of memory, loss, and what it means to be human. When 85-year-old Marjorie receives a holographic companion modelled on her late husband, her family must reckon with what we choose to remember — and what we leave behind. Winner of the Horton Foote Prize.',
    featured: true,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'marjorie-prime.svg',
  },
  {
    slug: 'betrayal',
    title: 'Betrayal',
    company: 'Trunk Theatre',
    dateRange: 'November 4 – 22, 2026',
    startDate: '2026-11-04',
    endDate: '2026-11-22',
    description: 'Harold Pinter\'s masterwork of reverse chronology follows the unravelling of a marriage and a friendship across seven years — told backwards. Sparse, precise, and devastating. Trunk Theatre brings Pinter\'s quietly explosive drama to life in an intimate staging.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'betrayal.svg',
  },
  {
    slug: 'glass-menagerie',
    title: 'The Glass Menagerie',
    company: 'Trunk Theatre',
    dateRange: 'February 3 – 21, 2027',
    startDate: '2027-02-03',
    endDate: '2027-02-21',
    description: 'Tennessee Williams\'s memory play, tender and shattering. Tom Wingfield returns in memory to the St. Louis apartment he fled — to his fading mother Amanda and his fragile, dreaming sister Laura. A masterpiece of American theatre performed with heartbreaking clarity.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'glass-menagerie.svg',
  },

  // Die-Nasty
  {
    slug: 'die-nasty',
    title: 'Die-Nasty',
    company: 'Die-Nasty',
    dateRange: 'Every Monday at 7:30 PM',
    startDate: '2020-01-01',
    endDate: '2099-12-31',
    description: 'Edmonton\'s legendary live improvised soap opera, running every Monday for over 30 years. No script. No net. No two nights alike. Die-Nasty has launched careers, broken hearts, and kept Edmonton laughing since 1993. Come witness something that has never existed before and will never exist again.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'die-nasty.svg',
  },
  {
    slug: 'die-nasty-finale',
    title: 'Die-Nasty: Season Finale Spectacular',
    company: 'Die-Nasty',
    dateRange: 'June 8, 2026 – One Night Only',
    startDate: '2026-06-08',
    endDate: '2026-06-08',
    description: 'One night. Thirty years of storylines. The Die-Nasty Season Finale Spectacular brings together beloved cast members past and present for a no-holds-barred evening of improvised drama, romance, betrayal, and tears. Season tickets holders get priority seating for this sell-out event.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'die-nasty-finale.svg',
  },
  {
    slug: 'die-nasty-halloween',
    title: 'Die-Nasty: Halloween Horror Special',
    company: 'Die-Nasty',
    dateRange: 'October 26, 2026 – One Night Only',
    startDate: '2026-10-26',
    endDate: '2026-10-26',
    description: 'The dead walk on Monday nights. Die-Nasty\'s annual Halloween Horror Special transforms the Varscona into a chamber of improvised terror. Costumes encouraged. Screaming permitted. The cast will conjure ghosts, monsters, and unspeakable plot twists — all completely unscripted.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'die-nasty-halloween.svg',
  },

  // House of Hush
  {
    slug: 'house-of-hush',
    title: 'House of Hush',
    company: 'House of Hush',
    dateRange: 'May 20 – June 7, 2026',
    startDate: '2026-05-20',
    endDate: '2026-06-07',
    description: 'An immersive and intimate world premiere from Edmonton\'s most atmospheric theatre company. Step inside the house. Something has been left unsaid for decades. House of Hush creates theatre that lingers in the body long after the lights come up — delicate, strange, and deeply felt.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'house-of-hush.svg',
  },
  {
    slug: 'midnight-reverie',
    title: 'Midnight Reverie',
    company: 'House of Hush',
    dateRange: 'September 15 – October 3, 2026',
    startDate: '2026-09-15',
    endDate: '2026-10-03',
    description: 'A dream-logic journey through a single night of wakefulness. House of Hush\'s Midnight Reverie blends movement, live sound design, and fragmentary text to explore the liminal space between sleep and waking. For those who have ever lain awake and felt the world grow enormous.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'midnight-reverie.svg',
  },
  {
    slug: 'the-still-hours',
    title: 'The Still Hours',
    company: 'House of Hush',
    dateRange: 'January 12 – 30, 2027',
    startDate: '2027-01-12',
    endDate: '2027-01-30',
    description: 'In silence, everything is heard. The Still Hours is a meditation on grief, presence, and the moments between moments. Two people occupy the same apartment across different decades, never meeting — and yet deeply entwined. House of Hush at its most luminous and spare.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'the-still-hours.svg',
  },

  // Shadow Theatre
  {
    slug: 'autumn',
    title: 'Autumn',
    company: 'Shadow Theatre',
    dateRange: 'September 8 – October 4, 2026',
    startDate: '2026-09-08',
    endDate: '2026-10-04',
    description: 'When everything changes, what remains? Shadow Theatre\'s Autumn traces the last weeks of a family\'s time in a house they\'ve owned for forty years. Bittersweet, funny, and achingly real — a play about endings that feels like a beginning.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'autumn.svg',
  },
  {
    slug: 'copenhagen',
    title: 'Copenhagen',
    company: 'Shadow Theatre',
    dateRange: 'November 10 – 28, 2026',
    startDate: '2026-11-10',
    endDate: '2026-11-28',
    description: 'Michael Frayn\'s extraordinary play asks: why did Werner Heisenberg visit Niels Bohr in Nazi-occupied Copenhagen in 1941? Three ghosts — Bohr, Heisenberg, and Bohr\'s wife Margrethe — reconvene to reconstruct that fateful meeting. Science, friendship, and moral ambiguity collide in this tour de force of intellectual drama.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'copenhagen.svg',
  },
  {
    slug: 'penelopiad',
    title: 'The Penelopiad',
    company: 'Shadow Theatre',
    dateRange: 'February 9 – 27, 2027',
    startDate: '2027-02-09',
    endDate: '2027-02-27',
    description: 'Margaret Atwood retells the Odyssey from the other side — Penelope\'s side. While Odysseus roamed for twenty years, Penelope waited, wove, and managed a household full of suitors. Now she speaks from the underworld, accompanied by her twelve hanged maids, demanding to know: who tells the story matters.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'penelopiad.svg',
  },

  // Teatro Live!
  {
    slug: 'fully-committed',
    title: 'Fully Committed',
    company: 'Teatro Live!',
    dateRange: 'July 14 – August 2, 2026',
    startDate: '2026-07-14',
    endDate: '2026-08-02',
    description: 'One actor. Forty voices. A single phone at a Manhattan restaurant where getting a reservation is harder than getting into heaven. Becky Mode\'s irresistible one-person comedy is a bravura showcase — and a wickedly funny portrait of status, desperation, and the comedy of desire.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'fully-committed.svg',
  },
  {
    slug: 'cocktails-at-pams',
    title: "Cocktails at Pam's",
    company: 'Teatro Live!',
    dateRange: 'August 11 – 30, 2026',
    startDate: '2026-08-11',
    endDate: '2026-08-30',
    description: "A comedy of manners, marriages, and martinis. Pam is throwing the party of the season — and nothing is going according to plan. Teatro Live!'s Cocktails at Pam's is a fizzy, fast-paced romp through a social gathering where every secret eventually surfaces. Dress accordingly.",
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'cocktails-at-pams.svg',
  },
  {
    slug: '39-steps',
    title: 'The 39 Steps',
    company: 'Teatro Live!',
    dateRange: 'October 13 – 31, 2026',
    startDate: '2026-10-13',
    endDate: '2026-10-31',
    description: 'Patrick Barlow\'s genre-bending theatrical adaptation of John Buchan\'s spy thriller — as filmed by Alfred Hitchcock — with four actors playing over 150 roles. A comedy of thrills, spills, and spectacular theatrical invention. Teatro Live! at its most gleefully ambitious.',
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: '39-steps.svg',
  },
  {
    slug: 'noises-off',
    title: 'Noises Off',
    company: 'Teatro Live!',
    dateRange: 'March 9 – 27, 2027',
    startDate: '2027-03-09',
    endDate: '2027-03-27',
    description: "Michael Frayn's comedy of theatrical catastrophe — widely considered the funniest farce ever written. We watch a touring theatre company perform their production of \"Nothing On\" from both front and back of house, as the show unravels hilariously. Teatro Live! closes the season with a bang.",
    featured: false,
    externalLink: 'https://varsconatheatre.com/tickets',
    image: 'noises-off.svg',
  },
]

async function uploadImage(filename) {
  const filepath = resolve(SHOWS_DIR, filename)
  const buffer = readFileSync(filepath)
  console.log(`  Uploading image: ${filename}`)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/svg+xml',
  })
  return asset._id
}

async function seed() {
  console.log('Starting Sanity seed...\n')

  // Delete existing shows first
  console.log('Removing existing show documents...')
  const existing = await client.fetch('*[_type == "show"]._id')
  if (existing.length > 0) {
    await Promise.all(existing.map(id => client.delete(id)))
    console.log(`  Deleted ${existing.length} existing shows\n`)
  }

  for (const show of shows) {
    console.log(`Creating: ${show.title}`)
    const imageId = await uploadImage(show.image)

    await client.create({
      _type: 'show',
      title: show.title,
      slug: { _type: 'slug', current: show.slug },
      company: show.company,
      dateRange: show.dateRange,
      startDate: show.startDate,
      endDate: show.endDate,
      description: show.description,
      featured: show.featured,
      externalLink: show.externalLink,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageId },
      },
    })

    console.log(`  ✓ ${show.title}\n`)
  }

  console.log(`\nDone! Seeded ${shows.length} shows.`)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
