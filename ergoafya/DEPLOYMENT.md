# ErgoAfya Solutions — Deployment Guide
## Next.js + Cloudflare Workers + Firebase + Africa's Talking

---

## OPTION A — Cloudflare Workers (RECOMMENDED ✅)
Best for: Full SSR, edge speed in Nairobi, free global CDN, $5/mo max

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
wrangler login   # opens browser auth
```

### 2. Create Cloudflare project
```bash
npm create cloudflare@latest -- ergoafya --framework=next --platform=workers
```

### 3. Set secrets (NEVER put secrets in wrangler.jsonc)
```bash
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
```

### 4. Build + Deploy
```bash
npm run deploy:cloudflare
# or: npx @opennextjs/cloudflare && npx wrangler deploy
```

### 5. Custom domain
- Cloudflare Dashboard → Workers & Pages → ergoafya → Custom Domains
- Add: ergoafya.com (Cloudflare must manage your DNS)
- SSL is automatic

### Key notes:
- Set compatibility_date = "2025-04-01" in wrangler.jsonc ← CRITICAL
- Remove any `export const runtime = 'edge'` from route files
- Do NOT use cookies() from next/headers in middleware

---

## OPTION B — Firebase Hosting (Static Export)
Best for: Blog/brochure site, zero backend, free tier

### 1. Switch to static export
In next.config.js, uncomment: `output: 'export'`
Note: API routes (/api/book, /api/blog) won't work in static mode.
Use Firebase Cloud Functions instead (see below).

### 2. Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init  # choose Hosting + Firestore + Functions
```

### 3. Build static site
```bash
next build   # outputs to /out folder
```

### 4. Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```
Your site: https://ergoafya-solutions.web.app
Custom domain: Firebase Console → Hosting → Add custom domain → ergoafya.com

### 5. Firebase Cloud Functions (for API routes in static mode)
```bash
# functions/index.js — booking handler using Africa's Talking
firebase deploy --only functions
```
Update form's fetch URL to: https://us-central1-ergoafya.cloudfunctions.net/book

---

## OPTION C — Hybrid (Recommended for growth)
- Cloudflare Workers → Next.js SSR frontend + /api routes
- Firebase Firestore → database for bookings + blog posts
- Firebase Storage → image uploads for blog posts
- Africa's Talking → SMS notifications to owner + clients
- Cloudflare DNS → domain management + DDoS protection

---

## OPTION D — Static HTML (Fastest to launch, zero cost)
The ergoafya_v2.html file works as a complete standalone site.
Upload it to:
- Cloudflare Pages: `wrangler pages deploy . --project-name=ergoafya`
- Firebase Hosting: `firebase deploy --only hosting` (put file in /public folder)
- GitHub Pages: push to repo, enable Pages in settings

---

## Africa's Talking Setup

### 1. Create account
Go to: account.africastalking.com
Sign up → Create App → set username (e.g. "ergoafya")

### 2. Get API key
Dashboard → Settings → API Key → Generate

### 3. Register Sender ID
Dashboard → SMS → Sender IDs → Request
- Submit: ErgoAfya
- Type: Alphanumeric
- Approval: 1-3 business days (Kenya)

### 4. Test in sandbox
Set AT_USERNAME=sandbox in .env.local
Use sandbox API key (no charges)
Test number: any Kenyan format (+2547XXXXXXXX)

### 5. Go live
Switch AT_USERNAME to your real app username
Top up via M-Pesa, Airtel Money, or PayPal
Cost: ~KSh 0.40-0.60 per SMS (very affordable)

---

## Firebase Setup

### 1. Create project
console.firebase.google.com → New Project → "ergoafya-solutions"

### 2. Enable services
- Firestore Database → Start in production mode
- Storage → Default bucket
- Authentication (optional — for admin blog panel)

### 3. Get client config
Project Settings → General → Your apps → Web app
Copy config to .env.local NEXT_PUBLIC_FIREBASE_* variables

### 4. Get admin SDK key
Project Settings → Service Accounts → Generate new private key
Download JSON → extract values to .env.local FIREBASE_ADMIN_* variables

### 5. Deploy Firestore rules
```bash
firebase deploy --only firestore:rules
```

---

## Cloudflare DNS Setup

1. Register ergoafya.com (or transfer existing domain)
2. Cloudflare Dashboard → Add site → enter domain
3. Change nameservers at your registrar to Cloudflare's
4. Add DNS records:
   - A record: @ → 192.0.2.1 (proxied) [auto-replaced by Workers]
   - CNAME: www → ergoafya.com (proxied)
5. SSL/TLS → Full (strict)
6. Speed → Optimization → Enable Auto Minify, Brotli

---

## GitHub Actions CI/CD (Auto-deploy on push)

Create .github/workflows/deploy.yml:
```yaml
name: Deploy ErgoAfya
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx @opennextjs/cloudflare
        env:
          AT_API_KEY: ${{ secrets.AT_API_KEY }}
          # add all secrets here from GitHub repo Settings → Secrets
      - run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

---

## Cost Summary

| Service | Free Tier | Paid |
|---------|-----------|------|
| Cloudflare Workers | 100k req/day | $5/mo (10M req) |
| Firebase Firestore | 50k reads/day | ~$0.06/100k reads |
| Firebase Hosting | 10GB transfer | $0.15/GB |
| Africa's Talking SMS | KSh 10 free credit | ~KSh 0.5/SMS |
| Cloudflare DNS | Free | Free |
| **Total (launch)** | **~KSh 0** | **~KSh 650/mo at scale** |
