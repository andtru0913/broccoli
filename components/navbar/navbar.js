import Link from 'next/link'
import { useState } from "react";
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
    return (
        <header className="sticky top-0 z-50">
            <nav className="flex justify-between align-middle py-2 px-7 bg-theme-creme opacity-90">
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