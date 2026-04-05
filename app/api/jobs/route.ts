import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';

const FIELDS = 'id, slug, title, company, location, country, salary_range, employment_type, posted_date, created_at, sector, role_category, job_type, role, related_roles, ai_enhanced_roles, skills_required, ai_enhanced_skills, experience_level';
const STALE_TTL     = 86400;             // 24 h  — stale fallback
const COOLDOWN_SECS = 3600;             // 1 hour — min gap between cache busts
const CACHE_KEY     = 'jobs:all';
const STALE_KEY     = 'jobs:all:stale';
const COOLDOWN_KEY  = 'jobs:cache:last_bust'; // unix timestamp of last successful bust

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // ── Admin: 1-hour cooldown-gated cache bust ───────────────────────────────
  // Call: /api/jobs?action=bust_cache&admin_secret=YOUR_SECRET
  // Only busts once per hour even if jobs are posted continuously
  if (searchParams.get('action') === 'bust_cache') {
    const expectedSecret = process.env.ADMIN_CACHE_SECRET;
    const adminSecret = searchParams.get('admin_secret');

    if (!expectedSecret || adminSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const now = Math.floor(Date.now() / 1000);
      const lastBust = await redis.get<number>(COOLDOWN_KEY);

      // Still within the 1-hour cooldown — skip silently
      if (lastBust && now - lastBust < COOLDOWN_SECS) {
        const retryIn = COOLDOWN_SECS - (now - lastBust);
        console.log(`[jobs-api] Bust skipped — cooldown active, retry in ${retryIn}s`);
        return NextResponse.json({ skipped: true, retry_in_seconds: retryIn });
      }

      // Cooldown passed — delete cache and record timestamp
      await Promise.all([
        redis.del(CACHE_KEY),
        redis.del(STALE_KEY),
        redis.set(COOLDOWN_KEY, now, { ex: COOLDOWN_SECS }),
      ]);

      console.log('[jobs-api] Cache busted');
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error('[jobs-api] Cache bust error:', err);
      return NextResponse.json({ error: 'Cache bust failed' }, { status: 500 });
    }
  }

  try {
    // ── 1. Check Redis cache ──────────────────────────────────────────────
    const cached = await redis.get<any[]>(CACHE_KEY);

    if (cached) {
      console.log(`[jobs-api] Cache HIT — ${cached.length} jobs from Redis`);
      return NextResponse.json(
        { jobs: cached, total: cached.length, source: 'cache' },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=120',
            'Vary': 'Accept-Encoding',
          },
        }
      );
    }

    // ── 2. Cache MISS — fetch from Supabase ──────────────────────────────
    console.log('[jobs-api] Cache MISS — fetching from Supabase');
    const supabase = getSupabase();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('jobs')
      .select(FIELDS)
      .eq('status', 'active')
      .gte('posted_date', thirtyDaysAgoStr)
      .order('posted_date', { ascending: false })
      .order('created_at', { ascending: false })
      .range(0, 1999);

    if (error) {
      console.error('[jobs-api] Supabase error:', error);

      // Serve stale fallback if Supabase fails
      const stale = await redis.get<any[]>(STALE_KEY);
      if (stale) {
        console.warn('[jobs-api] Serving stale fallback');
        return NextResponse.json(
          { jobs: stale, total: stale.length, source: 'stale-cache' },
          { headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=120' } }
        );
      }
      return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }

    const jobs = data || [];

    // ── 3. Write primary + stale cache in parallel ────────────────────────
    Promise.all([
      redis.set(CACHE_KEY, jobs),          // no TTL — only expires on bust
      redis.set(STALE_KEY, jobs, { ex: STALE_TTL }),
    ])
      .then(() => console.log(`[jobs-api] Cached ${jobs.length} jobs (no expiry — bust only)`))
      .catch(err => console.error('[jobs-api] Redis write error:', err));

    return NextResponse.json(
      { jobs, total: jobs.length, source: 'supabase' },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=120',
          'Vary': 'Accept-Encoding',
        },
      }
    );
  } catch (error) {
    console.error('[jobs-api] Unexpected error:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}