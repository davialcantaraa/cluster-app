import {
  navigationPrimaryItems,
  navigationSecondaryItems,
} from "~/config/navigation";
import Tree from "./file-tree";
import { Logo } from "./logo";
import { UserMenu } from "./user-menu";

export const Sidebar = () => {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 flex h-screen max-h-screen w-64 -translate-x-full flex-col justify-between border-r-[1px] bg-white transition-transform dark:bg-gray-800 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div>
        <Logo />
        <ul className="space-y-4 p-4 text-sm">
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
          <Tree>
            <Tree.File name="package.json" />
            <Tree.Folder name="components">
              <Tree.File name="layout.js" />
              <Tree.Folder name="footer">
                <Tree.File name="footer.js" />
                <Tree.File name="footer-text.js" />
                <Tree.File name="footer-license.js" />
              </Tree.Folder>
              <Tree.File name="header.js" />
            </Tree.Folder>
            <Tree.File name="readme.md" />
          </Tree>
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
    </aside>
  );
};
