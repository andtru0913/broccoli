import Link from "next/link";
import { useEffect, useState } from "react";
import * as React from "react";
import ActiveLink from "../activeLink";
import ThemedImage from "../themedImage";
import NavbarAdmin from "./navbarAdmin";
import INTRA_MENU_LIST from "./navItemIntra";
import { HiBell } from "react-icons/hi";
import UpcomingNotifications from "./upcomingNotifications";

const NavbarIntranet = ({ admin, notifications }) => {
  const parsedNotifications = JSON.parse(notifications);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const openmenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    let notificationCookies =
      JSON.parse(localStorage.getItem("readNotifications") || null) || [];
    setIsRed(
      !parsedNotifications.every((item) =>
        notificationCookies.includes(item.notification.id)
      )
    );
    setNotificationOpen(
      !parsedNotifications.every((item) =>
        notificationCookies.includes(item.notification.id)
      )
    );
  }, []);

  const openNotification = () => {
    if (notificationOpen) {
      setIsRed(false);
      setNotificationOpen(false);
      let notificationCookies =
        JSON.parse(localStorage.getItem("readNotifications") || null) || [];
      const parsedNotifications = JSON.parse(notifications);
      parsedNotifications.forEach((item) => {
        if (!notificationCookies.includes(item.notification.id)) {
          notificationCookies.push(item.notification.id);
        }
      });
      localStorage.setItem(
        "readNotifications",
        JSON.stringify(notificationCookies)
      );
    } else {
      setNotificationOpen(true);
    }
  };
  const hamburgerLine =
    " w-6 h-0.5 bg-primary-1 my-1 transition-all duration-300 ease-in-out lg:hidden";
  return (
    <>
      <header className="fixed top-0  lg:sticky bg-fill z-30">
        <>
          {admin ? <NavbarAdmin /> : ""}
          <nav className="hidden lg:flex justify-between items-center align-middle px-4 py-2 shadow-md">
            <div className="text-lg flex justify-start">
              <Link href="/intranet">
                <a className="">
                  <div className="relative h-auto w-20 md:h-5 py-0 flex md:w-60 lg:h-10">
                    <ThemedImage
                      img_path_light="/images/lightMode/BroccoliBlack.png"
                      img_path_dark="/images/darkMode/BroccoliWhite.png"
                    />
                  </div>
                </a>
              </Link>
            </div>

            <div className="flex justify-center absolute right-10 text-muted ">
              <ul
                className={` lg:flex  lg:flex-row  lg:justify-between  lg:align-middle
                                    ${
                                      isOpen === false
                                        ? " lg:static fixed  -left-full  top-14  flex  flex-col  w-full   text-center  duration-300  "
                                        : "lg:static  fixed  left-0  top-14  flex  flex-col  w-full   text-center  duration-300"
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
                        activeClassName="w-full text-xs font-bold  lg:ml-8 text-primary-l1 uppercase opacity-80 transition-all duration-200"
                      >
                        <a className="w-full text-xs  lg:ml-8 font-bold  uppercase opacity-80 transition-all duration-200 hover:text-primary-l1">
                          {menu.top === true ? menu.text : menu["icon-small"]}
                        </a>
                      </ActiveLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className=" ">
              <div className="absolute top-28 right-4 bg-fill rounded-full ">
                <button
                  className={` block cursor-pointer group 
                 `}
                  onClick={openNotification}
                >
                  <div
                    className={` w-full text-xs font-medium p-2 uppercase opacity-80 transition-all duration-200 hover:text-primary-d1
                        ${
                          notificationOpen
                            ? " opacity-50 group-hover:opacity-100 text-primary-d1"
                            : "opacity-50 group-hover:opacity-100 "
                        } `}
                  >
                    <HiBell size={20} />
                  </div>
                </button>

                <div
                  className={` p-1 rounded-full absolute bottom-4 left-2 ${
                    isRed ? "bg-red-500" : "bg-transparent"
                  }`}
                ></div>
              </div>
            </div>
            <div
              className={` ${
                notificationOpen
                  ? "px-2 fixed  right-0  top-40   flex  flex-col  w-1/4 min-h-1/3 rounded-lg min-h-[30%]  duration-500 ease-in-out bg-fill-1"
                  : "px-2 fixed  -right-full  top-40 flex  flex-col  w-1/2 rounded-lg h-1/3 duration-500 ease-in-out"
              }
                 `}
            >
              {parsedNotifications.map((data) => {
                return (
                  <UpcomingNotifications
                    key={data.notification.id}
                    title={data.notification.title}
                    date={data.notification.startDate}
                    description={data.notification.text}
                    author={data.notification.author}
                  />
                );
              })}
              {/*  current notifications here!  */}
            </div>

            <button
              className={` ${
                isOpen
                  ? "block cursor-pointer justify-center items-center group lg:none lg:none"
                  : "none"
              }
                 `}
              onClick={openmenu}
            >
              <div
                className={`${hamburgerLine}
                        ${
                          isOpen
                            ? "-rotate-45 -translate-y-1.5 opacity-50 group-hover:opacity-100 "
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
                            ? "rotate-45 translate-y-1.5 opacity-50 group-hover:opacity-100"
                            : "opacity-50 group-hover:opacity-100"
                        }`}
              />
            </button>
          </nav>
          {/*<ThemeChanger />*/}

          {/*Bottom navbarmenu for Mobile devices and tablets */}

          <nav className=" items-end flex  lg:hidden justify-between align-middle   shadow-md w-screen">
            <ul
              className={` lg:flex  lg:flex-row  lg:justify-between  lg:align-middle
                                    ${
                                      isOpen == false
                                        ? " lg:static fixed  -left-full  bottom-14 flex  flex-col w-full  text-end  duration-300  "
                                        : "lg:static  fixed  left-0  bottom-14   flex  flex-col  w-full    text-end  duration-300 bg-secondary-1"
                                    }`}
            >
              {INTRA_MENU_LIST.map((menu, i) => {
                return menu.bottom === false ? (
                  <li
                    className="my-3 mr-6 mb-4 flex justify-end"
                    onClick={() => {
                      openmenu;
                    }}
                    key={menu.text}
                  >
                    <ActiveLink
                      id={menu.text}
                      href={menu.href}
                      activeClassName="w-full text-xs font-medium  lg:ml-8 uppercase opacity-80 transition-all duration-200 text-primary-l1"
                    >
                      <a className="w-full text-xs md:text-bas  font-medium flex flex-col items-end uppercase opacity-80 transition-all duration-200 hover:text-primary-l1">
                        {menu.top === true && menu.text !== "Logout"
                          ? menu.text
                          : menu["icon-small"]}
                      </a>
                    </ActiveLink>
                  </li>
                ) : (
                  <div key={i}></div>
                );
              })}
            </ul>
          </nav>
        </>
      </header>
      <footer className="fixed bottom-0 w-screen  lg:sticky  lg:top-0 z-50 shadow-xl shadow-black">
        <nav className=" flex  lg:hidden  align-middle items-center  bg-secondary-1">
          <div className=" w-full">
            <ul className=" grid grid-cols-5 gap-4 justify-items-center align-middle">
              {INTRA_MENU_LIST.map((menu, i) =>
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
                      activeClassName="text-primary-l1"
                      className=""
                    >
                      <a className="p-4 text-center flex flex-col items-center align-middle text-base hover:text-primary-l1 focus:active:bg-fill-2 ">
                        {menu["icon-large"]}
                      </a>
                    </ActiveLink>
                  </li>
                ) : (
                  <React.Fragment key={i} />
                )
              )}
              <button
                className={` ${
                  isOpen
                    ? "block cursor-pointer justify-center items-center group lg:none lg:none"
                    : "none"
                }
                 `}
                onClick={openmenu}
              >
                <div
                  className={`${hamburgerLine}
                        ${
                          isOpen
                            ? "rotate-45 translate-y-1.5 opacity-50 group-hover:opacity-100 "
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
                            ? "-rotate-45 -translate-y-1.5 opacity-50 group-hover:opacity-100"
                            : "opacity-50 group-hover:opacity-100"
                        }`}
                />
              </button>
            </ul>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default NavbarIntranet;
