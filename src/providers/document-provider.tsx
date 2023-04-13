import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounceFn, useUpdateEffect } from "ahooks";
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
import { convertArrayToObject, rootItem } from "~/config/document-tree";
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
      toast("Document deleted successfully");
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

  const { data: documents } = useQuery({
    queryKey: ["fetch-documents"],
    queryFn: () => fetchDocuments(user?.id!),
    onSuccess: (data) => {
      const items = data.map((item: IDocument) => ({
        index: item.id,
        canMove: true,
        isFolder: false,
        children: undefined,
        data: item.title,
        canRename: true,
        path: "/document/" + item.id,
      }));
      const newRootItem = rootItem;
      newRootItem.children = items.map((item: any) => item.index);
      const completeArray = [newRootItem, ...items];
      const objectFromArray = convertArrayToObject(completeArray, "index");
      setDocumentsFileTree(objectFromArray);
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
  };
};

interface IDocumentContext {
  documentsFileTree: any;
  setDocumentsFileTree: any;
  currentDocument: IDocument | undefined;
  setCurrentDocument: Dispatch<SetStateAction<IDocument | undefined>>;
}

export const DocumentContext = createContext({} as IDocumentContext);

export const DocumentProvider = ({ children }: PropsWithChildren) => {
  const [currentDocument, setCurrentDocument] = useState<
    IDocument | undefined
  >();
  const [documentsFileTree, setDocumentsFileTree] = useState<any>([]);

  const value = useMemo(
    () => ({
      documentsFileTree,
      setDocumentsFileTree,
      currentDocument,
      setCurrentDocument,
    }),
    [
      documentsFileTree,
      setDocumentsFileTree,
      currentDocument,
      setCurrentDocument,
    ]
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
