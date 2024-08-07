import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    try {
        // Create a new URL object with the request URL
        const url = new URL(req.url);
        const code = url.searchParams.get('code');

        if (!code) {
            return NextResponse.json({ message: 'Code is required' }, { status: 400 });
        }

        // Fetch data from the backend using the code
        const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/google?code=${code}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ message: data.message }, { status: response.status });
        }

        // Get the Iron session and save user data and tokens
        const session = await getIronSession<SessionData>(cookies(), sessionOptions);
        session.user = data.user;
        session.token = data.token.access_token; // Storing access token in the session
        session.refreshToken = data.token.refresh_token; // Storing refresh token in the session
        await session.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error in /api/auth/google:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
