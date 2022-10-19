import ActiveLink from '../activeLink.js';

const NavItem = ({ text, href, active }) => {
    const navLink = "w-full text-xs font-medium ml-8 text-darkest uppercase opacity-80 transition-all duration-200 hover:text-purple-2 hover:opacity-20"
    return (
        <ActiveLink scroll={false} href={href} activeClassName="w-full text-xs font-medium ml-8 text-salmone uppercase opacity-80 transition-all duration-200">
            <a className="w-full text-xs font-medium ml-8 text-darkest uppercase opacity-80 transition-all duration-200 hover:text-salmone "
               
            >
                {text}
            </a>
        </ActiveLink>


    );
}

export default NavItem;

/**
 *  {`${active
                    ? "w-full text-xs font-medium ml-8 text-salmone uppercase opacity-80 transition-all duration-200 hover:text-salmone "
                    : "w-full text-xs font-medium ml-8 text-darkest uppercase opacity-80 transition-all duration-200 hover:text-salmone "
                    } `}
 */