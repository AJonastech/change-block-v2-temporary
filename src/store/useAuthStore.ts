// stores/authStore.js
import { refreshAccessToken } from '@/actions/authActions';
import { create} from 'zustand';


interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: ({ email, password }: { email: string, password: string }) => Promise<void>;
  signup: ({ name, email, password }: { name: string, email: string, password: string }) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      set({ user: data.user, accessToken: data.token.access_token, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  signup: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');
      set({ user: data.user, accessToken: data.token.access_token, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  logout: () => {
    // Clear cookies on logout
    document.cookie = 'refresh_token=; Max-Age=0; path=/; secure; SameSite=Strict';
    set({ user: null, accessToken: null });
  },
  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken, refreshAccessToken } = get();

      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include', // Include cookies
      });

      if (response.status === 401) {
        // Attempt to refresh the access token
        await refreshAccessToken();
        // Retry fetching the user data
        return get().fetchMe();
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch user data');
      set({ user: data.user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  refreshAccessToken: async () => {
    set({ isLoading: true, error: null });
    try {
      const tokens = await refreshAccessToken();
      set({ accessToken: tokens.access_token, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));
