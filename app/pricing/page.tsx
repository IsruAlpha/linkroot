'use client';

import { Header } from '@/components/header';
import { FeatureSection } from '@/components/feature-section';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';
import { FullWidthDivider } from '@/components/ui/full-width-divider';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-outfit relative overflow-hidden">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-20",
        )}
      />
      <Header />
      <FullWidthDivider />
      <main className="relative mx-auto w-full max-w-5xl before:absolute before:inset-y-0 before:-left-px before:w-px before:bg-border after:absolute after:inset-y-0 after:-right-px after:w-px after:bg-border">
        <div className="px-4 pt-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </div>
        <div className="pt-12 md:pt-20 pb-8">
            <FeatureSection />
        </div>
        <div className="pb-40">
            <PricingSection />
        </div>
        <FullWidthDivider />
        <Footer />
      </main>
    </div>
  );
}
