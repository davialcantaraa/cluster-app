import { useUser } from "@supabase/auth-helpers-react";
import { useInputDelay } from "~/hooks/use-input-delay";
import { supabase } from "~/services/supabase";
import { IDocument } from "~/types/document";

export const useDocument = (incomingDocument: IDocument) => {
  const user = useUser();

  async function handleCreateDocumentInDatabase(html: string) {
    await supabase
      .from("documents")
      .insert({ user_id: user?.id, content: html, updated_at: new Date() });
  }

  const {
    inputValue: documentInputValue,
    handleInputChange: handleDocumentInputChange,
  } = useInputDelay(1500, () =>
    handleUpdateDocumentInDatabase(incomingDocument.id!, documentInputValue)
  );

  async function handleUpdateDocumentInDatabase(
    document_id: string,
    content: string
  ) {
    const { data } = await supabase
      .from("documents")
      .update({ content, updated_at: new Date() })
      .eq("id", document_id);
    console.log(data);
  }

  return {
    handleCreateDocumentInDatabase,
    documentInputValue,
    handleDocumentInputChange,
    handleUpdateDocumentInDatabase,
  };
};
