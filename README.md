# OPG Solutions Hardware Store

Premium e-commerce storefront for **OPG Solutions** — built by [LUMIQ INDUSTRIES](https://github.com/Lumiq-Industries) (VILATECH × Infini Colon).

**Live preview:** https://opg-solutions-store.vercel.app

**Repository:** https://github.com/Lumiq-Industries/OPG-SOLUTIONS-HARDWARE

---

## Overview

Modern hardware store website with 41+ products, six category sections, cart/enquiry flows, animated OPG branding, and an AI shopping assistant powered by **OpenAI GPT-4o Mini**.

## Tech stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (logo / preloader animations)
- **Vercel** (hosting)

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/Lumiq-Industries/OPG-SOLUTIONS-HARDWARE.git
cd OPG-SOLUTIONS-HARDWARE
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

### Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes (for chatbot) | OpenAI API key — [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| `OPENAI_MODEL` | No | Defaults to `gpt-4o-mini` |
| `ANTHROPIC_API_KEY` | No | Optional fallback for the assistant |

On Vercel: **Project Settings → Environment Variables → add `OPENAI_API_KEY` → Redeploy**

## Project structure

```
src/
├── app/
│   ├── api/chat/           # AI assistant API route
│   ├── page.tsx            # Homepage
│   ├── shop/               # Category & shop pages
│   └── product/[slug]/     # Product detail pages
├── components/
│   ├── opg-logo.tsx        # Animated roof logo
│   ├── store-shell.tsx
│   ├── preloader.tsx
│   ├── chatbot.tsx
│   ├── cart-drawer.tsx
│   └── ...
├── data/
│   └── products-catalog.json
├── lib/
│   ├── products.ts         # Catalogue loader & enhancements
│   ├── assistant.ts        # OpenAI / fallback logic
│   ├── cart-context.tsx
│   └── site.ts
public/
├── brand/                  # OPG logo & brand assets
└── products/               # Product images
scripts/
├── build-catalog.py        # Rebuild catalogue from docx source
└── extract-docx-products.py
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Working with another developer

### Branch workflow

1. Pull latest `main` before starting work:
   ```bash
   git pull origin main
   ```
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-change
   ```
3. Commit with clear messages and open a PR into `main`.
4. Another developer reviews before merge.

### What to coordinate on

- **Products** — `src/data/products-catalog.json` and images in `public/products/`
- **Categories & copy** — `src/lib/site.ts`, shop pages, and homepage sections
- **Branding** — `public/brand/` and `src/components/opg-logo.tsx`
- **Chatbot** — `src/lib/assistant.ts` (product-aware responses)
- **Env vars** — never commit `.env` or `.env.local`; share keys securely

### Updating the product catalogue

Source material lives in the client docx (`OPG Business Pictures for Website.docx`). To rebuild:

```bash
python scripts/build-catalog.py
```

Then verify images in `public/products/` and run `npm run dev` to check listings.

### Deployment

Production deploys automatically from `main` on Vercel, or manually:

```bash
npx vercel --prod
```

## Related projects

| Project | Repo | Live |
|---------|------|------|
| Finance site | [OPG-SOLUTONS-FINANCE](https://github.com/Lumiq-Industries/OPG-SOLUTONS-FINANCE) | https://opg-solutions-finance.vercel.app |
| Client Quotations | — | https://opg-solutions-quotes.vercel.app |

## Client

**OPG Solutions** — Phiphidi / Masakona, Limpopo, South Africa

---

Built by **LUMIQ INDUSTRIES** · VILATECH × Infini Colon
