import { Copy, Star, Trash } from "lucide-react";

export const documentMenuItems = [
  {
    label: "Delete",
    icon: <Trash size={16} />,
    shortcut: false,
    disabled: false,
    separator: false,
  },
  {
    label: "Add to favorites",
    icon: <Star size={16} />,
    shortcut: false,
    disabled: false,
    separator: false,
  },
  {
    label: "Duplicate",
    icon: <Copy size={16} />,
    shortcut: "Ctrl+D",
    disabled: false,
    separator: false,
  },
];
