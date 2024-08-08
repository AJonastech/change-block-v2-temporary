import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getServerSession } from '@/lib/getServerSession';

export const useInitializeAuth = () => {
  const { setUser, setIsLoading, setAccessToken } = useAuthStore();

  useEffect(() => {

    const fetchSession = async () => {
      try {

        setIsLoading(true);
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const sessionData = await response.json();
          setUser(sessionData.user);
          setAccessToken(sessionData.token);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [setUser, setIsLoading]);
};
