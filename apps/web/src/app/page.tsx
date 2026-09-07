'use client';

import nextDynamic from 'next/dynamic';

// Dynamically import HomeClient with SSR disabled to avoid Leaflet window errors
const HomeClient = nextDynamic(() => import('@/components/HomeClient'), { ssr: false });

export default function Home() {
  return <HomeClient />;
}
