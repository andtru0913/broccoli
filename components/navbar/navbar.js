import Link from "next/link";
import { useEffect, useState } from "react";
import ActiveLink from "../activeLink";
import ThemedImage from "../themedImage";
import MENU_LIST from "./navItems";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openmenu = () => setIsOpen(!isOpen);
  const hamburgerLine =
    " w-6 h-0.5 bg-primary-1 my-1 transition-all duration-300 ease-in-out lg:hidden";
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(1);
  const [padding, setPadding] = useState(30);
  const [boxShadow, setBoxShadow] = useState(0);
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;
    if (clientWindowHeight === 0) {
      setTextColor("rgb(var(--color-inverted)");
    } else if (clientWindowHeight > 0) {
      setTextColor("rgb(var(--color-base)");
    }

    if (backgroundTransparacyVar < 1) {
      let paddingVar = 30 - backgroundTransparacyVar * 20;

      let boxShadowVar = backgroundTransparacyVar * 0.1;

      setBackgroundTransparacy(
        Math.round((backgroundTransparacyVar + Number.EPSILON) * 100) / 100
      );
      setPadding(Math.floor(paddingVar));
      setBoxShadow(Math.round((boxShadowVar + Number.EPSILON) * 100) / 100);
    }
  }, [clientWindowHeight]);

  return (
    <header className="sticky top-0 z-50 ">
      <nav
        className={`flex justify-between items-center align-middle py-2 px-7 text-base font-medium `}
        style={{
          background: `rgb(var(--color-fill), ${backgroundTransparacy}) `,
          color: `rgb(var(--color-inverted)`,
          boxShadow: `rgb(100 100 100 / ${boxShadow}) 0px 0px 20px 6px`,
        }}
      >
        <div className="text-lg flex justify-start">
          <Link href="/">
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

        <div className="flex justify-center absolute right-10">
          <ul
            className={`lg:flex lg:flex-row lg:justify-between lg:align-middle 
                        ${
                          isOpen === false
                            ? `lg:static lg:bg-transparent lg:shadow-none  fixed -left-full  top-9   flex  flex-col  w-full    text-center  shadow-sm  `
                            : "lg:static lg:bg-transparent lg:shadow-none  fixed  left-0  top-9  flex  flex-col  w-full   text-center  duration-300  shadow-sm  bg-fill"
                        }`}
          >
            {MENU_LIST.map((menu) => {
              return (
                <li
                  className="my-2 flex items-center"
                  onClick={() => {
                    openmenu;
                  }}
                  key={menu.text}
                >
                  <ActiveLink
                    href={menu.href}
                    className=""
                    activeClassName="w-full text-xs font-medium lg:ml-8  uppercase  text-primary-l1"
                  >
                    <a className="w-full text-xs lg:ml-8 font-medium uppercase  hover:text-primary-l1">
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
      </nav>
    </header>
  );
};
export default NavBar;
