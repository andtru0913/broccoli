import Link from "next/link";
import styles from './navbar.module.css'

const NavItem = ({text, href, active}) => {
    return (
        <Link href={href}>
            <a className={styles[`nav__link${active ? "active" : ""}`]}>
                {text}
            </a>
        </Link>
    );
}

export default NavItem;