import type { Metadata } from 'next';
import { Geist, Geist_Mono, Outfit } from 'next/font/google';
import './globals.css';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { TooltipProvider } from '@/components/ui/tooltip';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://linkroot.space'),
  title: 'Linkroot — The AI Native Linktree App | Linktree Alternative',
  description:
    'Linkroot is the free, modern alternative to Linktree. Create a minimal, clean linktree page in minutes — share all your socials, content, and links from one customizable page.',
  keywords: [
    'link in bio',
    'linktree alternative',
    'bio link',
    'link page',
    'social media links',
    'linkroot',
    'one link',
    'creator tools',
  ],
  openGraph: {
    title: 'Linkroot — The Modern Link-in-Bio Platform',
    description:
      'Create a beautiful link-in-bio page in minutes. The free, modern Linktree alternative.',
    siteName: 'Linkroot',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Linkroot — The Modern Link-in-Bio Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linkroot — The Modern Link-in-Bio Platform',
    description:
      'Create a beautiful link-in-bio page in minutes. The free, modern Linktree alternative.',
    images: ['/og-image.png'],
  },
};

import { Toaster } from 'sonner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { accessToken } = await withAuth();
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable} ${outfit.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="de4dac41-519f-4a08-9ede-39bc777b2ce0"
          strategy="afterInteractive"
        />
        <TooltipProvider>
          <Toaster position="top-center" theme="dark" closeButton />
          <ConvexClientProvider expectAuth={!!accessToken}>{children}</ConvexClientProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
