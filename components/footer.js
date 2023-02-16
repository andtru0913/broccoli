import {
  BsInstagram,
  BsFacebook,
  BsLinkedin,
  BsGlobe,
  BsClockHistory,
} from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";
import ThemedImage from "./themedImage";
const Footer = () => {
  return (
    <footer className=" z-20 relative flex flex-1 md:py-12 lg:py12 py-6 bg-secondary-1 ">
      <svg
        className=" fill-primary-1 absolute -z-10 md:w-8/12 lg:w-8/12 w-screen h-auto lg bottom-0 right-0 xl:w-6/12  overflow-hidden"
        width="913"
        height="443"
        viewBox="0 0 913 443"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1273.81 299.264C1278.37 332.101 1198.68 338.725 1103.05 424.643C1103.05 424.643 1000.59 517.334 1000.59 547.784C1000.59 585.845 768.356 576.89 720.542 576.89C672.729 576.89 262.898 558.978 98.9658 536.589C-64.9666 514.2 3.33862 460.466 98.9658 424.643C194.593 388.82 184 299.264 230.5 240.307C251.675 213.46 290.898 194.034 448 176.123C605.102 158.212 607.203 211.946 696 176.123C784.797 140.3 693.22 12.0012 768.356 0.806641C843.492 -10.3879 1000.59 97.7608 1137.2 149.256C1246.49 190.452 1273.81 266.426 1273.81 299.264Z" />
      </svg>

      <div className="flex flex-1 justify-center align-middle cursor-pointer">
        <div className="flex-col">
          <div className="flex justify-center">
            <Link href="/">
              <a>
                <div className="relative h-auto w-20 md:h-5 py-0 flex md:w-60 lg:h-16">
                  <ThemedImage
                    img_path_light="/images/lightMode/BroccoliBlack.png"
                    img_path_dark="/images/darkMode/BroccoliWhite.png"
                  />
                </div>
              </a>
            </Link>
          </div>
          <div className=" grid grid-cols-1 grid-flow-row md:grid-cols-2 pt-8 gap-4 z-2 ">
            <div className=" flex-col  px-5  ">
              <h3 className="pb-2 text-center font-bold cursor-default uppercase">
                Kontakt
              </h3>
              <div className=" flex flex-col items-left md:text-left bg-inherit">
                <a className="hover:text-muted" href="tel:031-151480">
                  <div className="flex flex-row text-sm hover:text-secondary-d2 justify-center align-middle  py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>

                    <p className="pl-2  ">031-151480</p>
                  </div>
                </a>
                <a
                  className="hover:text-muted"
                  href="mailto:engineering@broccoli.se"
                >
                  <div className="flex flex-row text-sm  hover:text-secondary-d2  justify-center  align-middle  py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>

                    <p className="pl-2  ">engineering@broccoli.se</p>
                  </div>
                </a>
                <a
                  className="hover:text-muted"
                  href="https://goo.gl/maps/p9sa1f82ZyN3FdAH9"
                >
                  <div className="flex flex-row text-sm hover:text-secondary-d2  justify-center align-middle   py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <div className="flex flex-col ">
                      <p className=" ">Tillgängligheten 3</p>
                      <p className=" ">417 10 Göteborg</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className=" flex-col px-5  text-center">
              <h3 className="pb-2 font-bold cursor-default uppercase">
                Medarbetare
              </h3>
              <div className=" flex flex-col items-center p-1  bg-inherit">
                <div className="flex flex-row  hover:text-secondary-d2">
                  <BsGlobe className="m-1 mr-3" size={20} />

                  <a href="./intranet" className="hover:text-muted py-1 ">
                    <p className="text-sm hover:text-secondary-d2">Intranät</p>
                  </a>
                </div>
                <div className="flex flex-row  hover:text-secondary-d2 py-1">
                  <BsClockHistory className="m-1 mr-3 " size={20} />
                  <a
                    href="https://www.broccoli.be/tid/"
                    className="hover:text-secondary-d2 "
                  >
                    <p className="text-sm hover:text-secondary-d2 py-1 ">
                      Tidrapportering
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div className=" md:col-span-2 pb-7 text-center justify-center ">
              <h3 className="pb-2 font-bold cursor-default uppercase ">
                Följ oss
              </h3>
              <div className="flex flex-row justify-center md:text-left bg-inherit">
                <a
                  href="https://www.instagram.com/broccoliengineering/"
                  className="p-2 hover:text-secondary-d2"
                >
                  <BsInstagram size={25} />
                </a>

                <a
                  href="https://www.facebook.com/Broccoli.se"
                  className="p-2  hover:text-secondary-d2"
                >
                  <FaFacebookSquare size={26} />
                </a>

                <a
                  href="https://www.linkedin.com/company/broccoli-engineering-ab/?originalSubdomain=se"
                  className="p-2  hover:text-secondary-d2"
                >
                  <BsLinkedin size={25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
