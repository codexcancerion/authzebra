import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/' || path === '/forgotpassword/authzebra' || path === '/forgotpassword/authzebra/[id]' || path === '/forgotpassword';

  const token = request.cookies.get('token')?.value || '';

  // Logging for debugging purposes
  console.log(`Path: ${path}, Token: ${token}`);

  // Redirect if the user is authenticated and tries to access public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));  // Redirect to dashboard if already logged in
  }

  // Redirect if the user is not authenticated and tries to access protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));  // Redirect to login if not authenticated
  }

  return NextResponse.next();  // Proceed if neither condition is met
}

// Configuration for matching paths
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/delete',
    '/profile/edit',
    '/dashboard',
    '/forgotpassword',
    '/forgotpassword/authzebra',
  ],
};
