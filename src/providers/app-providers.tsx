import { PropsWithChildren } from "react";
import { WindowProvider } from "./window-provider";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return <WindowProvider>{children}</WindowProvider>;
};
