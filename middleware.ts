import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const url = new URL(request.url);

  if (url.pathname === '/login') {
    return response;
  }

  const login = request.cookies.get("userData");
  if (!login) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}