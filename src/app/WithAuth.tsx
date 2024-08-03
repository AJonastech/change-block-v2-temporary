"use client"
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthHOC: React.FC = (props) => {
        const router = useRouter();
        const { accessToken, user, refreshAccessToken, isLoading, fetchMe, error } = useAuthStore();
        const [isInitialized, setIsInitialized] = useState(false);

  
        //This function will handle the authentication checks for the user
        useLayoutEffect(() => {
            const checkAuth = async () => {
                try {
                    if (!accessToken) {
                        await refreshAccessToken();
                    }
                 
                    if(!user){
                        fetchMe()
                    }
                    setIsInitialized(true);
                } catch (err) {
                    console.error('Error refreshing access token:', err);
                    router.push('/login');
                }
            };

            checkAuth();
        }, [refreshAccessToken, router]);



        useEffect(() => {
            if (isInitialized && !accessToken ) {
                router.push('/login');
            } 
        }, [accessToken, isInitialized, router]);

        if (isLoading || !isInitialized) {
            return <div>
                This is the loading state
            </div>;
        }

        if (error) {
            router.push('/login')
        }

        return <WrappedComponent {...props} />;
    };

    return AuthHOC;
};

export default withAuth;
