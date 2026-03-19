'use client';

import { Authenticated, Unauthenticated, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import Link from 'next/link';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import { HeroSection } from '@/components/hero';
import { Header } from '@/components/header';
import { LogosSection } from '@/components/logos-section';
import { FeaturesSection } from '@/components/features-section';
import { Integrations } from '@/components/integrations';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';
import { FullWidthDivider } from '@/components/ui/full-width-divider';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

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
        <Unauthenticated>
          <HeroSection />
          <FullWidthDivider />
          <LogosSection />
          <FullWidthDivider />
          <div id="features">
            <FeaturesSection />
          </div>
          <FullWidthDivider />
          <Integrations />
          <FullWidthDivider />
          <div id="pricing">
            <PricingSection />
          </div>
          <FullWidthDivider />
          <Footer />
        </Unauthenticated>
        <Authenticated>
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-muted-foreground animate-pulse">Redirecting to dashboard...</p>
          </div>
        </Authenticated>
      </main>
    </div>
  );
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return <div className="mx-auto"></div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p>Welcome {viewer ?? 'Anonymous'}!</p>
      <p>
        Click the button below and open this page in another window - this data is persisted in the Convex cloud
        database!
      </p>
      <p>
        <button
          className="bg-foreground text-background text-sm px-4 py-2 rounded-md"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
      </p>
      <p>Numbers: {numbers?.length === 0 ? 'Click the button!' : (numbers?.join(', ') ?? '...')}</p>
    </div>
  );
}
