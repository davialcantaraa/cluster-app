import { Toaster } from "sonner";
import { CommandDialog } from "~/components/command-dialog";
import { Sidebar } from "~/components/sidebar";
import { AppProviders } from "~/providers/app-providers";
import { LayoutProps } from "~/types/global";

export default function ApplicationLayout({ children }: LayoutProps) {
  return (
    <AppProviders>
      <CommandDialog />
      <Sidebar />
      {children}
      <Toaster richColors />
    </AppProviders>
  );
}
