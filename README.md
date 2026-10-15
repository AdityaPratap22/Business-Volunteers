# Business Volunteers (Next.js Application)

Founder-led digital marketing and growth engineering agency platform built with Next.js (App Router), React 19, TypeScript, and self-hosted client-side tools.

## Tech Stack
- **Framework**: Next.js 16 (App Router + Pages API)
- **Frontend**: React 19, TypeScript
- **Styling**: Vanilla CSS with Design System Variables (`Outfit` & `Inter`)
- **Email / API**: Resend, Node.js Native TLS / DNS Checkers
- **Tools Engine**: 106 standalone browser-first tools with self-hosted vendor libraries (`/vendor/`)

## Scripts
- `npm run dev`: Starts the Next.js development server on `http://localhost:3000`
- `npm run build`: Generates the XML sitemap (1,318 URLs) and builds production static & SSR pages
- `npm start`: Serves the production build
- `npm run lint`: Runs Oxlint code inspection

## Key Routes
- `/` - Agency Homepage
- `/services` - Services & Transparent Pricing catalog
- `/services/[id]` - Dedicated Service Details
- `/tools` - Catalog of 106 browser-based business tools
- `/tools/[slug]` - Dedicated standalone tool page with live runner
- `/blogs` - Growth & SEO insights
- `/blogs/[slug]` - Blog article details
- `/industries` - 89+ Industry growth playbooks
- `/digital-marketing` - Global & domestic location directories
- `/digital-marketing/[city]` - City-specific digital marketing agency landing page
- `/portfolio` - Case studies and verified client metrics
- `/payment` - Online invoice & settlement payment gateway
- `/api/send-email` - Lead & strategy booking dispatch
- `/api/http-status` - HTTP status & header checker
- `/api/ssl-expiry` - Live TLS / SSL certificate validator
- `/api/broken-links` - In-page link crawler
- `/api/redirect-chain` - HTTP redirect hop inspector
