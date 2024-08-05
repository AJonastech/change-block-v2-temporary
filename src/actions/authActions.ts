'use server'
import { headers } from 'next/headers';
import { getServerSession } from '@/lib/getServerSession';

export async function refreshAccessToken() {

    try {
        const session = await getServerSession();
        const refresh_token = session?.refreshToken
        if (!refresh_token) {
            throw new Error('Refresh token not found');
        }

        const response = await fetch(`${process.env.CB_AUTH_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ refresh_token }),

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to refresh access token');
        }


    } catch (err) {
        console.error('Error refreshing access token: tHIS IS THE ERROR', err);
        throw err;
    }
}



  export async function signup(name: string, email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
  
      // Handle signup response
      return data;
    } catch (err) {
      console.error('Error signing up:', err);
      throw err;
    }
  }
  
