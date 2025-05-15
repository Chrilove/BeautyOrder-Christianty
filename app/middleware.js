// app/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the token from the request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || "your-super-secret-key-change-this-in-production" });

  // List of public paths that don't require authentication
  const publicPaths = ['/', '/login'];
  
  // Check if the path is public or requires auth
  const isPublicPath = publicPaths.includes(pathname);
  
  // If the path is public and the user is logged in, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If the path requires auth and the user is not logged in, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Allow the request to continue
  return NextResponse.next();
}

// Configure the paths this middleware should run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
