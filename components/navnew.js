import React, { useState } from "react";
import NavItem from "./navitem";
import styles from "./navtest.module.css";

const MENU_LIST = [
    { text: "Home", href: "/"},
    { text: "About Us", href: "/about"},
    { text: "Contact", href: "/contact"},
];


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null); 
  const openmenu = ()=> setIsOpen(!isOpen)
  return (
    <header className={styles.header}>
        <nav className={styles.navbar}>
            <a className={styles.navlogo}>Broccoli</a>
                <ul className={isOpen === false ? styles.navmenu : styles.navmenu + ' ' + styles.active}>
                    <li className={styles.navitem}>
                        <a className={styles.navlink}>Home</a>
                    </li>
                    <li className={styles.navitem}>
                    
                        <a className={styles.navlink}>About</a>
            
                    </li>
                    <li className={styles.navitem}>
                
                        <a className={styles.navlink}>Contact</a>
            
                    </li>
                </ul>
            <button className={
                isOpen === false ? 
                styles.hamburger : styles.hamburger + ' ' + styles.active}
                onClick={openmenu}
                >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>
        </nav>
  </header>
  );
};

export default Nav;