import { useTheme } from 'next-themes';
import Link from 'next/link'
import { useEffect, useState } from "react";
import ActiveLink from '../activeLink';

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
    const openmenu = () => setIsOpen(!isOpen)
    const hamburgerLine = " w-6 h-0.5 bg-skin-navlink-hover my-1 transition-all duration-300 ease-in-out md:hidden";
    const [clientWindowHeight, setClientWindowHeight] = useState("");

    const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
    const [padding, setPadding] = useState(30);
    const [boxShadow, setBoxShadow] = useState(0);


    const MyList = ({ items }) => {
        const renderListItems = (item, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;
            const classNames = [
                isFirst && "translate-y-12 rotate-45",
                isSecond && "opacity-0",
                isThird && "-translate-y-12 -rotate-45"
            ].join(" ");
            return <li className={classNames}>{item.text}</li>;
        };
        return <ul>{items.map(renderListItems)}</ul>;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },);

    const handleScroll = () => {
        setClientWindowHeight(window.scrollY);
    };

    useEffect(() => {
        let backgroundTransparacyVar = clientWindowHeight / 600;
        console.log("height" + clientWindowHeight)
        if (backgroundTransparacyVar < 1) {
            let paddingVar = 30 - backgroundTransparacyVar * 20;

            let boxShadowVar = backgroundTransparacyVar * 0.1;

            setBackgroundTransparacy(Math.round((backgroundTransparacyVar + Number.EPSILON) * 100) / 100);
            console.log(backgroundTransparacy)
            setPadding(Math.floor(paddingVar));
            console.log("padding" + padding)
            setBoxShadow(Math.round((boxShadowVar + Number.EPSILON) * 100) / 100);
            console.log("shadow" + boxShadow)
        }
    }, [clientWindowHeight]);

const theme = useTheme()

    return (

        <header className="sticky top-0 z-50 ">
            <nav className={`flex justify-between align-middle py-2 px-7 bg-skin-fill shadow`} style={{
                background: `rgb(var(--color-fill), ${backgroundTransparacy}) `,

                boxShadow: `rgb(100 100 100 / ${boxShadow}) 0px 0px 20px 6px`,
            }}>
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



                <div className="flex justify-center absolute right-10 text-skin-muted">
                    <ul className={
                        `md:flex md:flex-row md:justify-between md:align-middle 
                        ${isOpen === false ? 
                            'mobile:fixed mobile:-left-full mobile:top-14 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-fill' : 
                            'mobile:fixed mobile:left-0 mobile:top-14 mobile:flex mobile:flex-col mobile:w-full mobile:rounded-lg mobile:text-center mobile:duration-300 mobile:shadow-sm mobile:shadow-skin-shadow mobile:bg-skin-fill'}`}>
                        {MENU_LIST.map((menu, idx) => {


                            return (<li className="my-2"
                                onClick={() => {
                                    openmenu;
                                }}
                                key={menu.text}
                            >


                                <ActiveLink href={menu.href} className="" activeClassName="w-full text-xs font-medium md:ml-8 text-skin-navlink-active uppercase opacity-80 transition-all duration-200">
                                    <a className="w-full text-xs md:ml-8 font-medium  uppercase opacity-80 transition-all duration-200 hover:text-skin-navlink-hover"

                                    >
                                        {menu.text}
                                    </a>
                                </ActiveLink>
                            </li>)

                        })}
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