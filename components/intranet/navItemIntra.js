import { HiHandRaised } from "react-icons/hi2";

import { ImExit } from "react-icons/im";

import {
  HiClock,
  HiCalendar,
  HiUserCircle,
  HiHome,
  HiBookOpen,
} from "react-icons/hi";
const INTRA_MENU_LIST = [
  {
    text: "Hem",
    bottom: true,
    top: true,
    "icon-small": <HiHome size={20} />,
    "icon-large": <HiHome size={30} />,
    href: "/intranet",
  },
  {
    text: "Handbok",
    bottom: true,
    top: true,
    "icon-small": <HiBookOpen size={20} />,
    "icon-large": <HiBookOpen size={30} />,
    href: "/intranet/handbook/",
  },
  {
    text: "Anställda",
    bottom: false,
    top: true,
    "icon-small": <HiHandRaised size={20} />,
    "icon-large": <HiHandRaised size={30} />,
    href: "/intranet/employees",
  },
  {
    text: "Dokument",
    bottom: false,
    top: true,
    "icon-small": <ImExit size={20} />,
    "icon-large": <ImExit size={30} />,
    href: "/intranet/dokument ",
  },
  {
    text: "Nyheter",
    bottom: false,
    top: true,
    "icon-small": <HiCalendar size={20} />,
    "icon-large": <HiCalendar size={30} />,
    href: "/intranet/news",
  },
  {
    text: "Timereporting",
    bottom: true,
    top: false,
    "icon-small": <HiClock size={20} />,
    "icon-large": <HiClock size={30} />,
    href: "https://www.broccoli.be/tid/",
  },
  {
    text: "Kalendar",
    bottom: true,
    top: false,
    "icon-small": <HiCalendar size={20} />,
    "icon-large": <HiCalendar size={30} />,
    href: "/intranet/calendar",
  },
  {
    text: "Profil",
    bottom: false,
    top: false,
    "icon-small": <HiUserCircle size={20} />,
    "icon-large": <HiUserCircle size={30} />,
    href: "/intranet/profile",
  },
  {
    text: "Logout",
    bottom: false,
    top: false,
    "icon-small": <ImExit size={20} />,
    "icon-large": <ImExit size={30} />,
    href: "/api/logout",
  },
];

export default INTRA_MENU_LIST;
