// middleware.ts  (Root folder - Original version)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const BLOCKED_COUNTRIES = new Set(['SG']);

const ALLOWED_CRAWLERS = [
  'Twitterbot',
  'facebookexternalhit',
  'LinkedInBot',
  'Slackbot-LinkExpanding',
  'Googlebot',
  'WhatsApp',
  'Discordbot',
];

const RATE_LIMIT   = 400;
const WINDOW_MS    = 60;   
const BAN_DURATION = 180;

const RATE_LIMITED_PATHS = ['/api/', '/jobs/'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ua = request.headers.get('user-agent') || '';
  
  // 1. SKIP STATIC ASSETS
  if (
    pathname.startsWith('/_next/') || 
    pathname.includes('/static/') ||
    pathname.endsWith('.png') || 
    pathname.endsWith('.jpg') || 
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }

  // 2. ALLOW SOCIAL CRAWLERS THROUGH — before any blocking logic
  if (ALLOWED_CRAWLERS.some(bot => ua.includes(bot))) {
    return NextResponse.next();
  }

  const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  // 3. Country Block
  if (BLOCKED_COUNTRIES.has(country) && pathname.startsWith('/jobs')) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 4. Only Rate Limit specified paths
  const isRateLimited = RATE_LIMITED_PATHS.some(p => pathname.startsWith(p));
  if (!isRateLimited) return NextResponse.next();

  try {
    const banKey = `ban:${ip}`;
    const countKey = `rate:${ip}`;

    const banned = await redis.get(banKey);
    if (banned) {
      return new NextResponse('Please slow down. You are temporarily rate-limited.', {
        status: 429,
        headers: { 'Retry-After': '180' },
      });
    }

    const count = await redis.incr(countKey);
    if (count === 1) await redis.expire(countKey, WINDOW_MS);

    if (count > RATE_LIMIT) {
      if (process.env.NODE_ENV === 'development') return NextResponse.next();
      await redis.set(banKey, '1', { ex: BAN_DURATION });
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  } catch (err) {
    console.error('[middleware] Redis error:', err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};