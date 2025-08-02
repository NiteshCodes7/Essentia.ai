import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = 
    path === "/sign-in" || 
    path === "/sign-up" || 
    path === "/verify-otp" || 
    path.startsWith("/public");

  const token = request.cookies.get("session")?.value;

  if (token && (path === "/sign-in" || path === "/sign-up" || path === "/verify-otp")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
