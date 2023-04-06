import { supabase } from "~/services/supabase";

export async function deleteDocument(user_id: string, document_id: string) {
  const { data, error }: any = await supabase
    .from("documents")
    .delete()
    .match({ user_id: user_id, id: document_id });
  if (error) throw error;
  return data;
}
