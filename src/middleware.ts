// create a middleware that will ALWAYS redirect to the /on_hold page.

import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // check if the request coming from the /on_hold page
  if (request.nextUrl.pathname === "/on_hold") {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/on_hold", request.url));
}

export const config = {
  matcher: "/",
};
