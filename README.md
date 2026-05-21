# ErgoAfya Solutions — Next.js Website

> **Healthy People • Productive Workplace**
> Kenya's evidence-based ergonomics & occupational health consultancy, Nairobi.

---

## File Structure

```
ergoafya/
│
├── public/
│   └── logo.svg                        # SVG logo (seated person + spine + circular text)
│
├── src/
│   ├── app/                            # Next.js 14 App Router
│   │   ├── layout.tsx                  # Root layout — Nav, Footer, WaFloat, SEO metadata
│   │   ├── page.tsx                    # Home page — assembles all sections
│   │   ├── globals.css                 # Global styles, CSS variables, animations
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx                # Blog listing page (/blog)
│   │   │   ├── [slug]/page.tsx         # Individual blog post (/blog/post-title)
│   │   │   └── admin/page.tsx          # Owner blog admin panel (/blog/admin)
│   │   │
│   │   └── api/
│   │       ├── book/route.ts           # POST /api/book  — booking handler
│   │       │                           #   → saves to Firestore
│   │       │                           #   → SMS via Africa's Talking (owner + client)
│   │       │                           #   → HTML email via Nodemailer (owner + client)
│   │       │                           #   → WhatsApp via CallMeBot (free fallback)
│   │       └── blog/route.ts           # GET /api/blog   — fetch published posts
│   │                                   # POST /api/blog  — owner creates new post
│   │
│   ├── components/
│   │   ├── HeroSection.tsx             # Hero — headline, CTAs, visual card, trust row
│   │   ├── RibbonBanner.tsx            # Animated scrolling services ticker
│   │   ├── StatsBand.tsx               # 4 key stats (7+ services, 3 sectors, 100%, 1st)
│   │   ├── AboutSection.tsx            # Vision, Mission, Why Choose Us, OT badge
│   │   ├── ServicesSection.tsx         # 7 service cards with icons and numbers
│   │   ├── ApproachSection.tsx         # 4-step clinical framework timeline
│   │   ├── ClientsSection.tsx          # 3 target client cards
│   │   ├── BlogSection.tsx             # Latest 3 posts + admin panel callout
│   │   ├── BookingSection.tsx          # Full booking form → /api/book
│   │   │
│   │   └── ui/
│   │       ├── Logo.tsx                # ErgoAfyaLogo component (full / icon / horizontal)
│   │       ├── Nav.tsx                 # Fixed nav — glass on scroll, mobile hamburger
│   │       ├── Footer.tsx              # 4-column footer with logo, links, contact
│   │       └── WaFloat.tsx             # Pulsing WhatsApp floating button
│   │
│   └── lib/
│       ├── firebase.ts                 # Firebase CLIENT SDK (browser — db, storage)
│       ├── firebase-admin.ts           # Firebase ADMIN SDK (server — Firestore writes)
│       ├── africastalking.ts           # Africa's Talking SMS (owner + client notifications)
│       └── email.ts                    # Nodemailer — HTML email to owner + client
│
├── .env.local                          # Environment variables (NEVER commit this)
├── .gitignore                          # Ignores node_modules, .next, .env*, keys
├── firebase.json                       # Firebase Hosting + Functions config
├── .firebaserc                         # Firebase project alias (ergoafya-solutions)
├── firestore.rules                     # Firestore security rules
├── firestore.indexes.json              # Firestore composite indexes
├── next.config.js                      # Next.js config (SSR or static toggle)
├── open-next.config.ts                 # OpenNext adapter for Cloudflare Workers
├── wrangler.jsonc                      # Cloudflare Workers deployment config
├── tsconfig.json                       # TypeScript config with @/* path alias
├── package.json                        # Dependencies and npm scripts
├── DEPLOYMENT.md                       # Full step-by-step deployment guide
└── README.md                           # This file
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR pages + API routes |
| Styling | CSS-in-JS + globals.css | No Tailwind dependency |
| Database | Firebase Firestore | Bookings, blog posts, subscribers |
| Storage | Firebase Storage | Blog post images |
| Hosting (SSR) | Cloudflare Workers | Edge-rendered Next.js via OpenNext |
| Hosting (Static) | Firebase Hosting | Static export option |
| SMS | Africa's Talking | Owner + client SMS notifications |
| Email | Nodemailer (Gmail/SendGrid) | HTML booking confirmation emails |
| WhatsApp | CallMeBot API | Free WA alerts to owner |
| DNS + CDN | Cloudflare | Domain, SSL, DDoS protection |

---

## Deployment Options

### Option A — Cloudflare Workers (SSR, Recommended)
Full server-side rendering. API routes work. Fastest globally.

```bash
# 1. Install CLI
npm install -g wrangler
wrangler login

# 2. Set all secrets (run each line separately)
wrangler secret put AT_API_KEY
wrangler secret put AT_USERNAME
wrangler secret put AT_OWNER_PHONE
wrangler secret put AT_OWNER_PHONE2
wrangler secret put AT_SENDER_ID
wrangler secret put CALLMEBOT_API_KEY
wrangler secret put FIREBASE_ADMIN_PROJECT_ID
wrangler secret put FIREBASE_ADMIN_CLIENT_EMAIL
wrangler secret put FIREBASE_ADMIN_PRIVATE_KEY
wrangler secret put EMAIL_FROM
wrangler secret put EMAIL_PASSWORD
wrangler secret put OWNER_EMAIL
wrangler secret put ADMIN_SECRET

# 3. Build + deploy
npm run deploy:cloudflare

# 4. Add custom domain
# Cloudflare Dashboard → Workers & Pages → ergoafya → Custom Domains → ergoafya.com
```

**Critical:** `wrangler.jsonc` must have `"compatibility_date": "2025-04-01"` and `"nodejs_compat"` flag.

---

### Option B — Firebase Hosting (Static Export)
Zero-cost static site. API routes replaced by Firebase Cloud Functions.

```bash
# 1. In next.config.js, uncomment: output: 'export'

# 2. Build static files
next build
# Output goes to /out folder

# 3. Install Firebase CLI
npm install -g firebase-tools
firebase login
firebase init  # choose Hosting + Firestore

# 4. Deploy
firebase deploy --only hosting

# Live at: https://ergoafya-solutions.web.app
# Custom domain: Firebase Console → Hosting → Add custom domain
```

---

### Option C — Hybrid (Best for growth)
- **Cloudflare Workers** → Next.js SSR + /api routes (booking, blog)
- **Firebase Firestore** → Database for bookings and blog posts
- **Firebase Storage** → Image uploads for blog
- **Cloudflare DNS** → Domain + DDoS + SSL

This is the recommended production setup.

---

## Environment Variables

Copy `.env.local` and fill in all values. Required:

```bash
# Africa's Talking
AT_USERNAME=ergoafya          # your AT app username ('sandbox' for testing)
AT_API_KEY=your_key           # AT Dashboard → Settings → API Key
AT_OWNER_PHONE=+254712251520  # owner SMS number
AT_OWNER_PHONE2=+254734251520 # backup / WhatsApp number
AT_SENDER_ID=ErgoAfya         # registered sender ID

# Firebase Client (safe to expose — prefixed NEXT_PUBLIC_)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ergoafya.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ergoafya-solutions
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ergoafya-solutions.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Firebase Admin (server only — NEVER expose to browser)
FIREBASE_ADMIN_PROJECT_ID=ergoafya-solutions
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Email
EMAIL_FROM=ergoafya@mail.com
EMAIL_PASSWORD=your_gmail_app_password   # Gmail → Security → App Passwords
OWNER_EMAIL=ergoafya@mail.com

# Blog admin
ADMIN_SECRET=your_strong_secret_here    # protects /api/blog POST and /blog/admin

# CallMeBot WhatsApp (optional, free)
CALLMEBOT_API_KEY=your_key
```

---

## Africa's Talking Setup (Step by Step)

1. Sign up at **account.africastalking.com**
2. Create an app — note your **username**
3. Go to **Settings → API Key** → Generate → copy to `AT_API_KEY`
4. Go to **SMS → Sender IDs** → Request `ErgoAfya` (alphanumeric, approved in 1–3 days)
5. Test in **sandbox**: set `AT_USERNAME=sandbox`, use sandbox API key — no charges
6. Top up via M-Pesa or Airtel Money (~KSh 100 sends ~200 SMS)
7. Switch `AT_USERNAME` to your real username to go live

**Cost:** ~KSh 0.40–0.60 per SMS. A booking triggers 2 SMS (owner + client) = ~KSh 1.

---

## Firebase Setup (Step by Step)

1. Go to **console.firebase.google.com** → Create project → `ergoafya-solutions`
2. Enable **Firestore Database** → Start in production mode → choose `asia-south1` (closest to Kenya)
3. Enable **Storage** → Default bucket
4. Go to **Project Settings → General → Your apps** → Add Web App → copy config to `.env.local`
5. Go to **Project Settings → Service Accounts** → Generate new private key → download JSON
6. Copy `project_id`, `client_email`, `private_key` from JSON to `.env.local`
7. Deploy Firestore rules: `firebase deploy --only firestore:rules`

---

## Booking Flow (What Happens on Submit)

```
Visitor fills form → POST /api/book
  ↓
1. Zod validation (required fields, email format, phone)
  ↓
2. Save to Firestore /bookings/{id} (status: "pending")
  ↓  (all parallel)
3a. Africa's Talking SMS → owner (+254712251520, +254734251520)
3b. Africa's Talking SMS → client (their number)
3c. Nodemailer HTML email → owner (ergoafya@mail.com)
3d. Nodemailer HTML email → client (their email)
3e. CallMeBot WhatsApp → owner (free fallback)
  ↓
4. Return { success: true, bookingId } to browser
  ↓
5. Form shows success state: "Booking Sent! You'll be contacted in 24 hours."
```

---

## Blog Admin Flow

1. Go to `/blog/admin` on your deployed site
2. Enter your `ADMIN_SECRET` to log in
3. Write post title, select category, paste excerpt + full content
4. Check **Publish immediately** or leave unchecked to save as draft
5. Click **Publish Post** → POST /api/blog with `Authorization: Bearer {secret}`
6. Post saved to Firestore `/posts/{id}` → appears on `/blog` within 5 minutes (Cloudflare cache TTL)

---

## Local Development

```bash
# Clone / unzip the project
cd ergoafya

# Install dependencies
npm install

# Copy and fill environment variables
cp .env.local .env.local.example
# Edit .env.local with your actual keys

# Run dev server
npm run dev
# → http://localhost:3000

# Test Africa's Talking (sandbox — free)
# Set AT_USERNAME=sandbox in .env.local

# Build for production
npm run build
```

---

## Scripts

```bash
npm run dev                  # Local dev server (http://localhost:3000)
npm run build                # Production build
npm run start                # Run production build locally
npm run deploy:cloudflare    # Build + deploy to Cloudflare Workers
npm run deploy:firebase      # Build static + deploy to Firebase Hosting
```

---

## Contacts (ErgoAfya Solutions)

| Channel | Detail |
|---------|--------|
| Phone | +254 712 251 520 |
| WhatsApp | 0734 251 520 |
| Email | ergoafya@mail.com |
| Location | Upperhill Gardens, Along 3rd Ngong Avenue, Nairobi |

---

*Built for ErgoAfya Solutions — Healthy People • Productive Workplace*
