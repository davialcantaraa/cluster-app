"use client";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Database } from "~/types/database";

type AuthenticationContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<AuthenticationContext | undefined>(undefined);

export function AutheticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useAuthentication = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used inside AutheticationProvider"
    );
  }

  return context;
};
