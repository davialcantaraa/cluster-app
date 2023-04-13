import { supabaseBrowser } from "~/services/supabase-browser-client";

export async function createDocument(user_id: string) {
  const { error, data } = await supabaseBrowser
    .from("documents")
    .insert({ user_id, updated_at: new Date() })
    .select();
  if (error) throw error;
  return data[0];
}
