// app/auth/callback/route.ts

import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/overview";

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] Error exchanging code:", error.message);
      return NextResponse.redirect(`${requestUrl.origin}/login/failed?err=AuthApiError`);
    }

    // Optional: Check/Create user-related resources like credits or flags here
  } else {
    console.error("[auth/callback] Missing code in callback");
    return NextResponse.redirect(`${requestUrl.origin}/login/failed?err=missing_code`);
  }

  return NextResponse.redirect(`${requestUrl.origin}${next}`);
}