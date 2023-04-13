"use client";

import { getHotkeyHandler } from "@mantine/hooks";
import { useWindowProvider } from "~/providers/window-provider";
import {
  CommandDialog as CommandDialogPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export const CommandDialog = () => {
  const { isCommandDialogVisible, toggleCommandDialog, hotkeys } =
    useWindowProvider();

  return (
    <CommandDialogPrimitive
      open={isCommandDialogVisible}
      onOpenChange={toggleCommandDialog}
    >
      <CommandInput
        placeholder="Type a command or search..."
        onKeyDown={getHotkeyHandler(hotkeys)}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialogPrimitive>
  );
};
