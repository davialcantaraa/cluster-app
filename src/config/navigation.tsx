import { Calendar, CheckSquare, FileDown, Trash2 } from "lucide-react";

export const navigationPrimaryItems = [
  {
    value: "primary",
    items: [
      {
        label: "Calendar",
        value: "calendar",
        path: "/app/calendar",
        icon: <Calendar size={16} />,
      },
      {
        label: "Tasks",
        value: "tasks",
        path: "/app/tasks",
        icon: <CheckSquare size={16} />,
      },
    ],
  },
];

export const navigationSecondaryItems = [
  {
    value: "secondary",
    items: [
      {
        label: "Import",
        value: "import",
        path: "/app/import",
        icon: <FileDown size={16} />,
      },
      {
        label: "Trash",
        value: "trash",
        path: "/app/trash",
        icon: <Trash2 size={16} />,
      },
    ],
  },
];
