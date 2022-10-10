import Link from 'next/link';
import { useState } from 'react';
import styles from './hover.module.css'

const Hover = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openmenu = ()=> setIsOpen(!isOpen)
    return (
        <div className={styles.nav}>
            <div className={styles.nav__logo}>
                <Link href='/'> BROCCOLI  </Link>
            </div>

            <div className={styles.list}>
                <div className={styles.link + 'active'}> 
                    <Link href='/'> Home  </Link>
                </div>
                <div className={styles.link}> 
                    <Link href='/about'> About Us   </Link>
                </div>
                <div className={styles.link}> 
                    <Link href='/contact'>  Contact  </Link>
                </div>

            </div>
            <button className={
                isOpen === false ? 
                styles.hamburger : styles.hamburger + ' ' + styles.active}
                onClick={openmenu}
                >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>


        </div>
    );
}

export default Hover;