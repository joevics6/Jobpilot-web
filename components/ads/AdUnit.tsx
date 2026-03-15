"use client";

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * AdUnit — reusable Google AdSense component
 *
 * Place this file at: components/ads/AdUnit.tsx
 *
 * Usage examples:
 *   Banner:      <AdUnit slot="6866736453" format="auto" />
 *   In-article:  <AdUnit slot="5553654784" format="fluid" layout="in-article" />
 *   In-feed:     <AdUnit slot="2040985457" format="fluid" layoutKey="-g4-2b+f-5v+o7" />
 *   Sidebar:     <AdUnit slot="9189647463" format="auto" />
 *
 * Requirements:
 *   - Add the AdSense <script> tag ONCE in app/layout.tsx <head>:
 *     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1119289641389825" crossOrigin="anonymous" />
 *   - Never add the script inside this component — it causes duplicate-script errors in Next.js.
 */
export default function AdUnit({
  slot,
  format = 'auto',
  layout,
  layoutKey,
  style,
  className,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1-second delay before pushing the ad.
    // Prevents accidental clicks immediately after page load,
    // which is the primary cause of inflated CTR.
    const timer = setTimeout(() => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // adsbygoogle not yet loaded — safe to swallow
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle${className ? ` ${className}` : ''}`}
      style={{ display: 'block', textAlign: layout === 'in-article' ? 'center' : undefined, ...style }}
      data-ad-client="ca-pub-1119289641389825"
      data-ad-slot={slot}
      data-ad-format={format}
      {...(layout ? { 'data-ad-layout': layout } : {})}
      {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      {...(format === 'auto' ? { 'data-full-width-responsive': 'true' } : {})}
    />
  );
}