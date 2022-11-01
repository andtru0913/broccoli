import Link from "next/link";
import { useState } from "react";
import styles from '../../styles/navbar.module.css'
import NavItem from "../navbar/navitem";
import { HiHome, HiBookOpen, HiUserCircle, HiCalendarDays, HiClock, HiArrowLeftOnRectangle } from "react-icons/hi2";
import ActiveLink from "../activeLink";

const MENU_LIST = [
    { text: "Hem", icon: <HiHome size={40}/>, href: "/intranet" },
    { text: "Handbook", icon: <HiBookOpen size={40}/>, href: "../intranet/handbook" },
    { text: "Employees", icon: <HiClock size={40}/>, href: "../intranet" },
    { text: "News", icon: <HiCalendarDays size={40}/>, href: "/intranet" },
];


const BOTTOM_MENU_LIST = [
    { text: "Hem", icon: <HiHome size={40}/>, href: "/intranet" },
    { text: "Handbook", icon: <HiBookOpen size={40}/>, href: "../intranet/handbook" },
    { text: "Timereporting", icon: <HiClock size={40}/>, href: "https://www.broccoli.be/tid/" },
    { text: "Calendar", icon: <HiCalendarDays size={40}/>, href: "/intranet/calendar" },
    { text: "Profile", icon: <HiUserCircle size={40}/>, href: "../intranet/profile" },
];

{/**

   
    { text: "Admin",icon: "" ,  href: "../intranet/admin" },

*/}


const NavbarIntranet = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(null);
    const openmenu = () => setIsOpen(!isOpen)
    const hamburgerLine = " w-6 h-0.5 bg-darkest my-1 transition-all duration-300 ease-in-out md:hidden";
    return (
       <>
        <header className="fixed w-screen top-0 md:sticky  z-50">

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
        <nav className=" flex justify-between align-middle py-2 md:px-7 bg-white shadow-md">
            <div className="flex text-lg justify-start">
                <Link href="/intranet">
                    <a>
                        <img
                            className="h-8 w-auto sm:h-10"
                            src="/images/BroccoliBlack.png"
                        />
                    </a>

                </Link>
            </div>


           
            <div className="hidden md:flex absolute text-white right-10 top-3.5">
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


        </nav>
    </>

}

</header>



<footer className="fixed bottom-0 w-screen md:sticky md:top-0 z-50 shadow-xl shadow-black">

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
        <nav className=" flex md:hidden  align-middle py-4 bg-white ">
            


            <div className=" w-full">
                <ul className=" grid grid-cols-5 gap-4 justify-items-center align-middle">
                    {BOTTOM_MENU_LIST.map((menu, idx) => (

                        <li className="flex flex-row"
                            onClick={() => {
                                setActiveIdx(idx);
                                openmenu;
                            }}
                            key={menu.text}
                        >

                            <ActiveLink href={menu.href} activeClassName="text-white" className="">
                                <a className="text-center flex flex-col items-center align-middle text-dark-blue">
                                    {menu.icon} 
                                <p className="text-xs">{menu.text}</p>
                                </a>
                            </ActiveLink>


                        </li>
                    ))}
                </ul>

            </div>

        

        </nav>
    </>

}

</footer>
       
       </>
    );
}

export default NavbarIntranet;



{/**
        
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
                </>

                }

            </header>*/}