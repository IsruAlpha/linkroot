import { redirect } from 'next/navigation';
import { getSignUpUrl } from '@workos-inc/authkit-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const returnTo = request.nextUrl.searchParams.get('redirect');
  if (returnTo) {
    const cookieStore = await cookies();
    cookieStore.set('returnTo', returnTo, { path: '/', maxAge: 300 });
  }
  const authorizationUrl = await getSignUpUrl();
  return redirect(authorizationUrl);
}
