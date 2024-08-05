// lib/getServerSession.ts
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';

export async function getServerSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}
