import { signOut } from '@workos-inc/authkit-nextjs';

/** Origin users land on after WorkOS logout. Must match an allowed redirect URL in the WorkOS dashboard. */
function postLogoutOrigin(): string {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
    if (explicit) return explicit;
    if (process.env.VERCEL_ENV === 'production') return 'https://linkroot.space';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
}

export async function GET() {
    // signOut() ends the request with redirect(). It never returns; returnTo is required or WorkOS falls back to the OAuth app URL (often localhost).
    await signOut({ returnTo: `${postLogoutOrigin()}/` });
}
