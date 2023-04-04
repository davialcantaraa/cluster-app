import { useUser } from "@supabase/auth-helpers-react";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useInputDelay } from "~/hooks/use-input-delay";
import { supabase } from "~/services/supabase";
import { IDocument } from "~/types/document";

interface IDocumentContext {
  handleCreateDocumentInDatabase: (arg0: string) => Promise<void>;
  documentInputValue: string;
  handleDocumentInputChange: (arg0: string) => void;
  handleUpdateDocumentInDatabase(arg0: IDocument): Promise<void>;
}

const DocumentContext = createContext({} as IDocumentContext);

export const DocumentProvider = ({ children }: PropsWithChildren) => {
  const user = useUser();

  const {
    inputValue: documentInputValue,
    handleInputChange: handleDocumentInputChange,
  } = useInputDelay(1500);

  async function handleCreateDocumentInDatabase(html: string) {
    await supabase
      .from("documents")
      .insert({ user_id: user?.id, content: html, updated_at: new Date() });
  }

  async function handleUpdateDocumentInDatabase(document: IDocument) {
    await supabase
      .from("document")
      .update({ content: document.content, updated_at: document.updated_at })
      .eq("id", document.id);
  }

  const value = useMemo(
    () => ({
      handleCreateDocumentInDatabase,
      documentInputValue,
      handleDocumentInputChange,
      handleUpdateDocumentInDatabase,
    }),
    [
      handleCreateDocumentInDatabase,
      documentInputValue,
      handleDocumentInputChange,
      handleUpdateDocumentInDatabase,
    ]
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentProvider = () => {
  const {} = useContext(DocumentContext);
  return {};
};
