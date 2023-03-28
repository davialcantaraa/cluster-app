import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  type Session,
} from "@supabase/auth-helpers-react";
import { Inter } from "next/font/google";
import { ReactElement, useState } from "react";
import { Toaster } from "sonner";
import "~/styles/globals.css";
import type { AppPropsWithLayout } from "~/types/global";
import { api } from "~/utils/api";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// const roboto_mono = Roboto_Mono({
//   subsets: ["latin"],
//   variable: "--font-roboto-mono",
//   display: "swap",
// });

const MyApp = ({
  Component,
  pageProps,
}: AppPropsWithLayout<{
  initialSession: Session;
}>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Toaster richColors />
      {getLayout(<Component {...pageProps} />)}
    </SessionContextProvider>
  );
};

export default api.withTRPC(MyApp);
