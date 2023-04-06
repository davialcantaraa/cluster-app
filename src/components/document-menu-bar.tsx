import { useBoolean, useUpdateEffect } from "ahooks";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import { documentMenuItems } from "~/config/document-menu";
import { useDocument } from "~/providers/document-provider";
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
} from "./ui/alert-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menu-bar";

interface DocumentMenuBarProps {
  document_id: string;
}

export const DocumentMenuBar = ({ document_id }: DocumentMenuBarProps) => {
  const [isDeleteModalOpen, { toggle: toggleDeleteModal }] = useBoolean(false);
  const { handleDeleteDocument } = useDocument();
  const router = useRouter();

  useUpdateEffect(() => {
    if (handleDeleteDocument.isSuccess) {
      toggleDeleteModal();
      if (router.asPath.includes(document_id)) {
        router.push("/app");
      }
      queryClient.invalidateQueries(["fetch-documents"]);
    }
  }, [handleDeleteDocument.isSuccess]);

  return (
    <>
      <Menubar className="absolute right-0 mr-2">
        <MenubarMenu>
          <MenubarTrigger className="invisible rounded-sm bg-gray-100 p-1 group-hover:visible hover:bg-gray-200">
            <MoreHorizontal size={16} />
          </MenubarTrigger>
          <MenubarContent>
            {documentMenuItems.map((item) => (
              <>
                {item.separator && <MenubarSeparator />}
                <MenubarItem
                  key={item.label}
                  className="flex cursor-pointer items-center gap-2"
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
              onClick={() => handleDeleteDocument.mutate(document_id)}
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
    </>
  );
};
