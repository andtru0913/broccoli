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
  const hamburgerLine =
    " w-4 h-0.5 bg-fill my-0.5 transition-all duration-300 ease-in-out  lg:hidden";
  const [isOpen, setIsOpen] = useState(false);
  const openmenu = () => setIsOpen(!isOpen);
  return (
    <nav className="bg-primary-1 flex justify-end p-2  lg:p-0">
      <div className="flex justify-center  text-muted ">
        <ul
          className={` lg:flex  lg:flex-row  lg:justify-between  lg:align-middle 
                        ${
                          isOpen === false
                            ? "lg:static fixed  -left-full  py-4  top-10  flex  flex-col  w-full  rounded-lg  text-center  duration-300  shadow-sm    bg-primary-1 "
                            : "lg:static fixed  left-0  py-4  top-10  flex  flex-col  w-full  rounded-lg  text-center  duration-300  shadow-sm  bg-primary-1 "
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
                  activeClassName="w-full text-xs text-muted opacity-80 transition-all duration-200"
                >
                  <a className="w-full font-bold text-xs  text-inverted  opacity-80 transition-all duration-200 hover:text-muted">
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
            ? "block cursor-pointer justify-center items-center group  lg:none lg:none"
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
