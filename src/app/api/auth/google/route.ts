import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const { code } = await req.json();

    const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ message: data.error_description }, { status: response.status });
    }

    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.user = data.id_token; // You may want to parse and store the user information from the id_token
    session.token = data.access_token; // Storing access token in the session
    session.refreshToken = data.refresh_token; // Storing refresh token in the session
    await session.save();

    return NextResponse.json({ success: true }, { status: 200 });
}
