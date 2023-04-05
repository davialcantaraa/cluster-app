import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { queryClient } from "~/services/react-query";
import { DocumentProvider } from "./document-provider";
import { WindowProvider } from "./window-provider";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WindowProvider>
        <DocumentProvider>{children}</DocumentProvider>
      </WindowProvider>
    </QueryClientProvider>
  );
};
