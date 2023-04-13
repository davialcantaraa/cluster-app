"use client";

import { ChevronDown, ChevronRight, File, Folder, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  ControlledTreeEnvironment,
  Tree,
  TreeItemIndex,
} from "react-complex-tree";
import { cn } from "~/lib/utils";
import { useDocument } from "~/providers/document-provider";
import { DocumentMenuBar } from "./document-menu-bar";
import { ScrollArea } from "./ui/scroll-area";

export const DocumentTree = () => {
  const { documentsFileTree, handleCreateNewDocument } = useDocument();

  const [focusedItem, setFocusedItem] = useState<
    TreeItemIndex & (TreeItemIndex | TreeItemIndex[])
  >([] as any);
  const [expandedItems, setExpandedItems] = useState<
    TreeItemIndex[] & (TreeItemIndex | TreeItemIndex[])
  >([] as any);
  const [selectedItems, setSelectedItems] = useState<
    TreeItemIndex[] & (TreeItemIndex | TreeItemIndex[])
  >([] as any);

  return (
    <ScrollArea className="max-h-[480px]">
      <ControlledTreeEnvironment
        items={documentsFileTree}
        getItemTitle={(item) => item.data}
        viewState={{
          ["primary-tree"]: {
            focusedItem,
            expandedItems,
            selectedItems,
          },
        }}
        onFocusItem={(item) => setFocusedItem(item.index)}
        onExpandItem={(item) =>
          setExpandedItems([...expandedItems, item.index])
        }
        onCollapseItem={(item) =>
          setExpandedItems(
            expandedItems.filter(
              (expandedItemIndex) => expandedItemIndex !== item.index
            )
          )
        }
        onSelectItems={(items) => setSelectedItems(items)}
        canDragAndDrop={true}
        canDropOnFolder={true}
        canReorderItems={true}
        renderItemTitle={({ title }) => (
          <span className="truncate">{title}</span>
        )}
        renderItemArrow={({ item, context }) =>
          item.isFolder ? (
            context.isExpanded ? (
              <div className="flex gap-3">
                <ChevronDown size={16} />
                <Folder size={16} />
              </div>
            ) : (
              <div className="flex gap-3">
                <ChevronRight size={16} />
                <Folder size={16} />
              </div>
            )
          ) : (
            <File size={16} className="mr-1 flex flex-shrink-0" />
          )
        }
        renderItem={({
          title,
          arrow,
          depth,
          context,
          children,
          info,
          item,
        }) => (
          <li
            {...context.itemContainerWithChildrenProps}
            className="group flex w-full flex-col justify-center"
          >
            <Link
              {...context.itemContainerWithoutChildrenProps}
              {...context.interactiveElementProps}
              className="flex w-[inherit] items-center gap-2 truncate rounded-lg p-2 hover:bg-gray-100"
              // @ts-ignore
              href={item.path}
              ref={null}
              prefetch
            >
              {arrow}
              {title}
            </Link>
            <DocumentMenuBar document_id={item.index.toString()} />
            {children}
          </li>
        )}
        renderTreeContainer={({ children, containerProps }) => (
          <div {...containerProps} className="max-w-[223px]">
            {children}
          </div>
        )}
        renderItemsContainer={({ children, containerProps, info }) => (
          <ul
            {...containerProps}
            className={cn(
              "flex w-full flex-col gap-px",
              containerProps.role === "group" && "pl-7"
            )}
          >
            {children}
          </ul>
        )}
      >
        <Tree treeId="primary-tree" rootItem="root" treeLabel="Document tree" />
      </ControlledTreeEnvironment>
      <li className="w-full focus:outline-none focus-visible:outline-none">
        <button
          className="flex w-full items-center rounded-lg p-2 text-gray-400 transition-colors focus:outline-none focus-visible:outline-none hover:bg-gray-100 hover:text-black dark:text-white"
          onClick={handleCreateNewDocument}
        >
          <Plus size={16} />
          <span className="ml-3 ">Add a document</span>
        </button>
      </li>
    </ScrollArea>
  );
};
