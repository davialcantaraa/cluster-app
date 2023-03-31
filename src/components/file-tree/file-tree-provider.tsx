import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface IFileTreeContext {
  nodeClicked: boolean;
  setNodeClicked: Dispatch<SetStateAction<boolean>>;
  handleToggle: () => void;
}

const FileTreeContext = createContext({} as IFileTreeContext);

export const FileTreeProvider = ({ children }: PropsWithChildren) => {
  const [nodeClicked, setNodeClicked] = useState(false);

  function handleToggle() {
    setNodeClicked((prev) => !prev);
  }

  const value = useMemo(
    () => ({ nodeClicked, setNodeClicked, handleToggle }),
    [nodeClicked, setNodeClicked, handleToggle]
  );

  return (
    <FileTreeContext.Provider value={value}>
      {children}
    </FileTreeContext.Provider>
  );
};

export const useFileTreeProvider = () => {
  const { nodeClicked, setNodeClicked, handleToggle } =
    useContext(FileTreeContext);
  return {
    nodeClicked,
    setNodeClicked,
    handleToggle,
  };
};
