import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useBoolean, useDebounceFn, useUpdateEffect } from "ahooks";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useInputDelay } from "~/hooks/use-input-delay";
import { createDocument } from "~/server/create-document";
import { deleteDocument } from "~/server/delete-document";
import { fetchDocuments } from "~/server/fetch-documents";
import { updateDocumentTitle } from "~/server/update-document-title";
import { queryClient } from "~/services/react-query";
import { supabase } from "~/services/supabase";
import { IDocument } from "~/types/document";

export const useDocument = (incomingDocument?: IDocument) => {
  const user = useUser();
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const {
    documentsFileTree,
    setDocumentsFileTree,
    setCurrentDocument,
    currentDocument,
    toggleDeleteModal,
    isDeleteModalOpen,
  } = useContext(DocumentContext);

  const { inputValue: documentInputValue, handleInputChange } = useInputDelay(
    1500,
    () => handleUpdateDocumentInDatabase(documentInputValue)
  );
  const { run: handleUpdateTitle } = useDebounceFn(
    () => {
      handleUpdateDocumentTitle(titleRef.current?.innerText || "");
    },
    {
      wait: 800,
    }
  );

  async function handleCreateNewDocument() {
    const document = await createDocument(user?.id!);
    router.replace("/app/" + document?.id);
  }

  const handleDeleteDocument = useMutation({
    mutationKey: ["delete-document"],
    mutationFn: (document_id: string) => deleteDocument(user?.id!, document_id),
    onSuccess: () => {
      toast("Document delete sucessfully");
    },
  });

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

  console.log(documentsFileTree);

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

  useUpdateEffect(() => {
    setCurrentDocument(incomingDocument);
  }, [router.asPath]);

  return {
    documentInputValue,
    handleUpdateDocumentInDatabase,
    handleUpdateDocumentTitle,
    handleInputChange,
    documents,
    documentsFileTree,
    handleCreateNewDocument,
    titleRef,
    handleUpdateTitle,
    handleDeleteDocument,
    currentDocument,
    toggleDeleteModal,
    isDeleteModalOpen,
  };
};

interface IDocumentContext {
  documentsFileTree: any;
  setDocumentsFileTree: any;
  currentDocument: IDocument | undefined;
  setCurrentDocument: Dispatch<SetStateAction<IDocument | undefined>>;
  isDeleteModalOpen: boolean;
  toggleDeleteModal: () => void;
}

export const DocumentContext = createContext({} as IDocumentContext);

export const DocumentProvider = ({ children }: PropsWithChildren) => {
  const [currentDocument, setCurrentDocument] = useState<
    IDocument | undefined
  >();
  const [documentsFileTree, setDocumentsFileTree] = useState<any>([]);
  const [isDeleteModalOpen, { toggle: toggleDeleteModal }] = useBoolean(false);

  const value = useMemo(
    () => ({
      documentsFileTree,
      setDocumentsFileTree,
      currentDocument,
      setCurrentDocument,
      toggleDeleteModal,
      isDeleteModalOpen,
    }),
    [
      documentsFileTree,
      setDocumentsFileTree,
      currentDocument,
      setCurrentDocument,
      toggleDeleteModal,
      isDeleteModalOpen,
    ]
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
