import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  navigationPrimaryItems,
  navigationSecondaryItems,
} from "~/config/navigation";
import { cn } from "~/lib/utils";
import { useWindowProvider } from "~/providers/window-provider";
import { AnimatedButton } from "./button";
import { PagesTree } from "./file-tree";
import { Logo } from "./logo";
import { UserMenu } from "./user-menu";

export const Sidebar = () => {
  const { isSidebarVisible, handleToggleSidebar } = useWindowProvider();

  return (
    <>
      <AnimatedButton
        initial={{
          opacity: 0,
          x: -100,
        }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
        onClick={handleToggleSidebar}
        variant="ghost"
        className={cn(
          "absolute top-0 left-0 m-4 p-2 text-gray-400 hover:text-gray-500",
          !isSidebarVisible ? "flex" : "hidden"
        )}
      >
        <Menu />
      </AnimatedButton>
      <motion.aside
        animate={{
          width: isSidebarVisible ? "16rem" : 0,
          opacity: isSidebarVisible ? 1 : 0,
          // x: !isSidebarVisible ? -100 : 0,
        }}
        transition={{ duration: 0.3 }}
        id="default-sidebar"
        className={cn(
          "fixed top-0 left-0 z-40 flex h-screen max-h-screen w-64 -translate-x-full flex-col justify-between overflow-hidden border-r-[1px] bg-white transition-transform dark:bg-gray-800 sm:translate-x-0",
          isSidebarVisible && "whitespace-nowrap"
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
          </ul>
        </div>
        <UserMenu />
      </motion.aside>
    </>
  );
};
