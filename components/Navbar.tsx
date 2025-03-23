import { AvatarIcon } from "@radix-ui/react-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import { Database } from "@/types/supabase";
import ClientSideCredits from "./realtime/ClientSideCredits";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

export const dynamic = "force-dynamic";

const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";
const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export const revalidate = 0;

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: credits } = await supabase
    .from("credits")
    .select("*")
    .eq("user_id", user?.id ?? "")
    .single();

  return (
    <div className="w-full px-4 lg:px-40 py-4 flex items-center justify-between gap-8 border-b border-border bg-background shadow-sm text-foreground dark:border-neutral-800">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="HeadshotsAI Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-bold text-lg">HeadshotsAI</span>
        </Link>
      </div>

      {user && (
        <div className="hidden lg:flex flex-row gap-2">
          <Link href="/overview">
            <Button variant={"ghost"}>Home</Button>
          </Link>
          {packsIsEnabled && (
            <Link href="/overview/packs">
              <Button variant={"ghost"}>Models</Button>
            </Link>
          )}
          {stripeIsConfigured && (
  <div className="flex lg:hidden">
    <Link href="/get-credits">
      <Button size="sm" variant="outline" className="text-xs">
        Get Credits
      </Button>
    </Link>
  </div>
)}
        </div>
      )}

      <div className="flex gap-4 lg:ml-auto items-center">
        <ThemeToggle />

        {!user && (
          <Link href="/login">
            <Button variant={"ghost"}>Login / Signup</Button>
          </Link>
        )}

        {user && (
          <div className="flex flex-row gap-4 text-center align-middle justify-center">
            {stripeIsConfigured && (
              <ClientSideCredits creditsRow={credits ? credits : null} />
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <AvatarIcon height={24} width={24} className="text-primary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form action="/auth/sign-out" method="post">
                  <Button
                    type="submit"
                    className="w-full text-left"
                    variant={"ghost"}
                  >
                    Log out
                  </Button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}