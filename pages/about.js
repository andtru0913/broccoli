import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import TimelineComponent from "../components/TimelineComponent";
import { IoBoatSharp } from "react-icons/io5";
import { AiOutlineCar } from "react-icons/ai";
import { BsGearWideConnected } from "react-icons/bs";
import { GiHeartBeats, GiRadarSweep } from "react-icons/gi";
const callback = function (entries) {
  entries.forEach((entry) => {
    const animationType = entry.target.dataset.animateType;
    // Is the element in the viewport?
    if (entry.isIntersecting) {
      // Add the fadeIn class:
      entry.target.classList.add(animationType);
    } else {
      // Otherwise remove the fadein class
      entry.target.classList.remove(animationType);
    }
  });
};
export default function About({ title, intro, year, timelinedesc }) {
  // Get all the elements you want to show on scroll

  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll(".js-show-on-scroll");
    const observer = new IntersectionObserver(callback);
    // Loop through each of the target
    targets.forEach(function (target) {
      // Hide the element
      target.classList.add("opacity-0");

      // Add the element to the watcher
      observer.observe(target);
    });

    // Callback for IntersectionObserver
  }, []);

  return (
    <Layout>
      <main>
        <svg
          className="fill-primary-1 absolute top-0 right-0 md:left-0 h-auto -z-10 w-[48rem]"
          width="799"
          height="1107"
          viewBox="0 0 799 1107"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-609.367 835.372C-636.001 968.799 -540.037 976.297 -368.842 1038.56C-190.941 1103.25 35.2762 959.255 142.77 1062.82C222.95 1106.77 216.721 1115.99 327.945 1096.46C439.168 1076.93 449.92 966.115 493.087 949.79C547.045 929.382 641.167 877.18 712.799 815.691C784.432 754.203 799.372 618.083 798.108 445.391C796.844 272.699 633.492 228.746 573.746 172.046C514 115.345 493.087 43.002 384.505 13.5153C275.924 -15.9715 188.426 9.39097 102.692 43.0019C16.9584 76.6129 -66.6934 65.5507 -135.632 115.345C-204.57 165.14 -202.468 173.834 -193.735 278.465C-185.001 383.096 -420.019 476.726 -520.121 572.703C-620.223 668.68 -582.734 701.946 -609.367 835.372Z" />
        </svg>
        <section className="relative ">
          <svg
            className="hidden md:flex fill-secondary-1 absolute right-0 top-[32rem] h-auto -z-10 w-3/5"
            width="969"
            height="992"
            viewBox="0 0 969 992"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1076.54 536.211C1129 481.733 1162.98 429.612 1135.21 385.366C1099.43 342.88 1079.11 221.986 942.188 139.86C883.571 93.1478 828.694 74.5988 711.915 24.6996C646.676 -3.177 560.298 65.1129 472.678 87.7451C385.057 110.377 271.808 -28.7223 177.414 6.41411C107.024 32.6159 50.5347 122.503 47.3241 151.469C42.9831 190.634 -3.8496 282.131 1.1307 358.169C7.03954 448.382 82.996 541.715 147.869 590.956C195.895 627.41 262.594 635.375 353.42 634.654C472.035 633.712 505.984 774.547 553.94 837.605L553.961 837.633C601.924 900.698 694.494 1022.42 790.991 984.215C838.403 965.444 902.668 944.06 919.412 858.449C932.492 791.569 1029.89 759.386 1048.75 705.878C1067.61 652.369 1024.09 590.689 1076.54 536.211Z" />
          </svg>
          <div className="  text-center py-12  flex flex-col flex-1  items-center justify-center   lg:gap-20 gap-8 ">
            <div className=" lg:max-w-readable flex flex-col gap-4 ">
              <h1 className="">{title ?? "Om oss"}</h1>
            </div>

            <div className=" flex flex-col md:grid md:grid-rows-2 md:grid-cols-2 gap-8 lg:gap-0 items-center ">
              <div className="flex w-full justify-center">
                <p className="md:h4 lg:h3 xl:h2  flex w-full lg:w-2/3 p-4 bg-fill-1 bg-opacity-60 md:leading-relaxed text-left   max-w-readable">
                  Vi kan erbjuda tjänster inom Mjukvaruutveckling, design,
                  konstruktion, testning och inbyggda system. Med vår kompetens
                  kan vi fylla gränslandet mellan hårdvara och mjukvara.
                </p>
              </div>

              <div className="flex flex-row gap-8 md:gap-0 md:flex-col">
                <div className="flex justify-start ml-24">
                  <img
                    className="w-20 md:w-60 h-auto"
                    src="/images/web-development.png"
                  />
                </div>

                <div className="flex justify-end mr-20">
                  <img
                    className="w-20 md:w-60 h-auto"
                    src="/images/microchip.png"
                  />
                </div>
              </div>
              <div className=" w-full md:col-span-2 flex flex-1 content-start place-self-start align-top justify-end pr-24"></div>
            </div>
          </div>
        </section>
        <section>
          <div className=" py-12 flex flex-col items-center">
            <h1>{title ?? "Våra områden"}</h1>

            <p className=" text-left max-w-readable p-4">
              {intro ??
                "Majoriteten av våra kunder är produktutvecklande företag som återfinns inom diverse olika branscher såsom fordon, automation, marin, medicin med flera."}
            </p>
            <div className="grid grid-cols-1 grid-flow-row  md:grid-cols-4 w-full py-8 cursor-default">
              <div className="relative bg-tertiary-1 text-inverted p-4 md:p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 h-full text-left">
                <div className="flex justify-center">
                  <IoBoatSharp size={40} />
                </div>

                <p className="text-left md:text-justify">
                  Vi har inom marina tillämpningar bl.a. arbetat med styrsystem,
                  brandskyddssystem och drivlineövervakning på fartyg.
                </p>
              </div>
              <div className="relative bg-secondary-1 p-4 md:p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 h-full text-left">
                <div className="flex justify-center">
                  <AiOutlineCar size={40} />
                </div>

                <p className="text-left md:text-justify">
                  Inom fordon har vi bred erfarenhet av olika ingenjörsroller
                  inom t.ex. säkerhetselektronik, infotainmentsystem och
                  powertrain.
                </p>
              </div>
              <div className="relative bg-primary-l1 p-4 md:p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 h-full text-left">
                <div className="flex justify-center">
                  <BsGearWideConnected size={40} />
                </div>

                <p className="text-left md:text-justify">
                  Vi har inom automationsbranschen varit delaktiga i
                  utvecklingen av lastrampsövervakning och kommunikationsmoduler
                  för ett antal olika kommunikationsprotokoll mm.
                </p>
              </div>
              <div className="relative bg-primary-1 p-4 md:p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 h-full text-left">
                <div className="flex flex-row justify-center">
                  <GiHeartBeats size={30} />
                  <GiRadarSweep size={30} />
                </div>

                <p className="text-left md:text-justify">
                  Vi har arbetat med diagnosutrustning inom medicinteknik,
                  radarsystem inom försvar, sensorteknik inom telekom,
                  mekanikkonstruktion inom energibranschen mm.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TimelineComponent />

        <section className="">
          <div className=" pt-12 flex flex-col items-center">
            <div className=" md:max-w-readable flex flex-col gap-4 text-center">
              <h1>{title ?? "Kvalitets- och miljöpolicy"}</h1>

              <p className=" text-left p-4">
                {intro ??
                  "Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda system. Vi erbjuder konsulttjänster och utbildning. Våra kunder finns till största delen inom fordonsindustrin i Västsverige. Vi vill skapa en attraktiv arbetsplats med nöjda medarbetare som trivs och utvecklas."}
              </p>
            </div>
            <div className="hidden relative pt-12 md:flex flex-col h-full w-full">
              <div className=" grid   grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
                <div className=" w-auto max-h-full min-w-full h-60 md:h-96 lg:h-[36rem] bg-secondary-1 ">
                  <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase tracking-wider">
                      {title ?? "Vårt Kvalitetsarbete"}
                    </h4>

                    <p className="p1 text-justify">
                      {intro ??
                        "Vi vill ha nöjda kunder och en förutsättning för detta är rätt konsult på rätt plats, detta är självklarheter för oss."}
                    </p>
                  </div>
                </div>
                <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2 ">
                  <Image
                    className="w-40 h-40 relative lg:absolute"
                    alt="karlatornet"
                    src="/images/karlatornet.JPG"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className=" grid   grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
                <div className="relative w-auto max-h-full min-w-full h-full  bg-secondary-l2">
                  <Image
                    className="w-40 h-40 relative lg:absolute"
                    alt="karlatornet"
                    src="/images/grass.JPG"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className=" w-auto max-h-full min-w-full h-60 md:h-96  lg:h-[36rem] bg-secondary-1 ">
                  <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase tracking-wider">
                      {title ?? "Vårt Miljöarbete"}
                    </h4>

                    <p className="p1 text-justify">
                      {intro ??
                        "Vi vill skydda vår miljö och förhindra förorening genom medvetna val. Vi vill minska vår klimatpåverkan och bidra till ett hållbart samhälle genom att utveckla tjänster och produkter som är mer energieffektiva , samt reducera våra CO2 ekvivalenta utsläpp som påverkar växthuseffekten. Vi följer de lagar och krav som vi omfattas av och vi jobbar med att ständigt förbättra vår verksamhet. "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* For Phones */}
            <div className=" md:hidden relative pt-12 flex flex-col h-full w-full">
              <div className=" grid   grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
                <div className=" w-auto max-h-full min-w-full h-60 md:h-96 lg:h-[36rem] bg-secondary-1 ">
                  <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase tracking-wider">
                      {title ?? "Vårt Kvalitetsarbete"}
                    </h4>

                    <p className="p1 text-justify">
                      {intro ??
                        "Vi vill ha nöjda kunder och en förutsättning för detta är rätt konsult på rätt plats, detta är självklarheter för oss."}
                    </p>
                  </div>
                </div>
                <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2 ">
                  <Image
                    className="w-40 h-40 relative lg:absolute"
                    alt="karlatornet"
                    src="/images/karlatornet.JPG"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className=" grid   grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
                <div className=" w-auto max-h-full min-w-full basis-60 md:h-96 lg:h-[36rem] bg-secondary-1 ">
                  <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col flex-auto gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase tracking-wider">
                      {title ?? "Vårt Miljöarbete"}
                    </h4>

                    <p className="p1 text-justify grow">
                      {intro ??
                        "Vi vill skydda vår miljö och förhindra förorening genom medvetna val. Vi vill minska vår klimatpåverkan och bidra till ett hållbart samhälle genom att utveckla tjänster och produkter som är mer energieffektiva , samt reducera våra CO2 ekvivalenta utsläpp som påverkar växthuseffekten. Vi följer de lagar och krav som vi omfattas av och vi jobbar med att ständigt förbättra vår verksamhet. "}
                    </p>
                  </div>
                </div>
                <div className="relative w-auto max-h-full min-w-full h-full  bg-secondary-l2">
                  <Image
                    className="w-40 h-40 relative lg:absolute"
                    alt="karlatornet"
                    src="/images/grass.JPG"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
