// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  const { email, password, full_name } = await req.json();

  const response = await fetch(`${process.env.BACKEND_URL}/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ message: data.message }, { status: response.status });
  }

  return NextResponse.json({ user: data.user, token: data.token }, { status: 200 });
}

export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: 'POST',
    },
  });
}
