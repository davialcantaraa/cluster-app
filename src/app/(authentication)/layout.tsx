"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Toaster } from "sonner";
import { supabaseBrowser } from "~/services/supabase";
import { LayoutProps } from "~/types/global";

export default function AuthenticationLayout({ children }: LayoutProps) {
  return (
    <SessionContextProvider supabaseClient={supabaseBrowser}>
      <Toaster richColors />
      <div className="min-h-screen">{children}</div>
    </SessionContextProvider>
  );
}
