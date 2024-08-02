// app/middleware.js or pages/middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function middleware(req:NextRequest) {
//This code will help us get the refresh token from the cookies
const refreshToken = cookies().get('refresh_token')?.value;
//Now in the case that the refreswh token is null, means the user is not authenticated and should be redirected to the login page
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config ={
    matcher: ['/internal-tools/:path*', '/empa/:path*', "/"]
}