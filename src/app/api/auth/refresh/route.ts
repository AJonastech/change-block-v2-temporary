// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.refreshToken) {
    return NextResponse.json({ message: 'Refresh token not found' }, { status: 401 });
  }

  const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: session.refreshToken }),
  });

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ message: data.message }, { status: response.status });
  }


  session.refreshToken = data.refresh_token; // Update refresh token in the session
  await session.save();

  return NextResponse.json({ token: data.token }, { status: 200 });
}
