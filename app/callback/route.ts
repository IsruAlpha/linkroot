import { handleAuth } from '@workos-inc/authkit-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const returnTo = cookieStore.get('returnTo')?.value || '/dashboard';
  cookieStore.delete('returnTo');

  const handler = handleAuth({ returnPathname: returnTo });
  return handler(request);
}
