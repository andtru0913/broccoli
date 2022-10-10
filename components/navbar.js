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
    const [isOpen, setIsOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(null); 
    const openmenu = ()=> setIsOpen(!isOpen)
    return (
      <header className={styles.header}>
          <nav className={styles.navbar}>
              <a className={styles.navlogo}>Broccoli</a>
                  <ul className={isOpen === false ? styles.navmenu : styles.navmenu + ' ' + styles.active}>
  
                      {MENU_LIST.map((menu, idx)=> (
                              <li className={styles.navitem}
                                  onClick={()=>{
                                      setActiveIdx(idx);
                                      openmenu;
                                  }}
                                  key={menu.text}
                              >
                                  <NavItem active={activeIdx === idx} {...menu}/>
  
                              </li>
                          ))}
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
}
export default NavBar;