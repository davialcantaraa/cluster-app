import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounceFn } from "ahooks";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInputDelay } from "~/hooks/use-input-delay";
import { createDocument } from "~/server/create-document";
import { fetchDocuments } from "~/server/fetch-documents";
import { updateDocumentTitle } from "~/server/update-document-title";
import { queryClient } from "~/services/react-query";
import { supabase } from "~/services/supabase";
import { IDocument } from "~/types/document";
import { useWindowProvider } from "./window-provider";

export const useDocument = (incomingDocument?: IDocument) => {
  const user = useUser();
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { toggleSidebar, isSidebarVisible } = useWindowProvider();
  const { documentsFileTree, setDocumentsFileTree } =
    useContext(DocumentContext);

  const { inputValue: documentInputValue, handleInputChange } = useInputDelay(
    1500,
    () => handleUpdateDocumentInDatabase(documentInputValue)
  );
  const { run: handleUpdateTitle } = useDebounceFn(
    () => {
      handleUpdateDocumentTitle(titleRef.current?.innerText || "");
    },
    {
      wait: 1000,
    }
  );
  const {
    inputValue: documentTitleValue,
    handleInputChange: handleTitleChange,
  } = useInputDelay(1500, () => handleUpdateDocumentTitle(documentTitleValue));

  async function handleCreateNewDocument() {
    const document = await createDocument(user?.id!);
    router.replace("/app/" + document?.id);
  }

  async function handleUpdateDocumentTitle(title: string) {
    if (!incomingDocument) throw new Error("please provide a document");
    console.log("updating document title");
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
    handleCreateNewDocument,
    titleRef,
    handleUpdateTitle,
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
