import { HotkeyItem, useHotkeys } from "@mantine/hooks";
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
  isCommandDialogVisible: boolean;
  toggleCommandDialog: () => void;
  hotkeys: HotkeyItem[] | any;
}

const WindowContext = createContext({} as IWindowContext);

export const WindowProvider = ({ children }: PropsWithChildren) => {
  const hotkeys: HotkeyItem[] = [
    ["mod+J", () => console.log("Toggle color scheme")],
    ["ctrl+J", () => console.log("Trigger search")],
    ["alt+mod+shift+X", () => console.log("Rick roll")],
    ["ctrl+K", () => toggleCommandDialog()],
    ["ctrl+alt+S", () => handleToggleSidebar()],
  ];
  useHotkeys(hotkeys);
  const invisibleSidebarButtonRef = useRef<HTMLButtonElement>(null);
  const visibleSidebarButtonRef = useRef<HTMLButtonElement>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isCommandDialogVisible, setIsCommandDialogVisible] = useState(false);

  const toggleCommandDialog = useCallback(() => {
    setIsCommandDialogVisible((prev) => !prev);
  }, [isCommandDialogVisible]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, [isSidebarVisible]);

  const value = useMemo(
    () => ({
      isSidebarVisible,
      handleToggleSidebar,
      invisibleSidebarButtonRef,
      visibleSidebarButtonRef,
      isCommandDialogVisible,
      toggleCommandDialog,
      hotkeys,
    }),
    [
      isSidebarVisible,
      handleToggleSidebar,
      invisibleSidebarButtonRef,
      visibleSidebarButtonRef,
      isCommandDialogVisible,
      hotkeys,
      toggleCommandDialog,
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
    isCommandDialogVisible,
    hotkeys,
    toggleCommandDialog,
  } = useContext(WindowContext);
  return {
    isSidebarVisible,
    handleToggleSidebar,
    invisibleSidebarButtonRef,
    visibleSidebarButtonRef,
    isCommandDialogVisible,
    hotkeys,
    toggleCommandDialog,
  };
};
