"use client";

import { ChevronUp } from "lucide-react";
import { Fragment } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { userMenuItems } from "~/config/user-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserMenu = () => {
  return (
    <div className="w-full border-t px-4 py-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="p-2">
          <button className="flex w-full items-center justify-between rounded-md transition-colors focus:outline-none hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>Davi Alcântara</p>
            </div>
            <ChevronUp size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userMenuItems.map((group, index) => (
            <Fragment key={group.id}>
              <DropdownMenuGroup>
                {group.items.map((item) =>
                  item.subItems ? (
                    <DropdownMenuSub key={item.value}>
                      <DropdownMenuSubTrigger>
                        {item.icon}
                        <span>{item.label}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {item.subItems.map((subItem) => (
                            <DropdownMenuItem key={subItem.value}>
                              {subItem.icon}
                              <span>{subItem.label}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ) : (
                    <DropdownMenuItem key={item.value}>
                      {item.icon}
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <DropdownMenuShortcut>
                          {item.shortcut}
                        </DropdownMenuShortcut>
                      )}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuGroup>
              {index !== userMenuItems.length && <DropdownMenuSeparator />}
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
