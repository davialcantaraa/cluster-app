import {
  createContext,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface IWindowContext {
  isSidebarVisible: boolean;
  handleToggleSidebar: () => void;
  invisibleSidebarButtonRef: RefObject<HTMLButtonElement>;
  visibleSidebarButtonRef: RefObject<HTMLButtonElement>;
}

const WindowContext = createContext({} as IWindowContext);

export const WindowProvider = ({ children }: PropsWithChildren) => {
  const invisibleSidebarButtonRef = useRef<HTMLButtonElement>(null);
  const visibleSidebarButtonRef = useRef<HTMLButtonElement>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, [isSidebarVisible]);

  const value = useMemo(
    () => ({
      isSidebarVisible,
      handleToggleSidebar,
      invisibleSidebarButtonRef,
      visibleSidebarButtonRef,
    }),
    [
      isSidebarVisible,
      handleToggleSidebar,
      invisibleSidebarButtonRef,
      visibleSidebarButtonRef,
    ]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};

export const useWindowProvider = () => {
  const {
    isSidebarVisible,
    handleToggleSidebar,
    invisibleSidebarButtonRef,
    visibleSidebarButtonRef,
  } = useContext(WindowContext);
  return {
    isSidebarVisible,
    handleToggleSidebar,
    invisibleSidebarButtonRef,
    visibleSidebarButtonRef,
  };
};
