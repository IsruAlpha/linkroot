import { NextResponse } from 'next/server';
import { signOut } from '@workos-inc/authkit-nextjs';

export async function GET() {
    await signOut();
    return NextResponse.redirect('https://linkroot.space');
}
