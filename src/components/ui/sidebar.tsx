import { Menu } from "lucide-react";
import { useDidUpdate } from "rooks";
import {
  navigationPrimaryItems,
  navigationSecondaryItems,
} from "~/config/navigation";
import { cn } from "~/lib/utils";
import { useWindowProvider } from "~/providers/window-provider";
import { Button } from "./button";
import { PagesTree } from "./file-tree";
import { Logo } from "./logo";
import { UserMenu } from "./user-menu";

//  TODO:
//  Fix tab navigation (Apply shadui tabbar?)
//  Integrate to supabase
//  Create loading state
// https://github.com/radix-ui/design-system/blob/master/components/Skeleton.tsx

export const Sidebar = () => {
  const {
    isSidebarVisible,
    handleToggleSidebar,
    invisibleSidebarButtonRef,
    visibleSidebarButtonRef,
  } = useWindowProvider();

  useDidUpdate(() => {
    if (isSidebarVisible) {
      visibleSidebarButtonRef.current?.focus();
    } else {
      invisibleSidebarButtonRef.current?.focus();
    }
  }, [handleToggleSidebar]);

  return (
    <>
      <Button
        ref={invisibleSidebarButtonRef}
        onClick={handleToggleSidebar}
        variant="ghost"
        className={cn(
          "absolute top-0 left-0 m-4 p-2 text-gray-400 hover:text-gray-500",
          !isSidebarVisible ? "flex" : "hidden"
        )}
      >
        <Menu />
      </Button>
      <aside
        id="default-sidebar"
        className={cn(
          "fixed top-0 left-0 z-40 h-screen max-h-screen w-64 -translate-x-full flex-col justify-between border-r-[1px] bg-white transition-transform dark:bg-gray-800 sm:translate-x-0",
          isSidebarVisible ? "flex" : "hidden"
        )}
        aria-label="Sidebar"
      >
        <div>
          <Logo />
          <ul
            className={cn(
              "space-y-4 p-4 text-sm",
              !isSidebarVisible && "absolute"
            )}
          >
            {navigationPrimaryItems.map((navigation) => (
              <div key={navigation.value} className="space-y-1">
                {navigation.items.map((item) => (
                  <li key={item.value}>
                    <a
                      href="#"
                      className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </a>
                  </li>
                ))}
              </div>
            ))}
            <PagesTree />
            {navigationSecondaryItems.map((navigation) => (
              <div key={navigation.value} className="space-y-1">
                {navigation.items.map((item) => (
                  <li key={item.value} tabIndex={0}>
                    <a
                      href="#"
                      className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </a>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
        <UserMenu />
      </aside>
    </>
  );
};
