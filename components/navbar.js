import Link from "next/link";
import { useState } from "react";
import NavItem from "./navitem";
import styles from './navbar.module.css'
import Image from "next/image";


const MENU_LIST = [
    { text: "Home", href: "/"},
    { text: "About Us", href: "/about"},
    { text: "Contact", href: "/contact"},
];

const NavBar = () => {
    const [navActive, setNavActive] = useState(null);
    const [activeIdx, setActiveIdx] = useState(null);   
    return (
        <header>
            <nav className={styles['nav']}>
                <Link href={"/"}>
                    <a>
                    <Image 
                            alt="logo"
                            src="/images/BroccoliBlack.png"
                            width={200}
                            height={80}
                        />
                    </a>
                </Link>
                <div
                    onClick={()=> setNavActive(!navActive)}
                    className={styles[`nav__menu-bar`]}
                >
                    <div></div>
                    <div></div>
                    <div></div>  
                </div>
                <div className={styles[`nav__menu-list${navActive ? "active": ""}`]}>
                    {MENU_LIST.map((menu, idx)=> (
                        <div
                            onClick={()=>{
                                setActiveIdx(idx);
                                setNavActive(false);
                            }}
                            key={menu.text}
                        >
                            <NavItem active={activeIdx === idx} {...menu}/>

                        </div>
                    ))}
                </div>
            </nav>
        </header>
    );
}
export default NavBar;