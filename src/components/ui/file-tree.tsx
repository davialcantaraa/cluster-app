import useResizeObserver from "@react-hook/resize-observer";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CursorProps, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { TreeProps } from "react-arborist/dist/types/tree-props";

interface Size {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  MutableRefObject<T | null>,
  Size
] {
  const target = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    target.current && setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry: any) => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    setSize({ width, height });
  });

  return [target, size];
}

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
  {
    id: "5",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
  {
    id: "6",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
  {
    id: "7",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
  {
    id: "8",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

export const PagesTree = (props: TreeProps<any>) => {
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
      rowHeight={34}
      className="!h-fit w-full !overflow-hidden"
      onToggle={(value) => {
        const toggledItem = data.find((item) => item.id === value);
        const itemCount = toggledItem?.children?.length;
        setHeight((prev) => prev + 36 * itemCount!);
      }}
      {...props}
    >
      {Node}
    </Tree>
  );

  useEffect(() => {
    const tree = treeRef.current;
    const openedItems = tree?.visibleNodes;
    if (openedItems) setHeight(openedItems?.length * 36);
  }, [TreeView]);

  return TreeView;
};

const Node = (props: NodeRendererProps<any>) => {
  return (
    <div
      ref={props.dragHandle}
      style={props.style}
      onClick={() => props.node.isInternal && props.node.toggle()}
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
