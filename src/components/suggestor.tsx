"use client";

import { FloatingWrapper, useMention } from "@remirror/react";
import { useEffect, useState } from "react";
import { MentionExtensionAttributes } from "remirror/dist-types/extensions";
import { cn } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Suggestor = ({
  allUsers,
}: {
  allUsers: MentionExtensionAttributes[];
}) => {
  const [users, setUsers] = useState<MentionExtensionAttributes[]>([]);
  const { state, getMenuProps, getItemProps, indexIsHovered, indexIsSelected } =
    useMention({
      items: users,
    });

  useEffect(() => {
    if (!state) {
      return;
    }

    const searchTerm = state.query.full.toLowerCase();
    const filteredUsers = allUsers
      .filter((user) => user.label.toLowerCase().includes(searchTerm))
      .sort()
      .slice(0, 5);
    setUsers(filteredUsers);
  }, [state, allUsers]);

  const enabled = !!state;

  return (
    <FloatingWrapper
      positioner="cursor"
      enabled={enabled}
      placement="bottom-start"
    >
      <DropdownMenu open={true}>
        <DropdownMenuTrigger>
          <div className="pb-14" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div {...getMenuProps()} className="suggestions">
            {enabled &&
              users.map((user, index) => {
                const isHighlighted = indexIsSelected(index);
                const isHovered = indexIsHovered(index);
                return (
                  <div
                    key={user.id}
                    className={cn(
                      "suggestion",
                      isHighlighted && "highlighted",
                      isHovered && "hovered"
                    )}
                    {...getItemProps({
                      item: user,
                      index,
                    })}
                  >
                    <DropdownMenuItem>{user.label}</DropdownMenuItem>
                  </div>
                );
              })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </FloatingWrapper>
  );
};
