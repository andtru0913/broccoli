import Link from 'next/link'
import { useEffect, useState } from "react";
import NavItem from "./navitem";
import styles from '../../styles/navbar.module.css'





const MENU_LIST = [
    { text: "Hem", href: "/"},
    { text: "Jobba hos oss", href: "/career"},
    { text: "Tjänster", href: "/posts"},
    { text: "Exjobb", href: "/exjobb"},
    { text: "Underkonsult", href: "/underconsultants"},
    { text: "Om oss", href: "/about"},
    { text: "Kontakt", href: "/contact"},
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(null);
    const openmenu = () => setIsOpen(!isOpen)
    const hamburgerLine = " w-6 h-0.5 bg-darkest my-1 transition-all duration-300 ease-in-out md:hidden";
    const [clientWindowHeight, setClientWindowHeight] = useState("");

    const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
    const [setPadding] = useState(30);
    const [boxShadow, setBoxShadow] = useState(0);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, );

    const handleScroll = () => {
      setClientWindowHeight(window.scrollY);
    };

    useEffect(() => {
      let backgroundTransparacyVar = clientWindowHeight / 600;

      if (backgroundTransparacyVar < 1) {
        let paddingVar = 30 - backgroundTransparacyVar * 20;

        let boxShadowVar = backgroundTransparacyVar * 0.1;

        setBackgroundTransparacy(Math.round((backgroundTransparacyVar + Number.EPSILON) * 100) / 100);
        setPadding(Math.floor(paddingVar));
        setBoxShadow( Math.round((boxShadowVar + Number.EPSILON) * 100) / 100);
      }
    }, [clientWindowHeight]);
    return (
        <header className="sticky top-0 z-50">
            <nav className={`flex justify-between align-middle py-2 px-7  bg-blue-500  `} style={{
        background: `rgba(255, 255, 255, ${backgroundTransparacy})`,

        boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
      }}>
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
                <div className="flex justify-end absolute right-10 top-3.5">
                    <ul className={isOpen === false ? styles.navmenu : styles.navmenu + ' ' + styles.active}>
                        {MENU_LIST.map((menu, idx) => (

                                <li className={styles.navitem}
                                    onClick={() => {
                                        setActiveIdx(idx);
                                        openmenu;
                                    }}
                                    key={menu.text}
                                >


                                    <NavItem theme={"n"} active={activeIdx === idx} {...menu} />

                                </li>
                            ))}
                    </ul>
                </div>

                <button className={` ${isOpen ? "block cursor-pointer justify-center items-center group md:none lg:none" : "none"}
                 `}
                    onClick={openmenu}
                >
                    <div
                        className={`${hamburgerLine}
                        ${isOpen
                                ? "rotate-45 translate-y-1 opacity-50 group-hover:opacity-100 "
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
                                ? "-rotate-45 -translate-y-1 opacity-50 group-hover:opacity-100"
                                : "opacity-50 group-hover:opacity-100"
                            }`}
                    />
                </button>
            </nav>
        </header>
    );
}
export default NavBar;