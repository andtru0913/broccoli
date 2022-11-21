import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActiveLink from "../activeLink";
import MENU_LIST from "./navItems";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openmenu = () => setIsOpen(!isOpen);
  const hamburgerLine =
    " w-6 h-0.5 bg-primary-1 my-1 transition-all duration-300 ease-in-out lg:hidden";
  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [_, setPadding] = useState(30);
  const [boxShadow, setBoxShadow] = useState(0);
  const [textColor, setTextColor] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;
    if (backgroundTransparacyVar < 1) {
      let paddingVar = 30 - backgroundTransparacyVar * 20;

      let boxShadowVar = backgroundTransparacyVar * 0.1;
      let textcolVar = 255 - backgroundTransparacyVar * 100;

      setBackgroundTransparacy(
        Math.round((backgroundTransparacyVar + Number.EPSILON) * 100) / 100
      );
      setPadding(Math.floor(paddingVar));
      setBoxShadow(Math.round((boxShadowVar + Number.EPSILON) * 100) / 100);

      console.log(Math.round(textcolVar));
      setTextColor(Math.round(textcolVar));
    }
  }, [clientWindowHeight]);

  return (
    <header className="sticky top-0 z-50 ">
      <nav
        className={`flex justify-between align-middle py-2 px-7`}
        style={{
          background: `rgb(var(--color-fill), ${backgroundTransparacy}) `,

          boxShadow: `rgb(100 100 100 / ${boxShadow}) 0px 0px 20px 6px`,
        }}
      >
        <div className="text-lg flex justify-start">
          <Link href="/">
            <a>
              <img
                className="h-8 w-auto sm:h-10"
                src="/images/BroccoliBlack.png"
                alt="Broccoli"
              />
            </a>
          </Link>
        </div>

        <div className="flex justify-center absolute right-10 text-muted">
          <ul
            className={`lg:flex lg:flex-row lg:justify-between lg:align-middle 
                        ${
                          isOpen === false
                            ? `lg:static lg:bg-transparent lg:shadow-none  fixed -left-full  top-14   flex   flex-col  w-full  rounded-lg  text-center  duration-300  shadow-sm  bg-fill`
                            : "lg:static lg:bg-transparent lg:shadow-none  fixed  left-0  top-14  flex  flex-col  w-full  rounded-lg  text-center  duration-300  shadow-sm  bg-fill"
                        }`}
          >
            {MENU_LIST.map((menu) => {
              return (
                <li
                  className="my-2"
                  onClick={() => {
                    openmenu;
                  }}
                  key={menu.text}
                >
                  <ActiveLink
                    href={menu.href}
                    className=""
                    activeClassName="w-full text-xs font-medium lg:ml-8 text-navlink-active uppercase transition-all duration-200"
                  >
                    <a className="w-full text-xs lg:ml-8 font-medium uppercase  transition-all duration-200 hover:text-navlink-hover">
                      {menu.text}
                    </a>
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
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
                            ? "rotate-45 translate-y-1 opacity-50 group-hover:opacity-100 "
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
                            ? "-rotate-45 -translate-y-1 opacity-50 group-hover:opacity-100"
                            : "opacity-50 group-hover:opacity-100"
                        }`}
          />
        </button>
      </nav>
    </header>
  );
};
export default NavBar;
