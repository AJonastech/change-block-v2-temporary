// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(req:Request) {
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

  const responseData = NextResponse.json({ user: data.user, token: data.token }, { status: 200 });
cookies().set('refresh_token', data.token.refresh_token, { httpOnly: true, secure: true, sameSite: 'strict' });

  return responseData;
}

export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: 'POST',
    },
  });
}
