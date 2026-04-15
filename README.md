# Varscona Theatre — Website

Replacement for the current Squarespace site at [varsconatheatre.com](https://www.varsconatheatre.com).

Built as a pnpm monorepo with a React frontend and a Strapi headless CMS.

```
varscona/
├── packages/
│   ├── web/    — Vite + React 19 + TypeScript + Tailwind CSS 4
│   └── cms/    — Strapi 5 (SQLite locally, Postgres in production)
├── package.json
└── pnpm-workspace.yaml
```

---

## Prerequisites

- **Node.js** ≥ 20 (`node --version`)
- **pnpm** ≥ 9 — install with `npm install -g pnpm`

---

## Local setup

### 1. Clone and install

```bash
git clone git@github.com:matbusby/varscona.git
cd varscona
pnpm install
```

### 2. Configure the CMS environment

The CMS needs a `.env` file with secrets. Copy the example and fill in the values:

```bash
cp packages/cms/.env.example packages/cms/.env
```

Then open `packages/cms/.env` and replace each placeholder with a real secret. You can generate values with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

The file should look like this when complete:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=<two comma-separated base64 strings>
API_TOKEN_SALT=<base64 string>
ADMIN_JWT_SECRET=<base64 string>
TRANSFER_TOKEN_SALT=<base64 string>
JWT_SECRET=<base64 string>
ENCRYPTION_KEY=<base64 string>
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### 3. Configure the frontend environment

```bash
cp packages/web/.env.example packages/web/.env
```

The default value (`VITE_CMS_URL=http://localhost:1337`) works for local development — no changes needed.

> **Note:** The frontend works without the CMS running. It falls back to static placeholder data so you can work on the UI independently.

---

## Running locally

| Command | What it does |
|---|---|
| `pnpm dev` | Start both servers in parallel |
| `pnpm dev:web` | Frontend only → [localhost:5173](http://localhost:5173) |
| `pnpm dev:cms` | CMS only → [localhost:1337](http://localhost:1337) |

### First CMS boot

The first time Strapi starts it will:
1. Build the admin panel (takes ~60 seconds)
2. Prompt you to **create an admin account** at [localhost:1337/admin](http://localhost:1337/admin)
3. Automatically seed all current shows and staff into the database
4. Grant the frontend public read access to the API

Subsequent starts are much faster.

---

## CMS — managing content

Once Strapi is running, log in at **[localhost:1337/admin](http://localhost:1337/admin)**.

### Content types

| Type | What it controls |
|---|---|
| **Show** | Productions — title, company, dates, description, image, featured flag |
| **Staff Member** | Team and board members — name, role, email, photo |
| **Site Settings** | Global — hero tagline, hero image, social links, donation URLs |

### Adding a new show

1. Go to **Content Manager → Show → Create new entry**
2. Fill in title, company, date range, description
3. Upload a poster image in the **image** field
4. Toggle **featured** on if it should appear in the hero grid on the home page
5. Click **Publish**

### Uploading images

Use the **Media Library** (top nav) to upload and manage all images. Images attached to shows will automatically appear on the website in the correct sizes.

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, featured shows, Cue the Future banner, upcoming shows, about blurb |
| `/shows` | Full show listing with company filter |
| `/shows/:slug` | Individual show detail |
| `/who-we-are` | About, resident companies, staff, board |
| `/contact` | Address, transit info, team contacts |
| `/rent` | Venue rental info and inquiry |
| `/support/donate` | Donate (links to CanadaHelps) |
| `/support/membership` | Membership |
| `/support/cue-the-future` | Capital campaign |
| `/community` | Community & accountability |
| `/jobs` | Job postings |

---

## Remaining todos

### Content

- [ ] Replace placeholder show descriptions with final copy from the theatre
- [ ] Upload all show poster images via Strapi Media Library
- [ ] Add the actual Varscona logo (SVG or PNG) to `packages/web/public/` and wire it into [`Navbar.tsx`](packages/web/src/components/Navbar.tsx)
- [ ] Fill in real CanadaHelps donation URLs in **Site Settings** in the CMS
- [ ] Fill in real Instagram, Twitter/X, and Facebook URLs in **Site Settings**
- [ ] Update board of directors list (currently hardcoded in [`WhoWeAre.tsx`](packages/web/src/pages/WhoWeAre.tsx) — move to CMS once confirmed)
- [ ] Add community & accountability page copy ([`Community.tsx`](packages/web/src/pages/Community.tsx))

### Development

- [ ] Add a Google Maps embed to the Contact page (replace the placeholder link)
- [ ] Implement the Jobs page to pull postings from Strapi (add a `Job` content type when needed)
- [ ] Add an SEO component (`<title>`, `<meta description>`) per page using React Router's `useMatches` or a `<Helmet>` equivalent
- [ ] Add `robots.txt` and `sitemap.xml` generation to the frontend build

### Deployment

- [ ] Choose a hosting provider for Strapi (Railway and Render both have free tiers; a VPS gives more control)
- [ ] Provision a Postgres database for the production CMS (swap `DATABASE_CLIENT=sqlite` → `postgres` in the production `.env`)
- [ ] Deploy the frontend to Netlify or Vercel (connect the GitHub repo — it will auto-deploy on push to `main`)
- [ ] Set production environment variables in both platforms
- [ ] Point `varsconatheatre.com` DNS away from Squarespace once both services are live
- [ ] Cancel Squarespace subscription after confirming the new site is stable

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Vite + React 19 + TypeScript | Fast builds, full type safety |
| Styling | Tailwind CSS 4 | Utility-first, easy to maintain |
| Routing | React Router 7 | Standard SPA routing |
| CMS | Strapi 5 | Self-hosted, great admin UI, REST API, no per-seat cost |
| Database | SQLite (local) / Postgres (prod) | Zero config locally; robust in production |
| Package manager | pnpm workspaces | Fast installs, clean monorepo |
