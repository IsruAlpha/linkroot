'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ConvexReactClient, useMutation, useQuery } from 'convex/react';
import { ConvexProviderWithAuth } from 'convex/react';
import { AuthKitProvider, useAuth, useAccessToken } from '@workos-inc/authkit-nextjs/components';
import { api } from '@/convex/_generated/api';

export function ConvexClientProvider({
  expectAuth,
  children,
}: {
  expectAuth: boolean;
  children: ReactNode;
}) {
  const [convex] = useState(() => {
    return new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, { expectAuth });
  });
  return (
    <AuthKitProvider>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromAuthKit}>
        <EmailSync />
        {children}
      </ConvexProviderWithAuth>
    </AuthKitProvider>
  );
}

function EmailSync() {
  const { user } = useAuth();
  const convexUser = useQuery(api.users.getMe);
  const syncEmail = useMutation(api.users.syncEmail);

  useEffect(() => {
    if (user?.email && convexUser && !convexUser.email) {
      syncEmail({ email: user.email }).catch(console.error);
    }
  }, [user?.email, convexUser, syncEmail]);

  return null;
}

function useAuthFromAuthKit() {
  const { user, loading: isLoading } = useAuth();
  const { getAccessToken, refresh } = useAccessToken();

  const isAuthenticated = !!user;

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken?: boolean } = {}): Promise<string | null> => {
      if (!user) {
        return null;
      }

      try {
        if (forceRefreshToken) {
          return (await refresh()) ?? null;
        }

        return (await getAccessToken()) ?? null;
      } catch (error) {
        console.error('Failed to get access token:', error);
        return null;
      }
    },
    [user, refresh, getAccessToken],
  );

  return {
    isLoading,
    isAuthenticated,
    fetchAccessToken,
  };
}
