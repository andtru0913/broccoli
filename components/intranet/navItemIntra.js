import {
  HiHome,
  HiBookOpen,
  HiUserCircle,
  HiCalendarDays,
  HiClock,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";
const INTRA_MENU_LIST = [
  {
    text: "Hem",
    bottom: true,
    top: true,
    icon: <HiHome size={20} />,
    href: "/intranet",
  },
  {
    text: "Handbook",
    bottom: true,
    top: true,
    icon: <HiBookOpen size={20} />,
    href: "/intranet/index",
  },
  {
    text: "Employees",
    bottom: false,
    top: true,
    icon: <HiClock size={20} />,
    href: "/intranet/employees",
  },
  {
    text: "Dokument",
    bottom: false,
    top: true,
    icon: <HiArrowLeftOnRectangle size={20} />,
    href: "/intranet/dokument ",
  },
  {
    text: "News",
    bottom: false,
    top: true,
    icon: <HiCalendarDays size={20} />,
    href: "/intranet/news",
  },
  {
    text: "Timereporting",
    bottom: true,
    top: false,
    icon: <HiClock size={20} />,
    href: "https://www.broccoli.be/tid/",
  },
  {
    text: "Calendar",
    bottom: true,
    top: false,
    icon: <HiCalendarDays size={20} />,
    href: "/intranet/calendar",
  },
  {
    text: "Profile",
    bottom: true,
    top: false,
    icon: <HiUserCircle size={20} />,
    href: "/intranet/profile",
  },
  {
    text: "Logout",
    bottom: false,
    top: false,
    icon: <HiArrowLeftOnRectangle size={20} />,
    href: "/api/logout",
  },

];

export default INTRA_MENU_LIST;
