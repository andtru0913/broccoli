import Link from "next/link";
import { useState } from "react";
import NavItem from "./navitem";
import styles from './navbar.module.css'
import Image from "next/image";
import menu_list from "./navmenuList"


const MENU_LIST = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about" },
    { text: "Contact", href: "/contact" },
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(null);
    const openmenu = () => setIsOpen(!isOpen)
    const hamburgerLine = "block w-6 h-0.5 bg-darkest my-1 transition-all duration-300 ease-in-out";
    return (
        <header className="relative z-10">
            <nav className="flex justify-between align-middle py-2 px-7 bg-white opacity-90">
                <div className="text-lg flex justify-start">
                    <Link href="/">
                        <a>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/images/BroccoliBlack.png"
                            />
                        </a>

                    </Link>
                </div>
                <div className="flex justify-end">
                    <ul className={isOpen === false ? styles.navmenu : styles.navmenu + ' ' + styles.active}>
                        {

                            menu_list.map((menu, idx) => (

                                <li className={styles.navitem}
                                    onClick={() => {
                                        setActiveIdx(idx);
                                        openmenu;
                                    }}
                                    key={menu.text}
                                >
                                    <NavItem active={activeIdx === idx} {...menu} />

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