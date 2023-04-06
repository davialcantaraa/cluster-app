import { useUser } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import { useBoolean, useUpdateEffect } from "ahooks";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  Loader2,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CursorProps, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { TreeProps } from "react-arborist/dist/types/tree-props";
import { toast } from "sonner";
import { documentMenuItems } from "~/config/document-menu";
import { useDocument } from "~/providers/document-provider";
import { deleteDocument } from "~/server/delete-document";
import { queryClient } from "~/services/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menu-bar";
import { FileSkeleton } from "./file-skeleton";
import { FileTreeProvider, useFileTreeProvider } from "./file-tree-provider";

// TODO:
// Remove this file tree
// https://www.reddit.com/r/reactjs/comments/ch7o2n/best_react_tree_nested_sortable_drag_drop/
// ---
// https://primereact.org/tree/#dragdrop
// https://atlaskit.atlassian.com/packages/confluence/tree
// https://github.com/react-component/tree
// https://github.com/frontend-collective/react-sortable-tree
// https://github.com/swiftcarrot/react-ui-tree
// http://sortablejs.github.io/Sortable/#nested
// https://github.com/naisutech/react-tree
// https://streakyc.github.io/react-draggable-list/example/

const PagesTreeContent = (props: TreeProps<any>) => {
  const { nodeClicked } = useFileTreeProvider();
  const treeRef = useRef<TreeApi<any>>(null);
  const {
    documentsFileTree,
    handleCreateNewDocument,
    handleDeleteDocument,
    currentDocument,
    toggleDeleteModal,
    isDeleteModalOpen,
  } = useDocument();
  const [height, setHeight] = useState(
    documentsFileTree.length ? documentsFileTree.length * 36 : 36
  );

  const fileTree = useMemo(() => documentsFileTree, [documentsFileTree]);

  const TreeView = (
    <>
      <Tree
        ref={treeRef}
        data={fileTree}
        openByDefault={true}
        renderCursor={Cursor}
        width="100%"
        height={height}
        className="scrollbar scrollbar-none focus:outline-none focus-visible:outline-none"
        rowHeight={34}
        indent={28}
        {...props}
      >
        {Node}
      </Tree>
      <li className="w-full focus:outline-none focus-visible:outline-none">
        <button
          className="flex w-full items-center rounded-lg p-2 text-gray-400 transition-colors focus:outline-none focus-visible:outline-none hover:bg-gray-100 hover:text-black dark:text-white"
          onClick={handleCreateNewDocument}
        >
          <Plus size={16} />
          <span className="ml-3 ">Add a document</span>
        </button>
      </li>
    </>
  );

  useUpdateEffect(() => {
    if (documentsFileTree.length) {
      setHeight(documentsFileTree.length * 36);
    }
  }, [documentsFileTree]);

  useUpdateEffect(() => {
    const tree = treeRef.current;
    const openedItems = tree?.visibleNodes;
    if (openedItems) {
      setHeight(openedItems?.length * 36);
    }
  }, [nodeClicked]);

  useEffect(() => {
    const tree = treeRef.current;
    tree?.update(fileTree);
  }, [documentsFileTree]);

  if (!documentsFileTree.length) return <FileSkeleton count={1} />;

  return TreeView;
};

const Node = (props: NodeRendererProps<any>) => {
  const [isDeleteModalOpen, { toggle: toggleDeleteModal }] = useBoolean(false);
  const { handleToggle } = useFileTreeProvider();
  const router = useRouter();
  const user = useUser();

  const handleDeleteDocument = useMutation({
    mutationKey: ["delete-document"],
    mutationFn: (document_id: string) => deleteDocument(user?.id!, document_id),
    onSuccess: () => {
      toast("Document deleted sucessfully");
      toggleDeleteModal();
      queryClient.invalidateQueries(["fetch-documents"]);
      // @ts-ignore
      router.push("/app/" + props.node.parent.children[1]?.id);
    },
  });

  return (
    <div
      ref={props.dragHandle}
      style={props.style}
      onClick={() => {
        props.node.isInternal && props.node.toggle();
        handleToggle();
      }}
      className="focus:outline-none focus-visible:outline-none"
    >
      <li className="group relative flex items-center justify-between rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Link
          href={"/app/" + props.node.id}
          className="focus-visible:outline-nonedark:text-white flex w-full items-center  focus:outline-none "
          prefetch
        >
          <div className="flex gap-3">
            {!props.node.isLeaf && props.node.isOpen ? (
              <ChevronDown size={16} />
            ) : props.node.isClosed ? (
              <ChevronRight size={16} />
            ) : null}
            {props.node.isLeaf ? <File size={16} /> : <Folder size={16} />}
          </div>
          <span className="ml-3 truncate">{props.node.data.name}</span>
        </Link>
        <Menubar className="absolute right-0 mr-2">
          <MenubarMenu>
            <MenubarTrigger className="invisible rounded-sm p-1 transition-all group-hover:visible hover:bg-gray-200">
              <MoreHorizontal size={16} />
            </MenubarTrigger>
            <MenubarContent>
              {documentMenuItems.map((item) => (
                <>
                  {item.separator && <MenubarSeparator />}
                  <MenubarItem
                    key={item.label}
                    className="flex items-center gap-2"
                    onClick={toggleDeleteModal}
                  >
                    {item.icon}
                    {item.label}{" "}
                    {item.shortcut && (
                      <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                    )}
                  </MenubarItem>
                </>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </li>
      <AlertDialog open={isDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={toggleDeleteModal}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteDocument.mutate(props.node.id)}
            >
              {handleDeleteDocument.isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const Cursor = ({ top, left }: CursorProps) => {
  return (
    <div className="absolute z-10 h-px w-full bg-black" style={{ top, left }} />
  );
};

export const PagesTree = React.forwardRef<HTMLButtonElement>((props) => {
  return (
    <FileTreeProvider>
      <PagesTreeContent {...props} />
    </FileTreeProvider>
  );
});

PagesTree.displayName = "PagesTree";
