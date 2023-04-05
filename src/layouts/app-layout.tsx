import { PropsWithChildren } from "react";
import { CommandDialog } from "~/components/ui/command/command-dialog";

import { Sidebar } from "~/components/ui/sidebar";
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
