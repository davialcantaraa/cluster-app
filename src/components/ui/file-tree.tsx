import { ChevronRight, File, Folder } from "lucide-react";
import { NodeRendererProps, Tree } from "react-arborist";
import { TreeProps } from "react-arborist/dist/types/tree-props";

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

export const PagesTree = (props: TreeProps<any>) => {
  return (
    <Tree
      initialData={data}
      // openByDefault={false}
      width="100%"
      rowHeight={34}
      rowClassName="!space-y-1"
      {...props}
    >
      {Node}
    </Tree>
  );
};

const Node = (props: NodeRendererProps<any>) => {
  return (
    <div
      {...props}
      onClick={() => props.node.isInternal && props.node.toggle()}
    >
      <li>
        <a
          href="#"
          className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <div className="flex gap-3">
            {!props.node.isLeaf && <ChevronRight size={16} />}
            {props.node.isLeaf ? <File size={16} /> : <Folder size={16} />}
          </div>
          <span className="ml-3">{props.node.data.name}</span>
        </a>
      </li>
    </div>
  );
};
