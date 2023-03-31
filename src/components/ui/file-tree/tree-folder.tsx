import { ChevronDown, Folder } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import useClasses from "~/hooks/use-classes";
import { setChildrenProps } from "~/utils/collections";
import Expand from "./expand";
import { useTreeContext } from "./tree-context";
import TreeFile from "./tree-file";
import { makeChildPath, sortChildren, stopPropagation } from "./tree-help";
import TreeIndents from "./tree-indents";

interface Props {
  name: string;
  extra?: string;
  parentPath?: string;
  level?: number;
  className?: string;
}

const defaultProps = {
  level: 0,
  className: "",
  parentPath: "",
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TreeFolderProps = Props & NativeAttrs;

const TreeFolder = ({
  name,
  children,
  parentPath,
  level: parentLevel,
  extra,
  className,
  ...props
}: React.PropsWithChildren<TreeFolderProps> & typeof defaultProps) => {
  const { initialExpand, isImperative } = useTreeContext();
  const [expanded, setExpanded] = useState<boolean>(initialExpand);
  useEffect(() => setExpanded(initialExpand), []);

  const currentPath = useMemo(() => makeChildPath(name, parentPath), []);
  const clickHandler = () => setExpanded(!expanded);

  const nextChildren = setChildrenProps(
    children,
    {
      parentPath: currentPath,
      level: parentLevel + 1,
    },
    [TreeFolder, TreeFile]
  );

  const sortedChildren = isImperative
    ? nextChildren
    : sortChildren(nextChildren, TreeFolder);

  return (
    <div
      className={useClasses("folder", className)}
      onClick={clickHandler}
      {...props}
    >
      <div className="names">
        <TreeIndents count={parentLevel} />
        <div className="flex items-center gap-2">
          <span>
            <ChevronDown size={16} />
          </span>
          <span className="icon">
            <Folder size={16} />
          </span>
        </div>
        <span className="name">
          {name}
          {extra && <span className="extra">{extra}</span>}
        </span>
      </div>
      <Expand isExpanded={expanded}>
        <div className="content" onClick={stopPropagation}>
          {sortedChildren}
        </div>
      </Expand>

      <style jsx>{`
        .folder {
          cursor: pointer;
          line-height: 1;
          user-select: none;
        }

        .names {
          display: flex;
          height: 1.75rem;
          align-items: center;
          margin-left: calc(1.875rem * ${parentLevel});
          position: relative;
        }

        .names > :global(.indent) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 100%;
          background-color: "#000";
          margin-left: -1px;
        }

        .status {
          position: absolute;
          left: calc(-1.105rem);
          top: 50%;
          transform: translate(-50%, -50%);
          width: 0.875rem;
          height: 0.875rem;
          z-index: 10;
          background-color: "#000";
        }

        .icon {
          width: 1.5rem;
          height: 100%;
          margin-right: 0.5rem;
        }

        .status,
        .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .name {
          transition: opacity 100ms ease 0ms;
          color: "#000";
          white-space: nowrap;
          font-size: 0.875rem;
        }

        .extra {
          font-size: 0.75rem;
          align-self: baseline;
          padding-left: 4px;
          color: "#000";
        }

        .name:hover {
          opacity: 0.7;
        }

        .content {
          display: flex;
          flex-direction: column;
          height: auto;
        }
      `}</style>
    </div>
  );
};

TreeFolder.defaultProps = defaultProps;
TreeFolder.displayName = "GeistTreeFolder";
export default TreeFolder;
