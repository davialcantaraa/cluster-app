import { PropsWithChildren } from "react";
import { Sidebar } from "~/components/ui/sidebar";
import { AppProviders } from "~/providers/app-providers";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <AppProviders>
      <section className="sm:ml-64">
        <Sidebar />
        {children}
      </section>
    </AppProviders>
  );
};
