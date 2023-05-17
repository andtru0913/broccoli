import Image from "next/image";
import Link from "next/link";
import ThemedImage from "../components/themedImage";

export default function Custom404() {
  return (
    <div className="relative bg-primary-1 h-screen w-screen overflow-hidden">
      <div className=" w-1/2  absolute top-0 left-1/4 flex justify-center lg:justify-start p-4 lg:left-0">
        <Link href="/">
          <a>
            <div className="relative h-auto w-20 md:h-5 py-0 flex md:w-60 lg:h-10">
              <ThemedImage
                img_path_light="/images/lightMode/BroccoliBlack.png"
                img_path_dark="/images/darkMode/BroccoliWhite.png"
              />
            </div>
          </a>
        </Link>
      </div>
      <svg
        className="absolute  right-0 fill-secondary-1 w-3/4 h-auto md:lg:w-1/2 xl:w-1/3 z-10"
        width="696"
        height="1224"
        viewBox="0 0 696 1224"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M43.7667 896.684C-21.8364 768.278 -57.4046 452.161 267.434 196.164C352.421 130.136 386.634 115.939 485.034 56.1637C583.434 -3.61172 912.455 -71.2783 818.574 175.164L828.933 297.455L843.434 1006.75L804.073 1159.61C791.643 1182.71 710.433 1227.69 485.034 1222.79C203.286 1216.68 213.644 1161.65 199.143 1159.61C187.541 1157.98 90.7248 983.647 43.7667 896.684Z" />
      </svg>

      <div className="relative z-10 h-screen w-screen flex flex-col justify-center place-items-center font-sans">
        <h1 className="text-[300pt] pb-56 font-righteous">404</h1>
        <h1 className="pb-4">The page could not be found</h1>
        <h3>
          Go back to our{" "}
          <a href="/" className="text-primary-d1">
            Homepage
          </a>
        </h3>
        <h3>
          Or if you are a{" "}
          <span>
            <Image
              src="/images/broccoli.png"
              height={30}
              width={25}
              alt="Broccoli"
            />{" "}
          </span>
          , go to the{" "}
          <a href="/intranet" className="text-primary-d1">
            Intranet
          </a>
        </h3>
      </div>
    </div>
  );
}
