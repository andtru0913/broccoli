import Link from "next/link";
import { useState } from "react";

import ActiveLink from "../activeLink";
import NavbarAdmin from "./navbarAdmin";
import INTRA_MENU_LIST from "./navItemIntra";

const NavbarIntranet = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openmenu = () => setIsOpen(!isOpen);
  return (
    <>
      <header className="fixed top-0 md:sticky">
        {user === null ? (
          <nav className="hidden md:flex justify-between align-middle  px-4">
            <div className="text-lg flex justify-start">
              <Link href="/intranet">
                <a>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/images/BroccoliBlack.png"
                  />
                </a>
              </Link>
            </div>
            :
          </nav>
        ) : (
          <>
              <NavbarAdmin user={user}/>
            <nav className=" hidden md:flex justify-between align-middle px-4 shadow-md">
              <div className="text-lg flex justify-start">
                <Link href="/intranet">
                  <a>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="/images/BroccoliBlack.png"
                    />
                  </a>
                </Link>
              </div>

              <div className="flex justify-center absolute right-10 text-skin-muted ">
                <ul
                  className={`md:flex md:flex-row md:justify-between md:align-middle
                                    ${
                                      isOpen === false
                                        ? "mobile:fixed mobile:-left-full mobile:top-14 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-fill"
                                        : "mobile:fixed mobile:left-0 mobile:top-14 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-fill"
                                    }`}
                >
                  {INTRA_MENU_LIST.map((menu) => {
                    return (
                      <li
                        className="my-2 flex align-middle"
                        onClick={() => {
                          openmenu;
                        }}
                        key={menu.text}
                      >
                        <ActiveLink
                          href={menu.href}
                          activeClassName="w-full text-xs font-medium md:ml-8 text-skin-navlink-active uppercase opacity-80 transition-all duration-200"
                        >
                          <a className="w-full text-xs md:ml-8 font-medium  uppercase opacity-80 transition-all duration-200 hover:text-skin-navlink-hover">
                            {menu.top === true ? menu.text : menu.icon}
                          </a>
                        </ActiveLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </>
        )}
      </header>

      <footer className="fixed bottom-0 w-screen md:sticky md:top-0 z-50 shadow-xl shadow-black">
        {user === null ? (
          <nav className="flex justify-between align-middle py-2 px-7  ">
            <div className="text-lg flex justify-start">
              <Link href="/intranet">
                <a>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/images/BroccoliBlack.png"
                  />
                </a>
              </Link>
            </div>
            :
          </nav>
        ) : (
          <>
            <nav className=" flex md:hidden  align-middle py-4 bg-white ">
              <div className=" w-full">
                <ul className=" grid grid-cols-5 gap-4 justify-items-center align-middle">
                  {INTRA_MENU_LIST.map((menu) =>
                    menu.bottom === true ? (
                      <li
                        className="flex flex-row"
                        onClick={() => {
                          openmenu;
                        }}
                        key={menu.text}
                      >
                        <ActiveLink
                          href={menu.href}
                          activeClassName="text-skin-primary"
                          className=""
                        >
                          <a className="text-center flex flex-col items-center align-middle text-skin-base">
                            {menu.icon}
                          </a>
                        </ActiveLink>
                      </li>
                    ) : (
                      <></>
                    )
                  )}
                </ul>
              </div>
            </nav>
          </>
        )}
      </footer>
    </>
  );
};

export default NavbarIntranet;

{
  /**
        
        <header className="sticky top-0 z-50">

            {user === null ? <nav className="flex justify-between align-middle py-2 px-7  ">
                <div className="text-lg flex justify-start">
                    <Link href="/intranet">
                        <a>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/images/BroccoliBlack.png"
                            />
                        </a>

                    </Link>
                </div>:
                
                </nav>
                :
                <>
                <nav className="flex justify-between align-middle py-2 px-7 bg-theme-green ">
                    <div className="text-lg flex justify-start">
                        <Link href="/intranet">
                            <a>
                                <img
                                    className="h-8 w-auto sm:h-10"
                                    src="/images/BroccoliBlack.png"
                                />
                            </a>

                        </Link>
                    </div>

                    <div className="flex md:justify-end absolute text-white right-10 top-3.5">
                        <ul className={isOpen === false ? styles.navmenu : styles.navmenu + ' ' + styles.active}>
                            {MENU_LIST.map((menu, idx) => (

                                <li className={styles.navitem}
                                    onClick={() => {
                                        setActiveIdx(idx);
                                        openmenu;
                                    }}
                                    key={menu.text}
                                >


                                    <NavItem theme={"intranet"} active={activeIdx === idx} {...menu} />

                                </li>
                            ))}
                        </ul>
                    </div>

                    <button aria-label="hamburger_menu button" className={` ${isOpen ? "block cursor-pointer justify-center items-center group  lg:none" : "none"}
                     `}
                        onClick={openmenu}
                    >
                        <div
                            className={`${hamburgerLine}
                            ${isOpen
                                    ? "rotate-45 translate-y-inledning opacity-50 group-hover:opacity-100 "
                                    : "opacity-50 group-hover:opacity-100 "
                                } `}
                        />
                        <div
                            className={`${hamburgerLine}
                            ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                                }`}
                        />

                        <div
                            className={`${hamburgerLine}
                            ${isOpen
                                    ? "-rotate-45 -translate-y-inledning opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                                }`}
                        />
                    </button>
                    </nav>
                </>

                }

            </header>*/
}
