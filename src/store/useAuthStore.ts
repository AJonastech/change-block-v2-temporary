import { create } from 'zustand';

interface AuthState {
  user: User | null;
  accessToken: string | null;

  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;

}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
  // fetchMe: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await fetch('/api/auth/me', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accessToken}`,
  //       },
  //       credentials: 'include', // Include cookies
  //     });

  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message || 'Failed to fetch user data');
  //     set({ user: data.user, isAuthenticated: true, isLoading: false });
  //   } catch (error: any) {
  //     set({ error: error.message, isLoading: false });
  //   }
  // },
}));


