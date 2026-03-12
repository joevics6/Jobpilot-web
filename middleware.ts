import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limiter
// ⚠️  NOTE: This works for long-running servers (Railway, Render, VPS).
//     On Vercel serverless, each Lambda is stateless so this map resets per
//     cold-start. Upgrade to @upstash/ratelimit for persistent rate limiting on Vercel.
const ipRequests = new Map<string, { count: number; resetTime: number; blocked: boolean }>();

const LIMITS = {
  normalUser: { requests: 30, window: 60000 },   // 30 req/min
  blocked:    { requests: 0,  window: 300000 },   // 5 min ban
};

// Countries to block entirely from /jobs/* routes (bot hotspots with no real users)
const BLOCKED_COUNTRIES = ['SG'];

// Clean up expired entries periodically
function cleanup() {
  const now = Date.now();
  for (const [ip, data] of ipRequests.entries()) {
    if (now > data.resetTime) ipRequests.delete(ip);
  }
}

export function middleware(request: NextRequest) {
  // Cleanup ~1% of requests to avoid memory bloat
  if (Math.random() < 0.01) cleanup();

  const ip =
    request.ip ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const country  = request.geo?.country || 'unknown';
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const pathname  = request.nextUrl.pathname;

  // ── 1. Skip static assets ────────────────────────────────────────────────
  if (pathname.match(/\.(jpg|jpeg|png|gif|css|js|ico|svg|woff|woff2)$/)) {
    return NextResponse.next();
  }

  // ── 2. Hard country block on /jobs/* ─────────────────────────────────────
  //    Bots from these countries were hammering job pages. Real users from SG
  //    are collateral but the jobs themselves have been deleted from the DB.
  if (BLOCKED_COUNTRIES.includes(country) && pathname.startsWith('/jobs/')) {
    console.log(`Blocked country ${country}: ${ip} → ${pathname}`);
    return new NextResponse('Access restricted in your region.', { status: 403 });
  }

  // ── 3. Bot user-agent detection ──────────────────────────────────────────
  const botPatterns = [
    'bot', 'crawl', 'spider', 'scraper', 'python-requests', 'curl',
    'wget', 'jobbot', 'jobspider', 'scrapy', 'axios', 'node-fetch',
  ];
  const isBot = botPatterns.some(pattern => userAgent.includes(pattern));

  if (isBot && !userAgent.includes('googlebot') && !userAgent.includes('bingbot')) {
    console.log(`Blocked bot UA: ${userAgent.substring(0, 50)} from ${ip}`);
    return new NextResponse('Forbidden - Bot detected', { status: 403 });
  }

  // ── 4. IP rate limiting ──────────────────────────────────────────────────
  const now    = Date.now();
  const ipData = ipRequests.get(ip);

  // Still within an active ban?
  if (ipData?.blocked && now < ipData.resetTime) {
    console.log(`Banned IP attempted access: ${ip}`);
    return new NextResponse('Too Many Requests - You are temporarily blocked.', {
      status: 429,
      headers: { 'Retry-After': '300' },
    });
  }

  const limit = LIMITS.normalUser;

  // Start a fresh window
  if (!ipData || now > ipData.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + limit.window, blocked: false });
    return NextResponse.next();
  }

  ipData.count++;

  if (ipData.count > limit.requests) {
    ipData.blocked   = true;
    ipData.resetTime = now + LIMITS.blocked.window;

    console.log(`Rate limit exceeded — banned: ${ip} (${country}), count: ${ipData.count}, path: ${pathname}`);

    return new NextResponse('Too Many Requests - You have been temporarily blocked.', {
      status: 429,
      headers: {
        'Retry-After':        '300',
        'X-RateLimit-Limit':  String(limit.requests),
        'X-RateLimit-Remaining': '0',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};