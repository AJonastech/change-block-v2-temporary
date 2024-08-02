// app/api/auth/me/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req:Request) {
  const accessToken = req.headers.get('authorization')?.split(' ')[1];
  const refreshToken = cookies().get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Failed to fetch user data' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json({ user: data.user, access_token: accessToken }, { status: 200 });
}

export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: 'GET',
    },
  });
}
