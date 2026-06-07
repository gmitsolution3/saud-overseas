import { DashboardMenu } from "@/utils";
import {
  ClipboardCheck,
  FileStack,
  GalleryVerticalEnd,
  Images,
  LayoutDashboard,
  LayoutList,
  LibraryBig,
  MessagesSquare,
  Settings,
  UserRoundSearch,
  Users,
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
    title: "Sliders",
    url: dashboardMenu.defineUrl("/sliders"),
    icon: Images,
  },
  {
    title: "Services",
    url: dashboardMenu.defineUrl("/services"),
    icon: ClipboardCheck,
  },
  {
    title: "portfolios",
    url: dashboardMenu.defineUrl("/portfolios"),
    icon: GalleryVerticalEnd,
  },
  {
    title: "Case Studies",
    url: dashboardMenu.defineUrl("/case-studies"),
    icon: LibraryBig,
  },
  {
    title: "Leadership Messages",
    url: dashboardMenu.defineUrl(
      "/leadership-messages",
    ),
    icon: MessagesSquare,
  },
  {
    title: "Team Members",
    url: dashboardMenu.defineUrl("/team-members"),
    icon: Users,
  },
  {
    title: "Blogs",
    url: dashboardMenu.defineUrl("/blogs"),
    icon: LayoutList,
  },
  {
    title: "Job Postings",
    url: dashboardMenu.defineUrl("/job-postings"),
    icon: FileStack,
  },
];

export const settingsItems = [
  {
    title: "Users",
    url: dashboardMenu.defineUrl("/users"),
    icon: UserRoundSearch,
  },
  {
    title: "Settings",
    url: dashboardMenu.defineUrl("/settings"),
    icon: Settings,
  },
];
