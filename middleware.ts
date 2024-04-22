import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import queryString from 'query-string';
import { getUserByEmail } from './lib/dbUtility';
import { parse } from "cookie";

export async function middleware(request: NextRequest) {
  console.log("ativado");

  const response = NextResponse.next();

  const url = new URL(request.url);

  if (url.pathname === '/login' || url.pathname === "/resetPassword") {
    return response;
  }

  /* const login = request.cookies.get("userData");

  if (!login) {
    return NextResponse.redirect(new URL('/login', request.url));
  } */

  /* const decodedCookie = JSON.parse(decodeURIComponent(login.value));

  try {
    const user = await getUserByEmail(decodedCookie.user.EMail);
    console.log(user);

    if (!user) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (user.Activo === false) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/empresas', request.url));
  } */

  return response;
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}