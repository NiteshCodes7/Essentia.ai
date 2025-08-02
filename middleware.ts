import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify-otp",
  ];

  const isPublic = publicPaths.includes(path) || path.startsWith("/public");

  const token = request.cookies.get("session")?.value;

  if (token && ["/sign-in", "/sign-up", "/verify-otp"].includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
