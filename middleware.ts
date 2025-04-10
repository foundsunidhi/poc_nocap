// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Handle /docs path to redirect to first category
  if (url.pathname === '/docs') {
    url.pathname = '/docs/getting-started';
    return NextResponse.redirect(url);
  }
  
  // Optional: Handle category path without a slug to show category overview
  const categoryMatch = /^\/docs\/([^\/]+)$/.exec(url.pathname);
  if (categoryMatch) {
    // This is already handled by the [category]/page.tsx
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/docs', '/docs/:path*'],
};