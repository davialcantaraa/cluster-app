import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { ReactElement } from "react";
import { AppLayout } from "~/layouts/app-layout";
import { supabase } from "~/services/supabase";
import type { NextPageWithLayout } from "~/types/global";

const AppPage: NextPageWithLayout = () => {
  return (
    <main className="flex justify-center">
      <div className="min-w-4xl max-w-4xl"></div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const history = cookies["@cluster:history"];

  if (history) {
    const isValidHistory = history?.length > 25 ? true : false;
    if (isValidHistory) {
      return {
        redirect: {
          destination: history,
          permanent: false,
        },
      };
    }
  }

  const supabaseServerClient = createServerSupabaseClient(ctx);
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const currentUrl = ctx.req.url!;
  const { data: hasDocuments } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id);

  if (!hasDocuments?.length) {
    const { data: createdDocument } = await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        content: "",
        updated_at: new Date(),
      })
      .select();

    nookies.set(
      ctx,
      "@cluster:history",
      currentUrl + "/" + createdDocument[0].id
    );

    return {
      redirect: {
        destination: "/app/" + createdDocument[0].id,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/app",
      permanent: false,
    },
  };
};

AppPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default AppPage;
