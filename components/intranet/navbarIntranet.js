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
      <header className="fixed top-0  lg:sticky z-50">
        {user === null ? (
          <nav className="hidden  lg:flex justify-between align-middle px-4">
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
            <nav className=" hidden  lg:flex justify-between align-middle px-4 py-2 shadow-md">
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

              <div className="flex justify-center absolute right-10 text-muted ">
                <ul
                  className={` lg:flex  lg:flex-row  lg:justify-between  lg:align-middle
                                    ${
                                      isOpen === false
                                        ? " lg:static fixed  -left-full  top-14  flex  flex-col  w-full  rounded-lg  text-center  duration-300  shadow-sm  shadow-shadow  bg-fill "
                                        : "lg:static  fixed  left-0  top-14  flex  flex-col  w-full  rounded-lg  text-center  duration-300  shadow-sm  shadow-shadow  bg-fill"
                                    }`}
                >
                  {INTRA_MENU_LIST.map((menu) => {
                    return (
                      <li
                        className="my-2 flex items-center"
                        onClick={() => {
                          openmenu;
                        }}
                        key={menu.text}
                      >
                        <ActiveLink
                          id={menu.text}
                          href={menu.href}
                          activeClassName="w-full text-xs font-medium  lg:ml-8 text-navlink-active uppercase opacity-80 transition-all duration-200"
                        >
                          <a className="w-full text-xs  lg:ml-8 font-medium  uppercase opacity-80 transition-all duration-200 hover:text-navlink-hover">
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

      <footer className="fixed bottom-0 w-screen  lg:sticky  lg:top-0 z-50 shadow-xl shadow-black">
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
            <nav className=" flex  lg:hidden  align-middle py-4 bg-fill ">
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
                          id={menu.text}
                          href={menu.href}
                          activeClassName="text-primary"
                          className=""
                        >
                          <a className="text-center flex flex-col items-center align-middle text-base">
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
