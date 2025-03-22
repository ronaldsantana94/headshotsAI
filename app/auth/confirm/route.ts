// app/auth/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EmailOtpType } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");

  const supabase = createRouteHandlerClient({ cookies });

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ 
      token_hash, 
      type: type as EmailOtpType
    });

    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/overview`);
    } else {
      console.error("OTP Verification Error:", error);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth`);
    }
  }

  // If params missing, redirect to login with error.
  return NextResponse.redirect(`${requestUrl.origin}/login?error=missing_params`);
}