import { Hero } from '@/src/components/sections/Hero';
import { QuickLinks } from '@/src/components/sections/QuickLinks';
import { LatestNews } from '@/src/components/sections/LatestNews';
import { InducteeGrid } from '@/src/components/sections/InducteeGrid';
import { Sponsors } from '@/src/components/sections/Sponsors';

export function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <LatestNews />
      <InducteeGrid />
      <Sponsors />
    </>
  );
}
