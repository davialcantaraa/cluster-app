import { supabaseBrowser } from "~/services/supabase-browser-client";

export async function fetchDocuments(user_id: string) {
  const { data, error }: any = await supabaseBrowser
    .from("documents")
    .select("*")
    .eq("user_id", user_id);
  if (error) throw error;
  return data;
}
