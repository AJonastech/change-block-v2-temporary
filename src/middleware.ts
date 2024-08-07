import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from './lib/getServerSession';
import { headers } from 'next/headers';
import { refreshAccessToken } from './actions/authActions';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    
    // Redirect root route "/" to "/EMPA"
    if (url.pathname === '/') {
        url.pathname = '/EMPA';
        return NextResponse.redirect(url);
    }

    console.log("Here is my file");
    
    const session = await getServerSession();
    const refreshToken = session?.refreshToken;

    if (!refreshToken || !session.user) {
        // Redirect to login if refresh token is not present
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
    
    // Attempt to refresh the access token
    // try {
    //   await refreshAccessToken()
    // } catch (error) {
    //     // Redirect to login if token refresh fails
    //     console.error('Error refreshing access token: here', error);
    //     url.pathname = '/login';
    //     return NextResponse.redirect(url);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/internal-tools', // Protect the internal-tools route
        '/',               // Protect the root route
        '/EMPA/:path*'     // Protect all routes under /EMPA/
    ],
};