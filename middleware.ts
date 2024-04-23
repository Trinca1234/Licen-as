import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

  const response = NextResponse.next();

  const url = new URL(request.url);

  if (url.pathname === '/login' || url.pathname.match(/^\/resetPassword\/\d+$/)) {
    return response;
  }

  const login = request.cookies.get("userData");

  if (!login) {
    return NextResponse.redirect(new URL('/login', request.url));
  } 

  const decodedCookie = JSON.parse(decodeURIComponent(login.value));

  try {

    if (!decodedCookie.user) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (decodedCookie.user.Activo === false) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/empresas', request.url));
  }

  return response;
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}