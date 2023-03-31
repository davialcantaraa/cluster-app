import { File } from "lucide-react";
import React, { useMemo } from "react";
import useClasses from "~/hooks/use-classes";
import { useTreeContext } from "./tree-context";
import { makeChildPath, stopPropagation } from "./tree-help";
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
export type TreeFileProps = Props & NativeAttrs;

const TreeFile = ({
  name,
  parentPath,
  level,
  extra,
  className,
  ...props
}: React.PropsWithChildren<TreeFileProps> & typeof defaultProps) => {
  const { onFileClick } = useTreeContext();
  const currentPath = useMemo(() => makeChildPath(name, parentPath), []);
  const clickHandler = (event: React.MouseEvent) => {
    stopPropagation(event);
    onFileClick && onFileClick(currentPath);
  };

  const numberOfPaths = parentPath.split("/").length;
  const marginLeft = `${28 * numberOfPaths}px`;

  return (
    <div
      className={useClasses("file", className + `!ml-[${marginLeft}]`)}
      onClick={clickHandler}
      {...props}
    >
      <div className="names">
        <TreeIndents count={level} />
        <span className="icon mr-1">
          <File size={16} />
        </span>
        <span className="name">
          {name}
          {extra && <span className="extra">{extra}</span>}
        </span>
      </div>
      <style jsx>{`
        .file {
          cursor: pointer;
          line-height: 1;
          user-select: none;
          margin-left: calc(1.875rem * ${level});
        }

        .names {
          display: flex;
          height: 1.75rem;
          align-items: center;
          position: relative;
        }

        .names > :global(.indent) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 100%;
          background-color: '#000'
          margin-left: -1px;
        }

        .icon {
          width: 1.5rem;
          height: 100%;
          display: inline-flex;
          align-items: center;
        }

        .name {
          transition: opacity 100ms ease 0ms;
          color: '#000'
          white-space: nowrap;
          font-size: 0.875rem;
        }

        .extra {
          font-size: 0.75rem;
          align-self: baseline;
          padding-left: 4px;
          color: '#000'
        }

        .name:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

TreeFile.defaultProps = defaultProps;
TreeFile.displayName = "GeistTreeFile";

export default TreeFile;
