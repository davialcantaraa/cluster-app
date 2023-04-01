import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { CursorProps, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { TreeProps } from "react-arborist/dist/types/tree-props";
import { FileTreeProvider, useFileTreeProvider } from "./file-tree-provider";

// TODO:
// Fix node focus

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

const PagesTreeContent = (props: TreeProps<any>) => {
  const { nodeClicked } = useFileTreeProvider();
  const treeRef = useRef<TreeApi<any>>(null);
  const [height, setHeight] = useState(data.length * 36);

  const TreeView = (
    <Tree
      ref={treeRef}
      initialData={data}
      openByDefault={false}
      renderCursor={Cursor}
      width="100%"
      height={height}
      className="scrollbar scrollbar-none"
      rowHeight={34}
      {...props}
    >
      {Node}
    </Tree>
  );

  useEffect(() => {
    const tree = treeRef.current;
    const openedItems = tree?.visibleNodes;
    if (openedItems) {
      setHeight(openedItems?.length * 36);
    }
  }, [nodeClicked]);

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
    >
      <li>
        <a
          href="#"
          className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
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
        </a>
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
