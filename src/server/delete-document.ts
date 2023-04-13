import { supabaseBrowser } from "~/services/supabase-browser-client";

export async function deleteDocument(user_id: string, document_id: string) {
  const { data, error }: any = await supabaseBrowser
    .from("documents")
    .delete()
    .match({ user_id: user_id, id: document_id });
  if (error) throw error;
  return data;
}
