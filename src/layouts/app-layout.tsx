import { PropsWithChildren } from "react";
import { DocumentsNavigation } from "~/components/documents-navigation";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="sm:ml-64">
      <DocumentsNavigation />
      {children}
    </section>
  );
};
