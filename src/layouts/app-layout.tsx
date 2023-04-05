import { useHotkeys } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { Sidebar } from "~/components/ui/sidebar";
import { AppProviders } from "~/providers/app-providers";

export const AppLayout = ({ children }: PropsWithChildren) => {
  useHotkeys([
    ["mod+J", () => console.log("Toggle color scheme")],
    ["ctrl+K", () => console.log("Trigger search")],
    ["ctrl+J", () => console.log("Trigger search")],
    ["alt+mod+shift+X", () => console.log("Rick roll")],
  ]);

  return (
    <AppProviders>
      <Sidebar />
      {children}
    </AppProviders>
  );
};
