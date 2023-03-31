import {
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Link,
  LogOut,
  Mail,
  Plus,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

interface userMenuGroup {
  id: number;
  items: userMenuItem[];
}

interface userMenuItem {
  icon: JSX.Element;
  label: string;
  value: string;
  path?: string;
  shortcut?: string;
  subItems?: userMenuItem[];
}

export const userMenuItems: userMenuGroup[] = [
  {
    id: 0,
    items: [
      {
        icon: <User className="mr-2 h-4 w-4" />,
        label: "Profile",
        value: "profile",
        path: "/app/profile",
        shortcut: "⇧⌘P",
      },
      {
        icon: <CreditCard className="mr-2 h-4 w-4" />,
        label: "Billing",
        value: "billing",
        path: "/app/billing",
        shortcut: "⌘B",
      },
      {
        icon: <Settings className="mr-2 h-4 w-4" />,
        label: "Settings",
        value: "settings",
        path: "/app/settings",
        shortcut: "⌘S",
      },
      {
        icon: <Keyboard className="mr-2 h-4 w-4" />,
        label: "Keyboard shortcuts",
        value: "kbd_shortcuts",
        shortcut: "⌘K",
      },
    ],
  },
  {
    id: 1,
    items: [
      {
        icon: <Users className="mr-2 h-4 w-4" />,
        label: "Teams",
        value: "teams",
        subItems: [
          {
            icon: <Plus className="mr-2 h-4 w-4" />,
            label: "Create new team",
            value: "create_team",
          },
        ],
      },
      {
        icon: <UserPlus className="mr-2 h-4 w-4" />,
        label: "Invite users",
        value: "invite_users",
        subItems: [
          {
            icon: <Mail className="mr-2 h-4 w-4" />,
            label: "Email",
            value: "invite_email",
          },
          {
            icon: <Link className="mr-2 h-4 w-4" />,
            label: "Link",
            value: "invite_link",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        icon: <Github className="mr-2 h-4 w-4" />,
        label: "Github",
        value: "github",
      },
      {
        icon: <LifeBuoy className="mr-2 h-4 w-4" />,
        label: "Support",
        value: "support",
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        icon: <LogOut className="mr-2 h-4 w-4" />,
        label: "Log out",
        value: "logout",
        shortcut: "⇧⌘Q",
      },
    ],
  },
];
