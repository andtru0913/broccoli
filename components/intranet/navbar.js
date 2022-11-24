import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/navbar.module.css";
import NavItem from "../navbar/navitem";

const MENU_LIST = [
  { text: "Hem", href: "/intranet" },
  { text: "Calender", href: "/intranet/fullcalender" },
  { text: "Logout", href: "/api/logout" },
  { text: "Admin", href: "/intranet/admin" },
];

const NavbarIntranet = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const openmenu = () => setIsOpen(!isOpen);
  const hamburgerLine =
    " w-6 h-0.5 bg-tiertary-1 my-inledning transition-all duration-300 ease-in-out md:hidden";
  return (
    <header className="sticky top-0 z-50">
      {user === null ? (
        <nav className="flex justify-between align-middle py-2 px-7  ">
          <div className="text-lg flex justify-start">
            <Link href="/intranet">
              <a>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/images/BroccoliBlack.png"
                  alt="Bild"
                />
              </a>
            </Link>
          </div>
          :
        </nav>
      ) : (
        <>
          <nav className="flex justify-between align-middle py-2 px-7 bg-primary-1 ">
            <div className="text-lg flex justify-start">
              <Link href="/intranet">
                <a>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/images/BroccoliBlack.png"
                    alt="bild"
                  />
                </a>
              </Link>
            </div>

            <div className="flex md:justify-end absolute text-white right-10 top-3.5">
              <ul
                className={
                  isOpen === false
                    ? styles.navmenu
                    : styles.navmenu + " " + styles.active
                }
              >
                {MENU_LIST.map((menu, idx) => (
                  <li
                    className={styles.navitem}
                    onClick={() => {
                      setActiveIdx(idx);
                      openmenu;
                    }}
                    key={menu.text}
                  >
                    <NavItem
                      theme={"intranet"}
                      active={activeIdx === idx}
                      {...menu}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <button
              aria-label="hamburger_menu button"
              className={` ${
                isOpen
                  ? " cursor-pointer justify-center items-center group  lg:none"
                  : "none"
              }
                     `}
              onClick={openmenu}
            >
              <div
                className={`${hamburgerLine}
                            ${
                              isOpen
                                ? "rotate-45 translate-y-inledning opacity-50 group-hover:opacity-100 "
                                : "opacity-50 group-hover:opacity-100 "
                            } `}
              />
              <div
                className={`${hamburgerLine}
                            ${
                              isOpen
                                ? "opacity-0"
                                : "opacity-50 group-hover:opacity-100"
                            }`}
              />

              <div
                className={`${hamburgerLine}
                            ${
                              isOpen
                                ? "-rotate-45 -translate-y-inledning opacity-50 group-hover:opacity-100"
                                : "opacity-50 group-hover:opacity-100"
                            }`}
              />
            </button>
          </nav>
        </>
      )}
    </header>
  );
};

export default NavbarIntranet;
