"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Sparkles, Layout, Zap, Fingerprint } from "lucide-react";

export default function AINativeBlogPost() {
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
        <article className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>

          <header className="mb-12">
            <time className="text-sm text-muted-foreground font-mono uppercase tracking-wider mb-4 block">
              March 21, 2026
            </time>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Revolutionizing Link-in-Bio: The AI-Native Revolution
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how Linkroot is redefining the digital identity landscape through AI-native integration and premium, minimalist design.
            </p>
          </header>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-base leading-relaxed">
              <section>
                <p className="text-muted-foreground text-lg italic border-l-2 border-white/20 pl-6 my-8">
                  "The best design is the one you don't even notice. The best AI is the one that feels like magic."
                </p>
                <p className="text-muted-foreground">
                  For years, link-in-bio apps have followed a predictable formula: a list of buttons, some basic icons, and limited customization. At Linkroot, we decided that "good enough" wasn't enough. We set out to build something fundamentally different—an AI-native platform that understands your brand and helps you express it with unparalleled elegance.
                </p>
              </section>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                <Sparkles className="size-6 text-yellow-500" />
                AI-Native: Beyond the Buzzword
              </h2>

              <p className="text-muted-foreground">
                While many apps are "adding AI" as a side feature, Linkroot is built from the ground up with AI at its core. Our AI-native integration isn't just a chatbot; it's a deeply embedded system that assists you at every step of your creative journey.
              </p>

              <div className="grid gap-6 my-10">
                <FeatureCard
                  icon={<Zap className="size-5" />}
                  title="Intelligent Theme Generation"
                  description="Our AI analyzes your content and brand colors to generate custom themes that aren't just templates—they are unique digital environments tailored specifically to you."
                />
                <FeatureCard
                  icon={<Fingerprint className="size-5" />}
                  title="Dynamic Content Optimization"
                  description="Automatically optimize your link descriptions and call-to-actions based on what resonates with your audience, ensuring every click counts."
                />
                <FeatureCard
                  icon={<Layout className="size-5" />}
                  title="Smart Layout Composition"
                  description="AI-driven layout suggestions that adapt to the number of links you have, ensuring a perfect visual balance whether you have 3 links or 30."
                />
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                Clean & Minimal: The Premium Standard
              </h2>

              <p className="text-muted-foreground">
                In an era of digital noise, minimalism is the ultimate sophistication. Linkroot's design philosophy is centered around clarity. We use premium typography, balanced whitespace, and subtle animations to create an experience that feels high-end and professional.
              </p>

              <p className="text-muted-foreground">
                Our "Glassmorphism" effect, smooth transitions, and high-contrast dark modes aren't just aesthetic choices—they are functional elements designed to keep your audience focused on what matters most: your content.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                Redefining the Linktree Experience
              </h2>

              <p className="text-muted-foreground">
                Linktree pioneered the space, but Linkroot is evolving it. By combining AI power with a "less is more" design approach, we've created a platform that is faster to set up, more beautiful to look at, and more effective at converting visitors into followers and customers.
              </p>

              <ul className="list-disc list-inside space-y-3 text-muted-foreground my-8 ml-4">
                <li><span className="text-white font-semibold">Zero Friction:</span> Go from sign-up to a live, beautiful page in under 60 seconds with AI assistance.</li>
                <li><span className="text-white font-semibold">Truly Live Preview:</span> See every change as it happens with our industry-leading live preview engine.</li>
                <li><span className="text-white font-semibold">Premium by Default:</span> Every feature is designed to look and feel professional, regardless of your design experience.</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                The Future is Here
              </h2>

              <p className="text-muted-foreground">
                We're not just building a link-in-bio tool; we're building the future of personal branding. With upcoming features like AI-powered analytics insights and automated social cross-posting, Linkroot is becoming the central hub for your entire online presence.
              </p>

              <div className="mt-16 p-8 bg-zinc-900/50 border border-zinc-800/40 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="size-24 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                  Ready to experience the AI-native difference?
                </h3>
                <p className="text-muted-foreground mb-6 relative z-10 max-w-md">
                  Join thousands of creators who have already switched to a more intelligent, beautiful way of sharing their links.
                </p>
                <Link 
                  href="/sign-up" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-lg relative z-10"
                >
                  Create Your Linkroot Now
                </Link>
              </div>
            </div>
          </div>
        </article>
        <FullWidthDivider />
        <Footer />
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-zinc-900/30 border border-zinc-800/40 rounded-xl hover:border-zinc-700/60 transition-all hover:bg-zinc-900/50 group">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white/5 rounded-lg text-white group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
