import { MoreHorizontal } from "lucide-react";
import { documentMenuItems } from "~/config/document-menu";
import { DocumentMenuBarItem } from "./document-menu-bar-item";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "./menu-bar";

interface DocumentMenuBarProps {
  document_id: string;
}

export const DocumentMenuBar = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="invisible rounded-sm p-1 transition-all group-hover:visible hover:bg-gray-200">
          <MoreHorizontal size={16} />
        </MenubarTrigger>
        <MenubarContent>
          {documentMenuItems.map((item) => (
            <DocumentMenuBarItem key={item.label} item={item} />
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
