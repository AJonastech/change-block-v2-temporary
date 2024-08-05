// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST() {
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
