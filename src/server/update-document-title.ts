import { supabaseBrowser } from "~/services/supabase-browser-client";

export async function updateDocumentTitle(title: string, document_id: string) {
  await supabaseBrowser
    .from("documents")
    .update({ updated_at: new Date(), title })
    .eq("id", document_id);
}
