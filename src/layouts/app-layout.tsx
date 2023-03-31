import { PropsWithChildren } from "react";
import { Sidebar } from "~/components/ui/sidebar";
export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="sm:ml-64">
      <Sidebar />
      {children}
    </section>
  );
};
