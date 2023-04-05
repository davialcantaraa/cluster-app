import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { useInputDelay } from "~/hooks/use-input-delay";
import { fetchDocuments } from "~/server/fetch-documents";
import { updateDocumentTitle } from "~/server/update-document-title";
import { queryClient } from "~/services/react-query";
import { supabase } from "~/services/supabase";
import { IDocument } from "~/types/document";

export const useDocument = (incomingDocument?: IDocument) => {
  const { documentsFileTree, setDocumentsFileTree } =
    useContext(DocumentContext);

  const user = useUser();
  const { inputValue: documentInputValue, handleInputChange } = useInputDelay(
    1500,
    () => handleUpdateDocumentInDatabase(documentInputValue)
  );
  const {
    inputValue: documentTitleValue,
    handleInputChange: handleTitleChange,
  } = useInputDelay(1500, () => handleUpdateDocumentTitle(documentTitleValue));

  async function handleUpdateDocumentTitle(title: string) {
    if (!incomingDocument) throw new Error("please provide a document");
    updateDocumentTitle(title, incomingDocument.id);
    queryClient.invalidateQueries(["fetch-documents"]);
  }

  async function handleUpdateDocumentInDatabase(content: string) {
    if (!incomingDocument) throw new Error("please provide a document");
    await supabase
      .from("documents")
      .update({ content, updated_at: new Date() })
      .eq("id", incomingDocument.id);
  }

  const { data: documents } = useQuery({
    queryKey: ["fetch-documents"],
    queryFn: () => fetchDocuments(user?.id!),
    onSuccess: (data) => {
      setDocumentsFileTree(
        data.map((item: IDocument) => ({
          id: item.id,
          name: item.title,
        }))
      );
    },
    enabled: !!user,
  });

  return {
    documentTitleValue,
    documentInputValue,
    handleUpdateDocumentInDatabase,
    handleUpdateDocumentTitle,
    handleInputChange,
    handleTitleChange,
    documents,
    documentsFileTree,
  };
};

interface IDocumentContext {
  documents: IDocument[];
  documentsFileTree: any;
  setDocumentsFileTree: any;
  setDocuments: any;
}

export const DocumentContext = createContext({} as IDocumentContext);

export const DocumentProvider = ({ children }: PropsWithChildren) => {
  const [documents, setDocuments] = useState([]);
  const [documentsFileTree, setDocumentsFileTree] = useState<any>([]);

  const value = useMemo(
    () => ({
      documents,
      documentsFileTree,
      setDocumentsFileTree,
      setDocuments,
    }),
    [documents, documentsFileTree, setDocumentsFileTree, setDocuments]
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
