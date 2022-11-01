import Link from 'next/link'
import { useEffect, useState } from "react";
import NavItem from "./navitem";
import styles from '../../styles/navbar.module.css'





const MENU_LIST = [
    { text: "Hem", href: "/" },
    { text: "Tjänster", href: "/posts" },
    { text: "Karriär", href: "/carreer" },
    { text: "Underkonsult", href: "/underconsultants" },
    { text: "Om oss", href: "/about" },
    { text: "Historia", href: "/about#history", tag: true },
    { text: "Kontakt", href: "/contact" },
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(null);
    const openmenu = () => setIsOpen(!isOpen)
    const hamburgerLine = " w-6 h-0.5 bg-darkest my-1 transition-all duration-300 ease-in-out md:hidden";
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


    const navmenuClassNames = [
        'flex',
        'flex-row',
        'space-between',
        'align-middle',
        'sm:fixed',
        'sm:-left-full',
        'sm:top-14',
        'sm:flex-col',
        'sm:w-full',
        'sm:rounded-lg',
        'sm:text-center',
        'sm:transition-all',
        'sm:duration-300',
        'sm:shadow',
        'sm:bg-theme-creme',
        isOpen ? 'sm:left-0' : '',
    ].join(' ')
    return (

        <header className="sticky top-0 z-50">
            <nav className="flex justify-between align-middle py-2 px-7" style={{
                background: `rgba(255, 255, 255, ${backgroundTransparacy})`,

                boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
            }}>
                <div className="text-lg flex justify-start">
                    <Link href="/">
                        <a>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/images/BroccoliBlack.png"
                            />
                        </a>

                    </Link>
                </div>



                <div className="flex justify-end absolute right-10 top-3.5">
                    <ul className={isOpen === false ? "flex flex-row justify-between align-middle" :"fixed -left-full top-14 flex flex-col w-full rounded-lg text-center duration-300 shadow-sm bg-theme-creme"}>
                        {MENU_LIST.map((menu, idx) => {

                            
                            return (<li className="my-2"
                                onClick={() => {
                                    setActiveIdx(idx);
                                    openmenu;
                                }}
                                key={menu.text}
                            >


                                <NavItem theme={"n"} active={activeIdx === idx} {...menu} />

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