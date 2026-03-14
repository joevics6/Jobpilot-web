// 📁 middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Countries blocked from /jobs/* — no real users, only bots
const BLOCKED_COUNTRIES = new Set(['SG']);

// ── Rate limit config ────────────────────────────────────────────────────────
// Real users browsing a page fire 30-60 requests at once (JS, CSS, API, icons).
// Set limit high enough for normal use, tight enough to catch actual abuse.
const RATE_LIMIT   = 200;  // requests per window (was 30 — far too low)
const WINDOW_MS    = 60;   // 1 minute window
const BAN_DURATION = 300;  // 5 min ban after exceeding limit

// Only rate-limit these paths — skip static assets entirely at the matcher level
const RATE_LIMITED_PATHS = ['/api/', '/tools/', '/jobs/', '/blog/', '/'];

// Detect bots by user agent
const BOT_PATTERNS = [
  'bot', 'crawl', 'spider', 'scraper', 'python-requests',
  'curl', 'wget', 'jobbot', 'jobspider', 'scrapy', 'axios', 'node-fetch',
];

export async function middleware(request: NextRequest) {
  const pathname  = request.nextUrl.pathname;
  const country   = request.geo?.country || 'unknown';
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  const ip =
    request.ip ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // ── 1. Skip static assets ─────────────────────────────────────────────────
  if (pathname.match(/\.(jpg|jpeg|png|gif|css|js|ico|svg|woff|woff2|webp|avif|json|txt|xml)$/)) {
    return NextResponse.next();
  }

  // ── 2. Hard country block — entire site ─────────────────────────────────
  if (BLOCKED_COUNTRIES.has(country)) {
    console.log(`[middleware] Blocked country ${country}: ${ip} → ${pathname}`);
    return new NextResponse('Access restricted in your region.', { status: 403 });
  }

  // ── 3. Bot user-agent block ───────────────────────────────────────────────
  const isBot = BOT_PATTERNS.some(p => userAgent.includes(p));
  if (isBot && !userAgent.includes('googlebot') && !userAgent.includes('bingbot')) {
    console.log(`[middleware] Blocked bot: ${userAgent.substring(0, 50)} from ${ip}`);
    return new NextResponse('Forbidden - Bot detected', { status: 403 });
  }

  // ── 4. Only rate-limit meaningful paths, skip everything else ────────────
  const shouldRateLimit = RATE_LIMITED_PATHS.some(p => pathname.startsWith(p));
  if (!shouldRateLimit || ip === 'unknown') return NextResponse.next();

  // ── 5. Redis-backed rate limiting ────────────────────────────────────────
  try {
    const banKey   = `ban:${ip}`;
    const countKey = `rate:${ip}`;

    // Check if IP is currently banned
    const banned = await redis.get(banKey);
    if (banned) {
      console.log(`[middleware] Banned IP: ${ip}`);
      return new NextResponse('Too Many Requests - You are temporarily blocked.', {
        status: 429,
        headers: { 'Retry-After': '300' },
      });
    }

    // Increment request count within the window
    const count = await redis.incr(countKey);
    if (count === 1) {
      await redis.expire(countKey, WINDOW_MS);
    }

    if (count > RATE_LIMIT) {
      await redis.set(banKey, '1', { ex: BAN_DURATION });
      await redis.del(countKey);
      console.log(`[middleware] Rate limit exceeded — banned ${ip} (${country}), count: ${count}, path: ${pathname}`);
      return new NextResponse('Too Many Requests - You have been temporarily blocked.', {
        status: 429,
        headers: {
          'Retry-After': '300',
          'X-RateLimit-Limit': String(RATE_LIMIT),
          'X-RateLimit-Remaining': '0',
        },
      });
    }
  } catch (err) {
    // Redis down — fail open, never block real users
    console.error('[middleware] Redis error:', err);
  }

  return NextResponse.next();
}

export const config = {
  // Exclude _next/static, _next/image, favicon entirely from middleware
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};