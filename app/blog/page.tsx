"use client";

import { BlogsSection } from "@/components/blogs-section";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export default function BlogPage() {
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
        <BlogsSection />
        <Footer />
      </main>
    </div>
  );
}
