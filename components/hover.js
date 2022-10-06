import Link from 'next/link';
import styles from './hover.module.css'

const Hover = () => {
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


        </div>
    );
}

export default Hover;