import { Metadata } from 'next';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { PublicProfileClient } from "./PublicProfileClient";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await fetchQuery(api.users.getUserByUsername, { username });

  if (!user) {
    return {
      title: 'Profile Not Found | Linkroot',
    };
  }

  const title = `${user.name || user.username}'s Linkroot`;
  const description = user.bio || `Check out ${user.name || user.username}'s links on Linkroot.`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://linkroot.space';
  const ogImageUrl = `${baseUrl}/api/og/${username}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://linkroot.space/${username}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;
  return <PublicProfileClient username={username} />;
}
