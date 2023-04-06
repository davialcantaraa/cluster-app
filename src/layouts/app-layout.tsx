import { PropsWithChildren } from "react";
import { CommandDialog } from "~/components/command-dialog";
import { Sidebar } from "~/components/sidebar";
import { AppProviders } from "~/providers/app-providers";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <AppProviders>
      <CommandDialog />
      <Sidebar />
      {children}
    </AppProviders>
  );
};
