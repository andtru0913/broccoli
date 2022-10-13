

import styles from './footer.module.css'
import Image from 'next/image';
import { BsInstagram, BsFacebook, BsLinkedin } from 'react-icons/bs'
import Link from 'next/link';
const Footer = () => {
    return (
        <footer className={styles.footer}>

            <div className={styles.grid}>

                <div className={styles.section}>

                    <a className={styles.socialmedia}>
                        <BsInstagram size={30} />
                    </a>

                    <a className={styles.socialmedia}>
                        <BsFacebook size={30} />
                    </a>

                    <a className={styles.socialmedia}>
                        <BsLinkedin size={30} />
                    </a>

                </div>

                <div className={styles.section}>

                </div>

                <div className={styles.section}>

                </div>


                <Link href={"/"}>
                    <a>
                        <Image src="/images/BroccoliBlack.png" alt="Broccoli Logo" width={72} height={16} />
                    </a>
                </Link>
            </div>

        </footer>
    );
}

export default Footer;