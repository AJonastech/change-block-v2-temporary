// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';


export async function POST(req: Request) {
  const { email, password } = await req.json();
  const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ message: data.message }, { status: response.status });
  }

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.user = data.user;
  session.refreshToken = data.token.refresh_token; // Storing refresh token in the session
  await session.save();


  return NextResponse.json({ success:true}, { status: 200 });
}
