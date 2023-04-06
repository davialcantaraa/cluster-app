import { MenubarItem, MenubarSeparator, MenubarShortcut } from "./ui/menu-bar";

interface DocumentMenuBarItemProps {
  item:
    | {
        label: string;
        icon: JSX.Element;
        shortcut: boolean;
        disabled: boolean;
        separator: boolean;
      }
    | {
        label: string;
        icon: JSX.Element;
        shortcut: string;
        disabled: boolean;
        separator: boolean;
      };
  // cb: () => void;
}

export const DocumentMenuBarItem = ({ item }: DocumentMenuBarItemProps) => {
  return (
    <>
      {item.separator && <MenubarSeparator />}
      <MenubarItem key={item.label} className="flex items-center gap-2">
        {item.icon}
        {item.label}{" "}
        {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
      </MenubarItem>
    </>
  );
};
