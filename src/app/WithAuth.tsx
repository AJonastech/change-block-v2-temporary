"use client";

import React, { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import LoadingSpinner from '@/components/LoadingSpinner';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthHOC: React.FC = (props) => {
        const router = useRouter();
        const { accessToken, user, refreshAccessToken, isLoading, fetchMe, isAuthenticated } = useAuthStore();
        const [isInitialized, setIsInitialized] = useState(false);


        const checkAuth = async () => {
            try {
                if (!accessToken) {
                    await refreshAccessToken();
                }
                if (!user) {
                    await fetchMe();
                }
                setIsInitialized(true);
            } catch (err) {
                console.error('Error refreshing access token:', err);
                setIsInitialized(true);
            }
        };
        // Handle authentication checks
        useLayoutEffect(() => {
        

            checkAuth();
            // run checkAuth every focus changes
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
        }, [refreshAccessToken, fetchMe]);

        // Redirect to login if not authenticated
        useLayoutEffect(() => {
            if (isInitialized && !isAuthenticated) {
                router.push('/login');
                return
            }
        }, [isAuthenticated, isInitialized, router]);

        // Display loading spinner until initialization is complete
        if (isLoading || !isInitialized) {
            return <LoadingSpinner />;
        }

      if (!isLoading && isAuthenticated)  return <WrappedComponent {...props} />;
    };

    return AuthHOC;
};

export default withAuth;
