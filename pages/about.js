import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import TimelineComponent from "../components/TimelineComponent";
import { IoBoatSharp } from "react-icons/io5";
import { AiOutlineCar } from "react-icons/ai";
import { BsGearWideConnected } from "react-icons/bs";
import { GiHeartBeats, GiRadarSweep } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <main className="bg-secondary-1">
        <section className="bg-secondary-1 relative ">
          <div className="relative h-[48rem] lg:h-screen pb-5 md:pb-12 portrait:h-full ">
            <svg
              className="fill-secondary-l1 absolute z-0 right-0 md:left-0 -top-5 h-auto lg:w-2/3 rotate-180 "
              width="818"
              height="895"
              viewBox="0 0 818 902"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M534.272 107.464C596.13 86.8846 907.955 -202.635 910 264.601L882.508 902C850.132 873.966 662.57 742.65 591.548 724.945C551.663 715.002 393.847 700.6 350.99 631.991C300.995 551.954 133.889 604.204 62.3215 543.463C-9.24652 482.722 -5.44305 380.548 7.33691 322.144C20.1169 263.739 28.9997 166.852 85.2317 131.809C130.217 103.775 215.82 149.515 318.916 149.515C422.012 149.515 472.415 128.043 534.272 107.464Z" />
            </svg>

            <div className="flex flex-col lg:flex-row ">
              <div className=" z-20 grid  grid-flow-col    pt-16 p-4 md:p-12 md:pt-32 lg:pt-48 xl:pt-60">
                <div
                  className="  flex flex-col gap-8  text-center md:text-left text-color-base dark:text-color-base"
                  data-aso=""
                >
                  <h1 className="  pb-0 md:pb-2 font-bold uppercase h3 sm:h1  lg:text-7xl ">
                    Om oss
                  </h1>
                  <h4 className=" font-small md:w-10/12 md:text-left lg:text-xl ">
                    Vi är ett Göteborgsbaserat konsultföretag med ca 50
                    anställda. Vårt kompetensområde sträcker sig från det
                    mekatroniska och ända upp i molnet.
                  </h4>
                </div>
              </div>
              <div className=" md:w-2/3 place-self-center lg:py-20  portrait:w-full">
                <Image
                  alt={""}
                  height={"800"}
                  width={"1000"}
                  className=" "
                  src="/images/about.svg"
                ></Image>
              </div>
            </div>
          </div>
          {/* <div className=" hidden md:flex md:flex-col items-center">
             For Phones 
            <div className=" md:max-w-readable flex flex-col gap-4 text-center">
              <h1 className="uppercase font-bold ">{title ?? "Om oss"}</h1>

      

            <div className=" hidden md:grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
              <div className="  w-auto max-h-full min-w-full  h-60 lg:h-[42rem] md:h-screen bg-secondary-1 md:bg-secondary-1/80 md:z-10 place-content-center ">
                <div className="relative text-center lg:text-left  flex flex-col items-center gap-4 align-top lg:place-self-center  p-4 lg:p-8 xl:p-12">
                  <div className=" flex flex-col p-5 pb-5  z-10 ">
                    <h1 className="font-bold py-3 px-6 tracking-wider uppercase z-10  ">
                      {title ?? "Om oss"}
                    </h1>

                    <h4 className="px-6 z-10">
                      {intro ??
                        "Vi är ett Göteborgsbaserat konsultföretag med ca 50 anställda. Vårt kompetensområde sträcker sig från det mekatroniska och ända upp i molnet. Vi erbjuder tjänster för utveckling av system inom områden där bland annat kontroll, reglering, övervakning, säkerhet och kommunikation är önskade funktioner.  Dessa system kan vara inbyggda, befinna sig i molnet eller någonstans däremellan. De kan vara uppkopplade eller helt autonoma. De förbrukar alltid elektricitet, men kan även vara beroende av andra energikällor, såsom fossila bränslen, vätgas mm. Vårt engagemang inom fordonsindustrin är stort, men även andra tekniska branscher eller branscher baserade på mer virtuella system är en del av det vi dagligen ägnar oss åt. "}
                    </h4>
                  </div>
                  <svg
                    className=" absolute left-0 top-0 z-0 fill-secondary-l1/80 "
                    width="759"
                    height="413"
                    viewBox="0 0 687 415"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M-216.496 199.25C-219.694 175.504 -211.295 154.954 -146.593 92.5056C-146.593 92.5056 -105.71 16.349 -78.8652 -3.28187C-56.9071 -19.3393 117.161 -17.0334 149.648 -17.1754C182.135 -17.3173 525.13 -32.6168 636.584 -16.9044C748.038 -1.19195 646.214 78.8431 581.354 105.046C516.494 131.248 523.974 196.014 492.566 238.809C478.264 258.296 451.675 272.467 344.99 285.893C238.304 299.319 236.706 260.447 176.487 286.63C116.267 312.812 178.894 405.368 127.879 413.69C76.8637 422.013 -30.2206 344.231 -123.203 307.379C-197.589 277.897 -216.393 223.008 -216.496 199.25Z" />
                  </svg>
                </div>
              </div>
              <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2 md:hidden ">
                <Image
                  className=" relative lg:absolute"
                  alt="bird"
                  src="/images/finut4.jpg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
*/}
          {/* For Phones 
          <div className=" md:hidden relative flex flex-col h-full w-full">
            <div className=" grid  grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
              <div className=" w-auto max-h-full min-w-full basis-60 md:h-96 lg:h-[36rem] bg-secondary-1 ">
                <div className="text-center z-10 py-8 lg:text-left md:max-w-readable lg:max-w-readable flex flex-col flex-auto gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                  <h1 className="font-bold z-10 uppercase layout tracking-wider">
                    {title ?? "Om oss"}
                  </h1>

                  <p className="layout z-10 px-6 text-justify">
                    {intro ??
                      "Vi kan erbjuda tjänster inom Mjukvaruutveckling, design, konstruktion, testning och inbyggda system. Med vår kompetens kan vi fylla gränslandet mellan hårdvara och mjukvara. Merparten av våra konsulter är förlagda hos kund men vi har även inhouse projekt av olika storlekar. "}
                  </p>
                </div>

                <svg
                  className=" absolute left-0 top-0 z-0 fill-secondary-l2 "
                  width="317"
                  height="184"
                  viewBox="0 0 687 415"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M-216.496 199.25C-219.694 175.504 -211.295 154.954 -146.593 92.5056C-146.593 92.5056 -105.71 16.349 -78.8652 -3.28187C-56.9071 -19.3393 117.161 -17.0334 149.648 -17.1754C182.135 -17.3173 525.13 -32.6168 636.584 -16.9044C748.038 -1.19195 646.214 78.8431 581.354 105.046C516.494 131.248 523.974 196.014 492.566 238.809C478.264 258.296 451.675 272.467 344.99 285.893C238.304 299.319 236.706 260.447 176.487 286.63C116.267 312.812 178.894 405.368 127.879 413.69C76.8637 422.013 -30.2206 344.231 -123.203 307.379C-197.589 277.897 -216.393 223.008 -216.496 199.25Z" />
                </svg>
              </div>
              <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2 ">
                <Image
                  className="w-40 h-40 relative lg:absolute"
                  alt="karlatornet"
                  src="/images/finut.JPG"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          */}
        </section>
        <div className=" bg-secondary-1 w-full pt-5 md:pt-40 sm:pt-0">
          <div className="flex flex-row justify-center relative z-40">
            <div className=" text-justify  px-4">
              <h3
                className="uppercase font-bold pb-5  mb:pt-0 md:h1"
                data-aos="fade-right"
                data-aos-once="true"
              >
                Vilka är Broccoli
              </h3>
              <p
                className="max-w-readable py-2"
                data-aos="fade-right"
                data-aos-once="true"
                data-aos-delay="500"
              >
                Vi erbjuder tjänster för utveckling av system inom områden där
                bland annat kontroll, reglering, övervakning, säkerhet och
                kommunikation är önskade funktioner.  Dessa system kan vara
                inbyggda, befinna sig i molnet eller någonstans däremellan. De
                kan vara uppkopplade eller helt autonoma. De förbrukar alltid
                elektricitet, men kan även vara beroende av andra energikällor,
                såsom fossila bränslen, vätgas mm. Vårt engagemang inom
                fordonsindustrin är stort, men även andra tekniska branscher
                eller branscher baserade på mer virtuella system är en del av
                det vi dagligen ägnar oss åt.
              </p>
            </div>
          </div>
        </div>

        <section className="bg-secondary-1 ">
          <div className="flex py-12 md:py-36 flex-col items-center bg-secondary-1">
            <h2 className="uppercase pb-12  font-bold z-10">
              {title ?? "Våra områden"}
            </h2>

            <div className="grid grid-cols-1 grid-flow-row md:grid-cols-4 w-full cursor-default">
              <div className="  relative bg-tertiary-1 py-5 text-inverted p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex justify-center">
                  <AiOutlineCar size={40} />
                </div>

                <p className="md:text-center text-justify mx-6  text-inverted max-w-readable ">
                  Inom fordon har vi bred erfarenhet av olika ingenjörsroller
                  inom t.ex. säkerhetselektronik, infotainmentsystem,
                  eftermarknad, klimat, OTA (Over The Air) och drivlina.
                </p>
              </div>
              <div className="relative bg-secondary-d1 p-4  py-5  lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex justify-center">
                  <BsGearWideConnected size={40} />
                </div>

                <p className="md:text-center text-justify mx-6  max-w-readable">
                  Vi har inom automation- och energibranschen erfarenhet från
                  t.ex utveckling av värmepumpar, vätgasapplikationer och
                  kommunikations-moduler för ett antal olika
                  kommunikations-protokoll.
                </p>
              </div>
              <div className="relative bg-primary-l1  py-5  p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex justify-center">
                  <IoBoatSharp size={40} />
                </div>

                <p className="md:text-center text-justify mx-6   max-w-readable">
                  Vi har erfarenhet inom marina tillämpningar där vi bl.a.
                  arbetat med styrsystem, brandskyddssystem och
                  drivlineövervakning på fartyg.
                </p>
              </div>
              <div className="relative bg-tertiary-1  py-5  p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 text-left">
                <div className="flex flex-row text-inverted justify-center">
                  <div className="px-5">
                    <GiHeartBeats size={30} />
                  </div>
                  <div>
                    <GiRadarSweep size={30} />
                  </div>
                </div>

                <p className="md:text-center text-justify text-inverted mx-6  max-w-readable ">
                  Vi har erfarenhet av diagnosutrustning inom medicinteknik,
                  radarsystem inom försvar, sensorteknik inom telekom,
                  cybersäkerhet inom IT, mm.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="relative flex flex-col py-12">
          <h2 className=" md:hidden text-center uppercase font-bold">
            Historia
          </h2>

          <svg
            className="absolute -left-5 top-0 fill-primary-1 w-11/12 md:w-full  z-0 "
            width="1078"
            height="1085"
            viewBox="0 0 1078 1085"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-392.055 573.988C-454.434 694.904 -364.255 728.563 -216.852 835.598C-63.6764 946.825 193.469 870.759 268.253 999.94C333.212 1064.29 324.683 1071.43 436.981 1083.32C549.279 1095.2 590.159 991.645 636.153 987.85C693.647 983.106 798.511 958.869 884.317 919.508C970.123 880.146 1022 753.416 1068.39 587.066C1114.78 420.716 969.866 333.44 928.063 262.468C886.261 191.495 886.098 116.19 789.85 57.9165C693.603 -0.357025 602.504 -0.0946898 510.827 8.58279C419.15 17.2603 341.788 -16.4309 261.795 12.4327C181.802 41.2964 181.426 50.2328 160.981 153.218C140.536 256.204 -111.186 281.426 -233.865 346.093C-356.544 410.761 -329.676 453.071 -392.055 573.988Z" />
          </svg>

          <svg
            className="absolute right-0 bottom-0 z-0 fill-secondary-l1 "
            width="622"
            height="818"
            viewBox="0 0 622 818"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M421.826 160.477C471.755 126.93 678.13 -214.715 793.93 218.741L925.002 817.123C889.402 798.642 690.75 720.452 623.34 720.58C585.484 720.653 441.778 744.102 386.97 690.384C323.032 627.718 187.334 715.236 108.94 675.524C30.5467 635.813 8.99995 540.034 6.10496 482.81C3.20998 425.586 -12.535 333.532 28.8689 287.866C61.992 251.333 149.194 273.838 240.777 249.781C332.36 225.725 371.896 194.023 421.826 160.477Z" />
          </svg>
          <div className="max-w-full">
            <TimelineComponent />
          </div>

          <div
            data-aos="fade-up"
            className="z-10 md:hidden mx-6 flex flex-col text-center items-center border-2 border-dashed border-secondary-d1 max-w-readable "
          >
            <h2 className=" md:hidden text-center uppercase font-extrabold my-4 px-3 border-b-2  border-primary-d1 ">
              nu
            </h2>
            <h5 className="md:hidden max-w-readable  mb-5 text-center  px-6">
              Genom åren har företaget vuxit och är numera ett väl utvecklat
              teknikkonsultbolag specialiserat inom utveckling av
              mjukvarubaserade system och tjänster.
            </h5>
          </div>
        </div>

        <section className="">
          <div className=" pt-12 lg:pt-16 flex flex-col items-center ">
            <div className=" md:max-w-readable flex flex-col gap-4 text-center">
              <h2 className="uppercase font-bold">
                {title ?? "Kvalitets- och miljöpolicy"}
              </h2>
            </div>
            <div className="hidden relative pt-5 md:flex flex-col h-full w-full">
              <div className=" grid   grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
                <div className=" w-auto max-h-full min-w-full h-60 md:h-96 lg:h-[36rem] bg-secondary-l1/70 ">
                  <div className="  text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase tracking-wider mx-6">
                      {title ?? "Vårt Kvalitetsarbete"}
                    </h4>

                    <p className="p1 text-justify  mx-6">
                      {intro ??
                        "Vi vill ha nöjda kunder och en förutsättning för detta är rätt konsult på rätt plats, detta är självklarheter för oss."}
                    </p>
                  </div>
                </div>
                <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2 ">
                  <Image
                    className="w-40 h-40 relative lg:absolute"
                    alt="karlatornet"
                    src="/images/broklippt.JPG"
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
                    src="/images/bi.jpg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className=" w-auto max-h-full min-w-full h-60 md:h-96  lg:h-[36rem] bg-secondary-1 ">
                  <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase tracking-wider mx-6">
                      {title ?? "Vårt Miljöarbete"}
                    </h4>

                    <p className=" mx-6">
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
                <div className=" w-auto max-h-full min-w-full h-60 md:h-96 lg:h-[36rem] py-5 bg-secondary-1 ">
                  <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col gap-4 align-top lg:place-self-start   p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase tracking-wider">
                      {title ?? "Vårt Kvalitetsarbete"}
                    </h4>

                    <p className="p1 text-justify ">
                      {intro ??
                        "Vi vill ha nöjda kunder och en förutsättning för detta är rätt konsult på rätt plats, detta är självklarheter för oss."}
                    </p>
                  </div>
                </div>
                <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2 ">
                  <Image
                    className="w-40 h-40 relative lg:absolute"
                    alt="bro"
                    src="/images/bro2.JPG"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className=" grid   grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 place-items-center w-full h-full lg:justify-items-end ">
                <div className=" w-auto max-h-full min-w-full basis-60 md:h-96 lg:h-[36rem] py-5 bg-secondary-1 ">
                  <div className="text-center lg:text-left md:max-w-readable lg:max-w-readable flex flex-col flex-auto gap-4 align-top lg:place-self-start  p-4 lg:p-8 xl:p-12">
                    <h4 className="font-bold uppercase mx-6">
                      {title ?? "Vårt Miljöarbete"}
                    </h4>

                    <p className="p1 text-justify grow mx-6">
                      {intro ??
                        "Vi vill skydda vår miljö och förhindra förorening genom medvetna val. Vi vill minska vår klimatpåverkan och bidra till ett hållbart samhälle genom att utveckla tjänster och produkter som är mer energieffektiva , samt reducera våra CO2 ekvivalenta utsläpp som påverkar växthuseffekten. Vi följer de lagar och krav som vi omfattas av och vi jobbar med att ständigt förbättra vår verksamhet. "}
                    </p>
                  </div>
                </div>
                <div className="relative w-auto max-h-full min-w-full h-full bg-secondary-l2">
                  <Image
                    className="w-40 h-40 relative lg:absolute"
                    alt="bi"
                    src="/images/bi.jpg"
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
