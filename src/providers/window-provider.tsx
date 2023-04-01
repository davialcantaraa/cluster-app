import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface IWindowContext {
  isSidebarVisible: boolean;
  handleToggleSidebar: () => void;
}

const WindowContext = createContext({} as IWindowContext);

export const WindowProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, [isSidebarVisible]);

  const value = useMemo(
    () => ({ isSidebarVisible, handleToggleSidebar }),
    [isSidebarVisible, handleToggleSidebar]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};

export const useWindowProvider = () => {
  const { isSidebarVisible, handleToggleSidebar } = useContext(WindowContext);
  return { isSidebarVisible, handleToggleSidebar };
};
