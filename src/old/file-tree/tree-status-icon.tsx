import { ChevronDown, ChevronRight } from "lucide-react";

export interface TreeStatusIconProps {
  color?: string;
  width?: number;
  height?: number;
  active?: boolean;
}

const defaultProps = {
  width: 16,
  height: 16,
  active: false,
};

const TreeStatusIcon = ({
  color,
  width,
  height,
  active,
}: TreeStatusIconProps & typeof defaultProps) => {
  return active ? <ChevronRight /> : <ChevronDown />;
};

TreeStatusIcon.defaultProps = defaultProps;
TreeStatusIcon.displayName = "GeistTreeStatusIcon";
export default TreeStatusIcon;
