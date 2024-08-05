// app/middleware.js or pages/middleware.js
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from './lib/getServerSession';
import { headers } from 'next/headers';
import { refreshAccessToken } from './actions/authActions';

export async function middleware(req: NextRequest) {
    console.log("Here is my file")
    const url = req.nextUrl.clone();
    const session = await getServerSession();
    const refreshToken = session?.refreshToken;

    if (!refreshToken || !session.user) {
        // Redirect to login if refresh token is not present
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Attempt to refresh the access token
    try {
      await refreshAccessToken()
    } catch (error) {
        // Redirect to login if token refresh fails
        console.error('Error refreshing access token: here', error);
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/internal-tools',                // Protect the root route
        '/', // Protect all routes under /internal-tool/,
        '/EMPA/:path*' // Protect all routes under /internal-tool/,
    ],
};
