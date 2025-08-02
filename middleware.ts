import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAuthPage = 
    path === "/sign-in" || 
    path === "/sign-up" || 
    path === "/verify-otp";

  const isPublicAsset = path.startsWith("/public");
  
  const token = request.cookies.get("session")?.value;

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthPage || isPublicAsset) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ✅ Allow access to protected routes if logged in
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
