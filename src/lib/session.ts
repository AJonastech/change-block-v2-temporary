// lib/session.ts
import { SessionOptions } from 'iron-session';

export type SessionData = {
    user?: User
    refreshToken?: string;
    token?:string;
};

export const sessionOptions: SessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD as string,
    cookieName: 'cb_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};
