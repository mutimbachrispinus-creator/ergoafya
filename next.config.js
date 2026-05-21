/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Cloudflare Workers via OpenNext — use Node.js runtime (NOT edge)
  // For static export (Cloudflare Pages / Firebase Hosting), use: output: 'export'
  // Comment/uncomment the line below depending on your target:

  // output: 'export',   // ← Uncomment for fully static (no API routes)
  // output: 'standalone', // ← For Docker / Firebase Cloud Run

  images: {
    // For static export: disable Next.js image optimization (use <img> or Cloudflare Images)
    unoptimized: false,
    remotePatterns: [
      { protocol: 'https', hostname: '**.firebasestorage.googleapis.com' },
    ],
  },

  // Security headers (Cloudflare can also set these at edge)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/uuid/**/*'],
    },
  },
}

module.exports = nextConfig
