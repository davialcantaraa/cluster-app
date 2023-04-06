import { supabase } from "~/services/supabase";

export async function createDocument(user_id: string) {
  const { error, data } = await supabase
    .from("documents")
    .insert({ user_id, updated_at: new Date() })
    .select();
  if (error) throw error;
  return data[0];
}
