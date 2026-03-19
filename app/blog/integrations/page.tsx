"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function IntegrationsBlogPost() {
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
              March 10, 2026
            </time>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Connect Your Favorite Tools with Linkroot
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how our growing library of integrations makes it easy to connect all your favorite platforms in one place.
            </p>
          </header>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-6 text-base leading-relaxed">
              <p className="text-muted-foreground">
                In today's digital landscape, creators and professionals use dozens of different platforms to share their work, connect with their audience, and build their brand. Managing all these links can be overwhelming—that's where Linkroot comes in.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                Why Integrations Matter
              </h2>

              <p className="text-muted-foreground">
                Our integration system is built with one goal in mind: making it effortless for you to showcase all your important links in one beautiful, unified space. Whether you're a content creator, entrepreneur, or developer, Linkroot helps you maintain a professional presence across all platforms.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                Popular Integrations
              </h2>

              <div className="grid gap-6 my-8">
                <IntegrationCard
                  name="Social Media"
                  description="Connect your Twitter, Instagram, LinkedIn, TikTok, YouTube, and more. Share your social presence with automatic icon detection and beautiful styling."
                />
                <IntegrationCard
                  name="Professional Platforms"
                  description="Link to your GitHub, Dribbble, Behance, and portfolio sites. Perfect for developers and designers showcasing their work."
                />
                <IntegrationCard
                  name="Content Platforms"
                  description="Add your Medium, Substack, Podcast, or YouTube channel. Keep your audience updated with all your latest content."
                />
                <IntegrationCard
                  name="E-commerce & Business"
                  description="Connect your online store, booking system, or business website. Drive traffic directly to where you make sales."
                />
                <IntegrationCard
                  name="Custom Links"
                  description="Add any custom link you want. Our smart system automatically detects and displays the appropriate icon."
                />
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                Smart Icon Detection
              </h2>

              <p className="text-muted-foreground">
                One of Linkroot's standout features is our intelligent icon detection system. Simply paste your link, and we automatically identify the platform and display the perfect icon. No manual configuration needed—it just works.
              </p>

              <p className="text-muted-foreground">
                Our system recognizes hundreds of popular platforms including:
              </p>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground my-6 ml-4">
                <li>Social networks (Twitter, Instagram, Facebook, LinkedIn)</li>
                <li>Video platforms (YouTube, Vimeo, TikTok)</li>
                <li>Developer tools (GitHub, GitLab, Stack Overflow)</li>
                <li>Design platforms (Dribbble, Behance, Figma)</li>
                <li>E-commerce (Shopify, Etsy, Amazon)</li>
                <li>And many more...</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                Beautiful, Responsive Design
              </h2>

              <p className="text-muted-foreground">
                All your integrations are displayed in a clean, modern card interface that looks great on any device. Each link button features smooth animations, hover effects, and is fully optimized for mobile viewing—ensuring your audience has the best experience no matter how they access your Linkroot page.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                Getting Started
              </h2>

              <p className="text-muted-foreground">
                Adding integrations to your Linkroot is simple:
              </p>

              <ol className="list-decimal list-inside space-y-3 text-muted-foreground my-6 ml-4">
                <li>Log in to your Linkroot dashboard</li>
                <li>Click "Add Link" to create a new connection</li>
                <li>Paste the URL of your profile or content</li>
                <li>Give it a title and watch as we automatically detect the platform</li>
                <li>Toggle links on/off anytime to control what's visible</li>
              </ol>

              <p className="text-muted-foreground">
                That's it! Your new link appears instantly on your Linkroot page with the perfect icon and styling.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                What's Next?
              </h2>

              <p className="text-muted-foreground">
                We're constantly expanding our integration library based on user feedback. Have a platform you'd love to see supported? Reach out to us on Twitter or GitHub—we'd love to hear from you.
              </p>

              <p className="text-muted-foreground">
                Our mission is to make Linkroot the most versatile and beautiful link-in-bio platform available. With our growing integration ecosystem, you'll never need to worry about whether your favorite platform is supported.
              </p>

              <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800/40 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-3">
                  Ready to connect your tools?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start building your Linkroot page today and experience the power of seamless integrations.
                </p>
                <Link 
                  href="/sign-up" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
                >
                  Get Started for Free
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

function IntegrationCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="p-6 bg-zinc-900/30 border border-zinc-800/40 rounded-xl hover:border-zinc-700/60 transition-colors">
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
