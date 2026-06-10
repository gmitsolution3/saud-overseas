import { DashboardMenu } from "@/utils";
import {
  BookImage,
  Contact,
  LayoutDashboard,
  List,
  MapPinned,
  Settings,
  UserRoundSearch,
} from "lucide-react";

const baseDashboardUrl = "/admin-dashboard";
const dashboardMenu = new DashboardMenu(baseDashboardUrl);

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: dashboardMenu.defineUrl("/"),
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    url: dashboardMenu.defineUrl("/services"),
    icon: List,
  },
  {
    title: "Destination",
    url: dashboardMenu.defineUrl("/destinations"),
    icon: MapPinned,
  },
  {
    title: "Gallery",
    url: dashboardMenu.defineUrl("/galleries"),
    icon: BookImage,
  },
  {
    title: "Contact",
    url: dashboardMenu.defineUrl("/contacts"),
    icon: Contact,
  },
];

export const settingsItems = [
  /* {
    title: "Users",
    url: dashboardMenu.defineUrl("/users"),
    icon: UserRoundSearch,
  }, */
  {
    title: "Settings",
    url: dashboardMenu.defineUrl("/settings"),
    icon: Settings,
  },
];
