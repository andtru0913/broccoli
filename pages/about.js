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
        <section className="relative ">
          <div className=" hidden md:flex md:flex-col items-center">
            {/* For Phones 
            <div className=" md:max-w-readable flex flex-col gap-4 text-center">
              <h1 className="uppercase font-bold ">{title ?? "Om oss"}</h1>

              <p className=" text-left p-4">
                {intro ??
                  "Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda system. Vi erbjuder konsulttjänster och utbildning. Våra kunder finns till största delen inom fordonsindustrin i Västsverige. Vi vill skapa en attraktiv arbetsplats med nöjda medarbetare som trivs och utvecklas."}
              </p>
            </div>*/}
            <div className=" hidden md:grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
              <div className=" w-auto max-h-full min-w-full h-60 lg:h-[42rem] md:h-screen bg-tertiary-d1 place-content-center ">
                <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col items-center gap-4 align-top lg:place-self-center  p-4 lg:p-8 xl:p-12">
                  <div className=" flex flex-col p-10 lg:p-16 z-10">
                    <h1 className="font-bold py-3 px-4 tracking-wider uppercase z-10 text-inverted ">
                      {title ?? "Om oss"}
                    </h1>

                    <h4 className=" tracking-wider max-w-readable px-5 z-10 text-inverted ">
                      {intro ??
                        "Vi kan erbjuda tjänster inom Mjukvaruutveckling, design, konstruktion, testning och inbyggda system. Med vår kompetens kan vi fylla gränslandet mellan hårdvara och mjukvara. Merparten av våra konsulter är förlagda hos kund men vi har även inhouse projekt av olika storlekar. "}
                    </h4>
                  </div>
                  <svg
                    className=" absolute left-0 top-0 z-0 fill-tertiary-l2/50 "
                    width="580"
                    height="668"
                    viewBox="0 0 580 668"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M162.513 532.351C112.789 560.346 -107.471 865.19 -185.689 453.758L-266.403 -112.341C-234.027 -92.7957 -51.553 -6.9668 12.3024 -2.68343C48.1623 -0.277977 185.972 -12.7397 233.985 40.8921C289.994 103.457 424.869 30.7769 496.236 72.8985C567.603 115.02 581.06 205.669 579.649 259.175C578.237 312.682 586.469 399.481 543.94 439.325C509.917 471.201 428.959 444.536 340.471 460.968C251.984 477.4 212.238 504.356 162.513 532.351Z" />
                  </svg>
                </div>
              </div>
              <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2 ">
                <Image
                  className="w-40 h-40 relative lg:absolute"
                  alt="bird"
                  src="/images/bird.png"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          {/* For Phones */}
          <div className=" md:hidden relative flex flex-col h-full w-full">
            <div className=" grid  grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
              <div className=" w-auto max-h-full min-w-full basis-60 md:h-96 lg:h-[36rem] bg-tertiary-d1 ">
                <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col flex-auto gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                  <h1 className="font-bold text-inverted uppercase tracking-wider">
                    {title ?? "Om oss"}
                  </h1>

                  <p className="px-5 text-inverted  text-center">
                    {intro ??
                      "Vi kan erbjuda tjänster inom Mjukvaruutveckling, design, konstruktion, testning och inbyggda system. Med vår kompetens kan vi fylla gränslandet mellan hårdvara och mjukvara. Merparten av våra konsulter är förlagda hos kund men vi har även inhouse projekt av olika storlekar. "}
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
          </div>
        </section>

        <section>
          <div className=" flex py-12 md:py-16 flex-col items-center">
            <h2 className="uppercase pt-6  px-5 font-bold">
              {title ?? "Våra områden"}
            </h2>

            <p className=" text-center px-5 pb-4  max-w-readable pt-2">
              {intro ??
                "Majoriteten av våra kunder är produktutvecklande företag som återfinns inom diverse olika branscher såsom fordon, automation, marin, medicin med flera."}
            </p>
            <div className="grid grid-cols-1 grid-flow-row md:grid-cols-4 w-full cursor-default">
              <div className="relative bg-tertiary-1 text-inverted p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex justify-center">
                  <IoBoatSharp size={40} />
                </div>

                <p className="text-center max-w-readable">
                  Vi har inom marina tillämpningar bl.a. arbetat med styrsystem,
                  brandskyddssystem och drivlineövervakning på fartyg.
                </p>
              </div>
              <div className="relative bg-secondary-1 p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex justify-center">
                  <AiOutlineCar size={40} />
                </div>

                <p className="text-center  max-w-readable">
                  Inom fordon har vi bred erfarenhet av olika ingenjörsroller
                  inom t.ex. säkerhetselektronik, infotainmentsystem och
                  powertrain.
                </p>
              </div>
              <div className="relative bg-primary-l1 p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex justify-center">
                  <BsGearWideConnected size={40} />
                </div>

                <p className="text-center  max-w-readable">
                  Vi har inom automationsbranschen varit delaktiga i
                  utvecklingen av lastrampsövervakning och kommunikationsmoduler
                  för ett antal olika kommunikationsprotokoll mm.
                </p>
              </div>
              <div className="relative bg-tertiary-1 p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex flex-row text-inverted justify-center">
                  <GiHeartBeats size={30} />
                  <GiRadarSweep size={30} />
                </div>

                <p className="text-center text-inverted max-w-readable ">
                  Vi har arbetat med diagnosutrustning inom medicinteknik,
                  radarsystem inom försvar, sensorteknik inom telekom,
                  mekanikkonstruktion inom energibranschen mm.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="relative">
          <h2 className=" md:hidden text-center uppercase font-bold">
            Historia
          </h2>
          <h5 className="md:hidden text-center ">
            Några milstolpar i Broccolis historia
          </h5>
          <svg
            className="absolute -left-5 top-0 -z-10 fill-primary-1 w-11/12 md:w-full "
            width="1078"
            height="1085"
            viewBox="0 0 1078 1085"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-392.055 573.988C-454.434 694.904 -364.255 728.563 -216.852 835.598C-63.6764 946.825 193.469 870.759 268.253 999.94C333.212 1064.29 324.683 1071.43 436.981 1083.32C549.279 1095.2 590.159 991.645 636.153 987.85C693.647 983.106 798.511 958.869 884.317 919.508C970.123 880.146 1022 753.416 1068.39 587.066C1114.78 420.716 969.866 333.44 928.063 262.468C886.261 191.495 886.098 116.19 789.85 57.9165C693.603 -0.357025 602.504 -0.0946898 510.827 8.58279C419.15 17.2603 341.788 -16.4309 261.795 12.4327C181.802 41.2964 181.426 50.2328 160.981 153.218C140.536 256.204 -111.186 281.426 -233.865 346.093C-356.544 410.761 -329.676 453.071 -392.055 573.988Z" />
          </svg>

          <svg
            className="absolute right-0 bottom-0 -z-10 fill-secondary-1 "
            width="622"
            height="818"
            viewBox="0 0 622 818"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M421.826 160.477C471.755 126.93 678.13 -214.715 793.93 218.741L925.002 817.123C889.402 798.642 690.75 720.452 623.34 720.58C585.484 720.653 441.778 744.102 386.97 690.384C323.032 627.718 187.334 715.236 108.94 675.524C30.5467 635.813 8.99995 540.034 6.10496 482.81C3.20998 425.586 -12.535 333.532 28.8689 287.866C61.992 251.333 149.194 273.838 240.777 249.781C332.36 225.725 371.896 194.023 421.826 160.477Z" />
          </svg>

          <TimelineComponent />
        </div>

        <section className="">
          <div className=" pt-12 lg:pt-16 flex flex-col items-center">
            <div className=" md:max-w-readable flex flex-col gap-4 text-center">
              <h2 className="uppercase font-bold">
                {title ?? "Kvalitets- och miljöpolicy"}
              </h2>

              <p className="">
                {intro ??
                  "Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda system. Vi erbjuder konsulttjänster och utbildning. Våra kunder finns till största delen inom fordonsindustrin i Västsverige. Vi vill skapa en attraktiv arbetsplats med nöjda medarbetare som trivs och utvecklas."}
              </p>
            </div>
            <div className="hidden relative pt-5 md:flex flex-col h-full w-full">
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
              <div className=" grid  grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
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
