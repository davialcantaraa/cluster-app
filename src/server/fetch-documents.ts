import { supabase } from "~/services/supabase";

export async function fetchDocuments(user_id: string) {
  const { data, error }: any = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user_id);
  if (error) throw error;
  return data;
}
