import { createContext, PropsWithChildren, useContext, useMemo } from "react";

interface IDocumentContext {}

const DocumentContext = createContext({} as IDocumentContext);

export const DocumentProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo(() => ({}), []);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentProvider = () => {
  const {} = useContext(DocumentContext);
  return {};
};
