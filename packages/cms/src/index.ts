import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await openPublicAccess(strapi);
    await seedShows(strapi);
    await seedStaff(strapi);
  },
};

/**
 * Grant public read access to content types so the React
 * frontend can fetch data without authentication.
 */
async function openPublicAccess(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const contentTypes = [
    'api::show.show',
    'api::staff-member.staff-member',
    'api::site-setting.site-setting',
  ];

  for (const uid of contentTypes) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: publicRole.id } });

    for (const action of ['find', 'findOne']) {
      const fullAction = `api::${uid.split('::')[1]}.${action}`;
      const alreadyGranted = existing.some((p: any) => p.action === fullAction);
      if (!alreadyGranted) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: fullAction,
            role: publicRole.id,
            enabled: true,
          },
        });
      }
    }
  }
}

async function seedShows(strapi: Core.Strapi) {
  const count = await strapi.db.query('api::show.show').count({});
  if (count > 0) return;

  const shows = [
    {
      title: 'Marjorie Prime',
      slug: 'marjorie-prime',
      company: 'Trunk Theatre',
      dateRange: 'April 9 – April 19',
      description:
        'A touching and thought-provoking play about memory, loss, and what it means to be human. When an elderly woman gets a holographic companion programmed to recall her memories, her family grapples with questions of identity and grief.',
      featured: true,
      publishedAt: new Date(),
    },
    {
      title: 'Die-Nasty',
      slug: 'die-nasty',
      company: 'Die-Nasty',
      dateRange: 'Every Monday at 7:30pm',
      description:
        "Edmonton's beloved ongoing improvised soap opera — an institution for over 30 years. Every Monday night brings a brand new episode of live, unscripted drama.",
      featured: true,
      publishedAt: new Date(),
    },
    {
      title: 'Autumn',
      slug: 'autumn',
      company: 'Shadow Theatre',
      dateRange: 'Fall 2025',
      description: 'A poignant drama that explores change, connection, and the passage of time.',
      featured: false,
      publishedAt: new Date(),
    },
    {
      title: 'Farren Presents…',
      slug: 'farren-presents',
      company: 'Teatro Live!',
      dateRange: 'Summer 2025',
      description: 'A sparkling evening of cabaret and song hosted by the irrepressible Farren.',
      featured: false,
      publishedAt: new Date(),
    },
    {
      title: 'Fully Committed',
      slug: 'fully-committed',
      company: 'Teatro Live!',
      dateRange: 'Summer 2025',
      description:
        'A whirlwind one-person comedy about a day in the life of a reservation line operator at New York\'s hottest restaurant.',
      featured: false,
      publishedAt: new Date(),
    },
    {
      title: "Cocktails at Pam's",
      slug: 'cocktails-at-pams',
      company: 'Teatro Live!',
      dateRange: 'Summer 2025',
      description: 'An evening of laughs, cocktails, and fabulous company.',
      featured: false,
      publishedAt: new Date(),
    },
    {
      title: 'House of Hush: Burlesque Marathong',
      slug: 'house-of-hush-marathong',
      company: 'House of Hush',
      dateRange: 'Coming soon',
      description: 'The legendary marathon burlesque spectacular returns.',
      featured: false,
      publishedAt: new Date(),
    },
  ];

  for (const show of shows) {
    await strapi.db.query('api::show.show').create({ data: show });
  }
  strapi.log.info('✅ Seeded shows');
}

async function seedStaff(strapi: Core.Strapi) {
  const count = await strapi.db.query('api::staff-member.staff-member').count({});
  if (count > 0) return;

  const members = [
    { name: 'Kendra Connor', role: 'Executive Director', email: 'executivedirector@varsconatheatre.com', sortOrder: 1, isBoardMember: false },
    { name: 'Coralie Cairns', role: 'Accounts Manager', email: 'accounts@varsconatheatre.com', sortOrder: 2, isBoardMember: false },
    { name: 'Garett Ross', role: 'Front of House Manager', email: 'frontofhouse@varsconatheatre.com', sortOrder: 3, isBoardMember: false },
    { name: 'Davina Stewart', role: 'Director of Communications, Theatre Rentals', email: 'communications@varsconatheatre.com', sortOrder: 4, isBoardMember: false },
    { name: 'Tiana McLean', role: 'Director of Production', email: 'tech@varsconatheatre.com', sortOrder: 5, isBoardMember: false },
    { name: 'Victoria Jones', role: 'President', sortOrder: 10, isBoardMember: true },
    { name: 'Heather Klimchuk', role: 'Vice-president', sortOrder: 11, isBoardMember: true },
    { name: 'Kerry Powell', role: 'Secretary', sortOrder: 12, isBoardMember: true },
    { name: 'Mark Reid', role: 'Treasurer', sortOrder: 13, isBoardMember: true },
    { name: 'Jim McKillop', role: 'Past President', sortOrder: 14, isBoardMember: true },
  ];

  for (const member of members) {
    await strapi.db.query('api::staff-member.staff-member').create({ data: member });
  }
  strapi.log.info('✅ Seeded staff');
}
