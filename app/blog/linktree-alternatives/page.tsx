"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Sparkles, ExternalLink } from "lucide-react";

export default function LinktreeAlternativesBlogPost() {
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
              March 25, 2026
            </time>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              7 Best Free Linktree Alternatives in 2026
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Linktree is everywhere. But is it actually the best option? We tried a bunch of link-in-bio tools so you don't have to.
            </p>
          </header>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-base leading-relaxed">
              <section>
                <p className="text-muted-foreground">
                  If you've been on Instagram or TikTok for more than five minutes, you've seen it. That one link in someone's bio that leads to a page full of other links. Linktree basically invented this whole category, and credit where it's due, they made something genuinely useful.
                </p>
                <p className="text-muted-foreground mt-4">
                  But here's the thing. Linktree's free plan is pretty limited. The themes are basic, the customization is locked behind a paywall, and honestly? Every Linktree page kind of looks the same. If you want something that actually represents <em>you</em>, there are way better options out there that won't cost you a dime.
                </p>
                <p className="text-muted-foreground mt-4">
                  We spent the last few weeks testing every free link-in-bio tool we could find. Here are the ones worth your time.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* 1. Linkroot */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  1. Linkroot (That's Us)
                </h2>
                <p className="text-muted-foreground">
                  Yeah, we're biased. But hear us out. Linkroot was built because we were frustrated with every other option on this list. We wanted something that looked premium out of the box, didn't charge you $5/month for a decent theme, and actually used modern tech like AI to help you set things up faster.
                </p>
                <p className="text-muted-foreground mt-4">
                  The free plan gives you unlimited links, a live phone preview while you edit, drag-and-drop reordering, and background themes. No watermark. No "upgrade to unlock this font." It just works.
                </p>

                <div className="my-6 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What we like:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>AI-powered setup that actually saves time</li>
                    <li>Clean, dark-mode design that looks expensive</li>
                    <li>Live preview as you edit</li>
                    <li>Free custom themes and backgrounds</li>
                    <li>Open source</li>
                  </ul>
                </div>

                <div className="my-4 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What could be better:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>Still fairly new, so the feature set is growing</li>
                    <li>Analytics are coming but not here yet</li>
                  </ul>
                </div>

                <p className="text-muted-foreground mt-4">
                  <span className="text-white font-semibold">Best for:</span> Creators who want a good-looking page without paying for it. If you care about aesthetics and you're tired of the generic Linktree look, give it a shot.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* 2. Bento */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  2. Bento
                </h2>
                <p className="text-muted-foreground">
                  Bento takes a different approach. Instead of a vertical list of links, you get a grid layout like little cards or tiles. Think of it like a personal homepage rather than a link list. It looks really nice if you take the time to set it up properly.
                </p>
                <p className="text-muted-foreground mt-4">
                  The free tier is generous. You get embed support for things like Spotify, YouTube, and maps. The downside is that it's more of a portfolio tool than a quick link-in-bio. If you just need five links for your Instagram, Bento might be overkill.
                </p>

                <div className="my-6 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What we like:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>Beautiful grid/card layout</li>
                    <li>Rich media embeds on free plan</li>
                    <li>Unique look that stands out</li>
                  </ul>
                </div>

                <p className="text-muted-foreground mt-4">
                  <span className="text-white font-semibold">Best for:</span> Designers, developers, and creatives who want more of a mini-portfolio vibe.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* 3. Bio.link */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  3. Bio.link
                </h2>
                <p className="text-muted-foreground">
                  Bio.link is probably the closest direct competitor to Linktree. Same concept, similar layout, but with a more generous free plan. You get more theme options, you can add a profile video, and the overall customization is just better without needing to pay.
                </p>
                <p className="text-muted-foreground mt-4">
                  It's straightforward. No learning curve. If you're switching from Linktree and want something familiar but slightly better, Bio.link is a solid pick. The only annoyance is that the editor feels a bit clunky compared to newer tools.
                </p>

                <div className="my-6 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What we like:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>Very familiar if you're coming from Linktree</li>
                    <li>More free themes than Linktree</li>
                    <li>Profile video support</li>
                  </ul>
                </div>

                <p className="text-muted-foreground mt-4">
                  <span className="text-white font-semibold">Best for:</span> People who want a Linktree-style page without paying for Linktree Pro.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* 4. Carrd */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  4. Carrd
                </h2>
                <p className="text-muted-foreground">
                  Carrd isn't technically a link-in-bio tool. It's a one-page website builder. But a lot of people use it as one because you can build basically anything with it. Want a minimal page with just your links? You can do that. Want a full landing page with sections, images, and forms? Also doable.
                </p>
                <p className="text-muted-foreground mt-4">
                  The free plan gives you 3 sites, which is actually pretty generous. The catch is you can't use custom domains on the free tier, and the templates can feel a bit dated. But if you know what you're doing, Carrd is incredibly flexible.
                </p>

                <div className="my-6 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What we like:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>Extremely flexible and customizable</li>
                    <li>3 free sites</li>
                    <li>Can be so much more than just links</li>
                  </ul>
                </div>

                <p className="text-muted-foreground mt-4">
                  <span className="text-white font-semibold">Best for:</span> People who want total control and don't mind spending 20 minutes setting things up.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* 5. Lnk.Bio */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  5. Lnk.Bio
                </h2>
                <p className="text-muted-foreground">
                  Lnk.Bio is dead simple, and sometimes that's exactly what you need. There's no fancy editor. You add links, pick a basic layout, and you're done. They actually have a "forever free" plan which doesn't gate basic features behind a paywall like most tools do.
                </p>
                <p className="text-muted-foreground mt-4">
                  The trade-off is obvious though. It's simple because it lacks features. The design options are minimal, there's no drag-and-drop, and the pages look pretty plain. But if you literally just need a list of links and nothing else, it does the job.
                </p>

                <div className="my-6 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What we like:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>Genuinely free forever plan</li>
                    <li>Takes about 2 minutes to set up</li>
                    <li>No nonsense, no bloat</li>
                  </ul>
                </div>

                <p className="text-muted-foreground mt-4">
                  <span className="text-white font-semibold">Best for:</span> People who want the absolute simplest option. No bells, no whistles.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* 6. Beacons */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  6. Beacons
                </h2>
                <p className="text-muted-foreground">
                  Beacons is trying to be everything at once. Link-in-bio, email collection, digital storefront, media kit builder. It's ambitious, and honestly a lot of the features are pretty good. Their free plan includes analytics which is rare in this space.
                </p>
                <p className="text-muted-foreground mt-4">
                  The downside? It can feel overwhelming. The editor has so many options that you might spend more time tweaking settings than actually sharing your links. And some of the monetization features feel a bit pushy for what's supposed to be a free tool.
                </p>

                <div className="my-6 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What we like:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>Free analytics</li>
                    <li>Built-in email collection</li>
                    <li>Tons of features for creators who sell stuff</li>
                  </ul>
                </div>

                <p className="text-muted-foreground mt-4">
                  <span className="text-white font-semibold">Best for:</span> Creators who sell products or want to build an email list alongside their link page.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* 7. Later (formerly Linkin.bio) */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  7. Later (Linkin.bio)
                </h2>
                <p className="text-muted-foreground">
                  Later is primarily a social media scheduling tool, but their Linkin.bio feature is actually decent as a standalone link page. The cool thing is it syncs with your Instagram feed so each post can link to a different URL. If your content strategy is Instagram-heavy, this integration is legitimately useful.
                </p>
                <p className="text-muted-foreground mt-4">
                  That said, the free plan is limited. You get basic link page functionality, but the Instagram sync and most of the good stuff requires a paid plan. It's worth trying if you already use Later for scheduling.
                </p>

                <div className="my-6 p-5 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
                  <p className="text-sm font-semibold text-white mb-2">What we like:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground ml-2">
                    <li>Instagram feed integration</li>
                    <li>Good if you already use Later</li>
                    <li>Clean, professional look</li>
                  </ul>
                </div>

                <p className="text-muted-foreground mt-4">
                  <span className="text-white font-semibold">Best for:</span> Instagram-focused creators who use Later for scheduling and want their link page to match their feed.
                </p>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* Comparison Table */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  Quick Comparison
                </h2>
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-sm text-left border border-zinc-800/60 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-zinc-900/60 border-b border-zinc-800/60">
                        <th className="px-4 py-3 text-white font-semibold">Tool</th>
                        <th className="px-4 py-3 text-white font-semibold">Free Themes</th>
                        <th className="px-4 py-3 text-white font-semibold">Analytics</th>
                        <th className="px-4 py-3 text-white font-semibold">Custom Domain</th>
                        <th className="px-4 py-3 text-white font-semibold">AI Features</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-zinc-800/40 bg-white/[0.02]">
                        <td className="px-4 py-3 text-white font-medium">Linkroot</td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Coming soon</td>
                        <td className="px-4 py-3">Pro</td>
                        <td className="px-4 py-3 text-white">Yes</td>
                      </tr>
                      <tr className="border-b border-zinc-800/40">
                        <td className="px-4 py-3 text-white font-medium">Bento</td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">No</td>
                      </tr>
                      <tr className="border-b border-zinc-800/40 bg-white/[0.02]">
                        <td className="px-4 py-3 text-white font-medium">Bio.link</td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Basic</td>
                        <td className="px-4 py-3">Paid</td>
                        <td className="px-4 py-3">No</td>
                      </tr>
                      <tr className="border-b border-zinc-800/40">
                        <td className="px-4 py-3 text-white font-medium">Carrd</td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">Paid</td>
                        <td className="px-4 py-3">No</td>
                      </tr>
                      <tr className="border-b border-zinc-800/40 bg-white/[0.02]">
                        <td className="px-4 py-3 text-white font-medium">Lnk.Bio</td>
                        <td className="px-4 py-3">Limited</td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">Paid</td>
                        <td className="px-4 py-3">No</td>
                      </tr>
                      <tr className="border-b border-zinc-800/40">
                        <td className="px-4 py-3 text-white font-medium">Beacons</td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Paid</td>
                        <td className="px-4 py-3">No</td>
                      </tr>
                      <tr className="border-b border-zinc-800/40 bg-white/[0.02]">
                        <td className="px-4 py-3 text-white font-medium">Later</td>
                        <td className="px-4 py-3">Limited</td>
                        <td className="px-4 py-3">Paid</td>
                        <td className="px-4 py-3">Paid</td>
                        <td className="px-4 py-3">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <FullWidthDivider className="opacity-10" />

              {/* Final thoughts */}
              <section>
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                  So Which One Should You Pick?
                </h2>
                <p className="text-muted-foreground">
                  Honestly, it depends on what you need. If you want something dead simple, go with Lnk.Bio. If you want a portfolio-style page, try Bento. If you want to sell stuff, Beacons is solid.
                </p>
                <p className="text-muted-foreground mt-4">
                  But if you want a link-in-bio page that looks genuinely good on day one with zero design effort, and you don't want to pay $5-10/month just for decent themes, we'd obviously recommend giving Linkroot a try. It's free, it's open source, and we're building it specifically for people who are tired of the cookie-cutter Linktree look.
                </p>
                <p className="text-muted-foreground mt-4">
                  At the end of the day, the best tool is the one you actually use. Try a couple from this list, see which one clicks, and go with that. Your audience cares way more about your content than which link-in-bio tool you use.
                </p>
              </section>

              {/* CTA */}
              <div className="mt-16 p-8 bg-zinc-900/50 border border-zinc-800/40 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="size-24 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                  Want to try Linkroot?
                </h3>
                <p className="text-muted-foreground mb-6 relative z-10 max-w-md">
                  Set up your page in under a minute. No credit card, no catches. Just a clean link page that actually looks good.
                </p>
                <Link 
                  href="/sign-up" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-lg relative z-10"
                >
                  Create Your Free Page
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
