"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Scale, Mail } from "lucide-react";

export default function PrivacyPage() {
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
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <header className="mb-12">
            <time className="text-sm text-muted-foreground font-mono uppercase tracking-wider mb-4 block">
              Updated: March 12, 2026
            </time>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Privacy Policy & Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We value your privacy and are committed to being transparent about how we handle your data and the terms of using Linkroot.
            </p>
          </header>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-6 text-base leading-relaxed">
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white mb-2">
                    <ShieldCheck className="size-6 text-zinc-400" />
                    <h2 className="text-2xl font-bold m-0">Privacy Policy</h2>
                </div>
                <p className="text-muted-foreground">
                  At Linkroot, we take your privacy seriously. This policy outlines how we collect, use, and protect your information when you use our services.
                </p>
                
                <h3 className="text-xl font-semibold text-white mt-8 mb-4">Information We Collect</h3>
                <p className="text-muted-foreground">
                    We collect minimal information necessary to provide our services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Account information (email, name) provided during sign-up.</li>
                  <li>Profile data you choose to share (links, social media handles, biography).</li>
                  <li>Usage data to help us improve the platform experience.</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-8 mb-4">How We Use Your Data</h3>
                <p className="text-muted-foreground">
                    Your data is used to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Personalize and maintain your public Linkroot profile.</li>
                  <li>Communicate important updates regarding your account.</li>
                  <li>Analyze platform performance and prevent fraudulent activity.</li>
                </ul>
              </section>

              <FullWidthDivider className="my-12 opacity-30" />

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white mb-2">
                    <Scale className="size-6 text-zinc-400" />
                    <h2 className="text-2xl font-bold m-0">Terms of Service</h2>
                </div>
                <p className="text-muted-foreground">
                  By using Linkroot, you agree to comply with the following terms and conditions.
                </p>

                <h3 className="text-xl font-semibold text-white mt-8 mb-4">Acceptable Use</h3>
                <p className="text-muted-foreground">
                    You are responsible for all content posted on your Linkroot profile. We prohibit:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Posting illegal, harmful, or copyright-infringing content.</li>
                  <li>Using the platform for spam or malicious activities.</li>
                  <li>Impersonating others or misrepresenting your identity.</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-8 mb-4">Intellectual Property</h3>
                <p className="text-muted-foreground">
                    You retain ownership of the content you post. However, by using Linkroot, you grant us a license to host and display your profile data as part of our service.
                </p>
              </section>

              <FullWidthDivider className="my-12 opacity-30" />

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white mb-2">
                    <Mail className="size-6 text-zinc-400" />
                    <h2 className="text-2xl font-bold m-0">Contact Us</h2>
                </div>
                <p className="text-muted-foreground">
                    If you have any questions about these policies or our terms, please don't hesitate to reach out.
                </p>
                <div className="mt-8 p-6 bg-zinc-900/50 border border-zinc-800/40 rounded-xl">
                  <p className="text-muted-foreground mb-4">
                    For privacy-related inquiries or support, please contact us at:
                  </p>
                  <a 
                    href="mailto:israelfirew7@gmail.com" 
                    className="text-white font-semibold hover:underline"
                  >
                    israelfirew7@gmail.com
                  </a>
                </div>
              </section>
            </div>
          </div>
        </article>
        <FullWidthDivider />
        <Footer />
      </main>
    </div>
  );
}
