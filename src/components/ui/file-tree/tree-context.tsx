import React from "react";

export interface TreeConfig {
  onFileClick?: (path: string) => void;
  initialExpand: boolean;
  isImperative: boolean;
}

const defaultContext = {
  initialExpand: true,
  isImperative: false,
};

export const TreeContext = React.createContext<TreeConfig>(defaultContext);

export const useTreeContext = (): TreeConfig =>
  React.useContext<TreeConfig>(TreeContext);
