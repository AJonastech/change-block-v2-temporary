'use server';

import { cookies } from 'next/headers';

export async function refreshAccessToken() {
    try {
        const cookieStore = cookies();
        const refresh_token = cookieStore.get('refresh_token')?.value;

        if (!refresh_token) {
            throw new Error('Refresh token not found');
        }

        const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw new Error(refreshedTokens.message || 'Failed to refresh access token');
        }

        // Set the new refresh token as an HTTP-only cookie
        cookieStore.set({
            name: 'refresh_token',
            value: refreshedTokens.refresh_token,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });

        return {
            access_token: refreshedTokens.access_token as string,
        };
    } catch (err) {
        console.error('Error refreshing access token:', err);
        throw err;
    }
}
