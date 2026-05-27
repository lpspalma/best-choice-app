import { LayoutDashboard, Trophy, PlusSquare, User } from "lucide-react";

export const navigationLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/pools",
    label: "Pools",
    icon: Trophy,
  },
  {
    to: "/create-pool",
    label: "Create",
    icon: PlusSquare,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
];
