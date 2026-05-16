import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // If Supabase is not configured, skip auth checks (dev mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.next();
  }

  // Otherwise, refresh Supabase session
  const { updateSession } = await import("@/lib/supabase/middleware");
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
