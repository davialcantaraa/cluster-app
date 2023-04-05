import { supabase } from "~/services/supabase";

export async function updateDocumentTitle(title: string, document_id: string) {
  await supabase
    .from("documents")
    .update({ updated_at: new Date(), title })
    .eq("id", document_id);
}
