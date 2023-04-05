import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CursorProps, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { TreeProps } from "react-arborist/dist/types/tree-props";
import { useDidUpdate } from "rooks";
import { useDocument } from "~/providers/document-provider";
import { FileSkeleton } from "./file-skeleton";
import { FileTreeProvider, useFileTreeProvider } from "./file-tree-provider";

const PagesTreeContent = (props: TreeProps<any>) => {
  const { nodeClicked } = useFileTreeProvider();
  const treeRef = useRef<TreeApi<any>>(null);
  const [height, setHeight] = useState(36);
  const { documentsFileTree } = useDocument();

  const TreeView = (
    <Tree
      ref={treeRef}
      data={documentsFileTree}
      openByDefault={false}
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
  );

  useDidUpdate(() => {
    const tree = treeRef.current;
    const openedItems = tree?.visibleNodes;
    if (openedItems) {
      setHeight(openedItems?.length * 36);
    }
  }, [nodeClicked]);

  useEffect(() => {
    console.log("updated");
    const tree = treeRef.current;
    tree?.update(documentsFileTree);
  }, [documentsFileTree]);

  if (!documentsFileTree.length) return <FileSkeleton count={1} />;

  return TreeView;
};

const Node = (props: NodeRendererProps<any>) => {
  const { handleToggle } = useFileTreeProvider();

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
      <li className="focus:outline-none focus-visible:outline-none">
        <Link
          href={props.node.id}
          className="flex items-center rounded-lg p-2 text-gray-900 focus:outline-none focus-visible:outline-none hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <div className="flex gap-3">
            {!props.node.isLeaf && props.node.isOpen ? (
              <ChevronDown size={16} />
            ) : props.node.isClosed ? (
              <ChevronRight size={16} />
            ) : null}
            {props.node.isLeaf ? <File size={16} /> : <Folder size={16} />}
          </div>
          <span className="ml-3">{props.node.data.name}</span>
        </Link>
      </li>
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
