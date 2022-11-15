import { useState } from "react";
import ActiveLink from "../activeLink";

const ADMIN_MENU_LIST = [
  { text: "Anställda", href: "/intranet/admin/employees" },
  { text: "Lunchgrupper", href: "/intranet/admin/lunchgroups" },
];

{
  /**

   
    { text: "Admin",icon: "" ,  href: "../intranet/admin" },

*/
}

const NavbarAdmin = ({ user }) => {
    try {
        if (user.admin) {
            const hamburgerLine =
                " w-4 h-0.5 bg-skin-fill my-0.5 transition-all duration-300 ease-in-out md:hidden";
            const [isOpen, setIsOpen] = useState(false);
            const openmenu = () => setIsOpen(!isOpen);
            return (
                <nav className="w-screen bg-skin-error flex justify-end p-2 md:p-0">
                    <div className="flex justify-center  text-skin-muted bg-skin-error">
                        <ul
                            className={`md:flex md:flex-row md:justify-between md:align-middle 
                        ${
                                isOpen === false
                                    ? "mobile:fixed mobile:-left-full mobile:py-4 mobile:top-10 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-error"
                                    : "mobile:fixed mobile:left-0 mobile:py-4 mobile:top-10 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-error"
                            }`}
                        >
                            {ADMIN_MENU_LIST.map((menu) => {
                                return (
                                    <li
                                        className="m-2"
                                        onClick={() => {
                                            openmenu;
                                        }}
                                        key={menu.text}
                                    >
                                        <ActiveLink
                                            href={menu.href}
                                            activeClassName="w-full text-xs text-skin-muted opacity-80 transition-all duration-200"
                                        >
                                            <a className="w-full font-bold text-xs  text-skin-inverted  opacity-80 transition-all duration-200 hover:text-skin-muted">
                                                {menu.text}
                                            </a>
                                        </ActiveLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <button
                        className={` ${
                            isOpen
                                ? "block cursor-pointer justify-center items-center group md:none lg:none"
                                : "none"
                        }
                 `}
                        onClick={openmenu}
                    >
                        <div
                            className={`${hamburgerLine}
                        ${
                                isOpen
                                    ? "rotate-45 translate-y-inledning opacity-50 group-hover:opacity-100 "
                                    : "opacity-50 group-hover:opacity-100 "
                            } `}
                        />
                        <div
                            className={`${hamburgerLine}
                        ${
                                isOpen
                                    ? "opacity-0"
                                    : "opacity-50 group-hover:opacity-100"
                            }`}
                        />

                        <div
                            className={`${hamburgerLine}
                        ${
                                isOpen
                                    ? "-rotate-45 -translate-y-inledning opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                            }`}
                        />
                    </button>
                </nav>)
        }
    }
    catch {
        return null
    }
    return null
}

export default NavbarAdmin;

{
  /**


<>
                <nav className=" bg-skin-error flex justify-end px-2 ">
                    <div className="flex justify-center absolute right-10 text-skin-muted">
                        <ul className={
                            `md:flex md:flex-row md:justify-between md:align-middle 
                        ${isOpen === false ?
                                'mobile:fixed mobile:-left-full mobile:top-14 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-fill' :
                                'mobile:fixed mobile:left-0 mobile:top-14 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-fill'}`}>
                            {ADMIN_MENU_LIST.map((menu) => {


                                return (

                                    <li className="my-2"
                                        onClick={() => {
                                            openmenu;
                                        }}
                                        key={menu.text}
                                    >


                                        <ActiveLink href={menu.href} activeClassName="w-full text-xs  md:ml-8 text-skin-navlink-active opacity-80 transition-all duration-200">
                                            <a className="w-full font-bold text-xs md:ml-8  text-skin-inverted  opacity-80 transition-all duration-200 hover:text-skin-muted"

                                            >
                                                {menu.top === true ?
                                                    menu.text
                                                    :
                                                    menu.icon
                                                }
                                            </a>
                                        </ActiveLink>
                                    </li>

                                )

                            })}
                        </ul>
                    </div>
                </nav>

        </>
        
        <header className="sticky top-0 z-50">

            {user === null ? <nav className="flex justify-between align-middle py-2 px-7  ">
                <div className="text-lg flex justify-start">
                    <Link href="/intranet">
                        <a>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/images/BroccoliBlack.png"
                            />
                        </a>

                    </Link>
                </div>:
                
                </nav>
                :
                <>
                <nav className="flex justify-between align-middle py-2 px-7 bg-theme-green ">
                    <div className="text-lg flex justify-start">
                        <Link href="/intranet">
                            <a>
                                <img
                                    className="h-8 w-auto sm:h-10"
                                    src="/images/BroccoliBlack.png"
                                />
                            </a>

                        </Link>
                    </div>

                    <div className="flex md:justify-end absolute text-white right-10 top-3.5">
                        <ul className={isOpen === false ? styles.navmenu : styles.navmenu + ' ' + styles.active}>
                            {MENU_LIST.map((menu, idx) => (

                                <li className={styles.navitem}
                                    onClick={() => {
                                        setActiveIdx(idx);
                                        openmenu;
                                    }}
                                    key={menu.text}
                                >


                                    <NavItem theme={"intranet"} active={activeIdx === idx} {...menu} />

                                </li>
                            ))}
                        </ul>
                    </div>

                    <button aria-label="hamburger_menu button" className={` ${isOpen ? "block cursor-pointer justify-center items-center group  lg:none" : "none"}
                     `}
                        onClick={openmenu}
                    >
                        <div
                            className={`${hamburgerLine}
                            ${isOpen
                                    ? "rotate-45 translate-y-inledning opacity-50 group-hover:opacity-100 "
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
                                    ? "-rotate-45 -translate-y-inledning opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                                }`}
                        />
                    </button>
                    </nav>
                </>

                }

            </header>*/
}
